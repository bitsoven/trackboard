import { useEffect, useRef, useState } from 'preact/hooks'
import type { WidgetConfig } from './types.js'
import type { I18n } from './i18n.js'
import { fetchConfig } from './config.js'
import { startErrorCapture, type ErrorCollector } from './errors.js'
import { captureScreenshot } from './screenshot.js'
import { startElementPin } from './element_pin.js'
import { DynamicForm, isFieldVisible } from './form.js'
import { submitReport, enqueue, isOnline, type ReportPayload } from './submit.js'

interface WidgetAppProps {
  apiBase: string
  projectKey: string
  i18n: I18n
}

type Status = 'idle' | 'loading' | 'ready' | 'submitting' | 'success' | 'error'

function isEmptyValue(value: unknown, type: string): boolean {
  if (value === undefined || value === null || value === '') return true
  if (Array.isArray(value)) return value.length === 0
  if (type === 'checkbox' && typeof value === 'boolean') return value === false
  return false
}

function isValidEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
}

export function WidgetApp(props: WidgetAppProps) {
  const { apiBase, projectKey, i18n } = props

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [config, setConfig] = useState<WidgetConfig | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [titleError, setTitleError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const [pinActive, setPinActive] = useState(false)
  const [banner, setBanner] = useState<string | null>(null)

  const collectorRef = useRef<ErrorCollector | null>(null)
  const stopPinRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!collectorRef.current) {
      collectorRef.current = startErrorCapture()
    }
    if (config === null && status !== 'loading' && status !== 'error') {
      void (async () => {
        setStatus('loading')
        try {
          const cfg = await fetchConfig(apiBase, projectKey)
          setConfig(cfg)
          setStatus('ready')
        } catch (err) {
          setConfigError(err instanceof Error ? err.message : 'config error')
          setStatus('error')
        }
      })()
    }
  }, [])

  useEffect(() => {
    return () => {
      collectorRef.current?.stop()
      stopPinRef.current?.()
    }
  }, [])

  const togglePanel = () => setOpen((v) => !v)

  const onFieldChange = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const togglePin = () => {
    if (pinActive) {
      stopPinRef.current?.()
      stopPinRef.current = null
      setPinActive(false)
      setBanner(null)
      return
    }
    setBanner(i18n.t('widget.pinHint'))
    const stop = startElementPin((_el: Element, selector: string) => {
      setPinned(selector)
      stopPinRef.current = null
      setPinActive(false)
      setBanner(null)
    })
    stopPinRef.current = stop
    setPinActive(true)
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {}
    let ok = true

    if (!title.trim()) {
      setTitleError(i18n.t('widget.fieldRequired'))
      ok = false
    } else {
      setTitleError(null)
    }

    if (!email.trim()) {
      setEmailError(i18n.t('widget.emailRequired'))
      ok = false
    } else if (!isValidEmail(email.trim())) {
      setEmailError(i18n.t('widget.fieldRequired'))
      ok = false
    } else {
      setEmailError(null)
    }

    for (const field of config?.template?.fields ?? []) {
      if (!field.isRequired) continue
      if (!isFieldVisible(field, values)) continue
      if (isEmptyValue(values[field.key], field.type)) {
        nextErrors[field.key] = i18n.t('widget.fieldRequired')
        ok = false
      }
    }
    setErrors(nextErrors)
    return ok
  }

  const submit = async () => {
    if (!validate()) return
    setStatus('submitting')

    const collected = collectorRef.current?.getErrors() ?? []
    const consoleErrors = collected.filter((e) => e.kind === 'console').map((e) => e.message)
    const networkErrors = collected.filter((e) => e.kind === 'network').map((e) => e.message)
    const screenshotUrl = await captureScreenshot(apiBase)

    const payload: ReportPayload = {
      title: title.trim(),
      reporterEmail: email.trim(),
      pageUrl: typeof location !== 'undefined' ? location.href : undefined,
      templateId: config?.template?.id,
      fieldValues: values,
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: { width: screen.width, height: screen.height },
      },
      consoleErrors: consoleErrors.length ? consoleErrors : undefined,
      networkErrors: networkErrors.length ? networkErrors : undefined,
      screenshotUrl: screenshotUrl ?? undefined,
    }

    try {
      await submitReport(apiBase, projectKey, payload)
      setStatus('success')
      setBanner(null)
      collectorRef.current?.stop()
      collectorRef.current = null
    } catch (err) {
      const offline = !isOnline()
      if (offline) {
        enqueue(payload)
        setStatus('success')
        setBanner(i18n.t('widget.error'))
        collectorRef.current?.stop()
        collectorRef.current = null
        return
      }
      const httpError = err as Error & { status?: number }
      setStatus('error')
      setBanner(httpError.status === 422 ? i18n.t('widget.fieldRequired') : i18n.t('widget.error'))
    }
  }

  if (!open) {
    return (
      <div class="tb-root">
        <button class="tb-fab" aria-label={i18n.t('widget.open')} onClick={togglePanel}>
          !
        </button>
      </div>
    )
  }

  return (
    <div class={`tb-root${pinActive ? ' tb-pin-active' : ''}`}>
      <div class="tb-panel">
        <div class="tb-header">
          <span class="tb-title">{i18n.t('widget.title')}</span>
          <button class="tb-close" aria-label={i18n.t('widget.close')} onClick={togglePanel}>
            ×
          </button>
        </div>

        {banner && <div class="tb-banner">{banner}</div>}

        {status === 'loading' && <div>{i18n.t('widget.sending')}</div>}
        {status === 'error' && configError && <div class="tb-error">{configError}</div>}

        {status === 'success' && <div class="tb-success">{i18n.t('widget.success')}</div>}

        {(status === 'ready' || status === 'submitting' || status === 'error') && config && (
          <div>
            <div class="tb-field">
              <label class="tb-label" for="tb-title">
                {i18n.t('widget.titleLabel')}
                <span class="tb-req"> *</span>
              </label>
              <input
                id="tb-title"
                class="tb-input"
                type="text"
                placeholder={i18n.t('widget.titlePlaceholder')}
                value={title}
                onInput={(e: Event) => setTitle((e.target as HTMLInputElement).value)}
              />
              {titleError && <div class="tb-error">{titleError}</div>}
            </div>

            <div class="tb-field">
              <label class="tb-label" for="tb-email">
                {i18n.t('widget.emailLabel')}
                <span class="tb-req"> *</span>
              </label>
              <input
                id="tb-email"
                class="tb-input"
                type="email"
                placeholder={i18n.t('widget.emailPlaceholder')}
                value={email}
                onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
              />
              {emailError && <div class="tb-error">{emailError}</div>}
              {config.project.requireEmailVerification && (
                <div class="tb-hint">{i18n.t('widget.emailRequired')}</div>
              )}
            </div>

            {config.template && (
              <DynamicForm
                fields={config.template.fields}
                values={values}
                errors={errors}
                i18n={i18n}
                onChange={onFieldChange}
              />
            )}

            <div class="tb-hint">{i18n.t('widget.screenshot')}</div>
            <button type="button" class="tb-submit" onClick={togglePin}>
              {pinned ? i18n.t('widget.pinned', { selector: pinned }) : i18n.t('widget.pin')}
            </button>
            {pinned && <div class="tb-pinned">{pinned}</div>}

            <button
              id="tb-submit-btn"
              class="tb-submit"
              disabled={status === 'submitting'}
              onClick={() => void submit()}
            >
              {status === 'submitting' ? i18n.t('widget.sending') : i18n.t('widget.submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
