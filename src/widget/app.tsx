import { useEffect, useRef, useState } from 'preact/hooks'
import type { WidgetConfig } from './types.js'
import type { I18n } from './i18n.js'
import { fetchConfig } from './config.js'
import { startErrorCapture, type ErrorCollector } from './errors.js'
import {
  captureScreenshot,
  hasHighFidelityConsent,
  setHighFidelityConsent,
  isDisplayMediaAvailable,
} from './screenshot.js'
import type { CaptureMode } from './screenshot.js'
import { startElementPin } from './element_pin.js'
import { DynamicForm, isFieldVisible } from './form.js'
import { submitReport, enqueue, isOnline, type ReportPayload } from './submit.js'

interface WidgetAppProps {
  apiBase: string
  projectKey: string
  i18n: I18n
  captureMode?: CaptureMode
  highFidelity?: boolean
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
  const [verifyBanner, setVerifyBanner] = useState<string | null>(null)
  const captureMode = (props.captureMode ?? 'fullpage') as CaptureMode
  const highFidelityEnabled = !!props.highFidelity
  const [showConsent, setShowConsent] = useState(false)

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

  useEffect(() => {
    if (open && highFidelityEnabled && isDisplayMediaAvailable() && !hasHighFidelityConsent()) {
      try {
        if (localStorage.getItem('trackboard:high-fidelity-consent') === null) {
          setShowConsent(true)
        }
      } catch {}
    }
  }, [open, highFidelityEnabled])

  const handleConsentAllow = () => {
    setHighFidelityConsent(true)
    setShowConsent(false)
  }

  const handleConsentDeny = () => {
    setHighFidelityConsent(false)
    setShowConsent(false)
  }

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
      stopPinRef.current?.()
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
      // Built-in fields (title / reporterEmail) are validated separately above.
      if (field.key === 'title' || field.key === 'reporterEmail') continue
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
    // If high-fidelity is opted-in but consent hasn't been decided, show dialog first
    if (highFidelityEnabled && isDisplayMediaAvailable() && !hasHighFidelityConsent()) {
      try {
        if (localStorage.getItem('trackboard:high-fidelity-consent') === null) {
          setShowConsent(true)
          return
        }
      } catch {}
    }
    if (showConsent) return
    if (!validate()) return
    setStatus('submitting')

    const collected = collectorRef.current?.getErrors() ?? []
    const consoleErrors = collected.filter((e) => e.kind === 'console').map((e) => e.message)
    const networkErrors = collected.filter((e) => e.kind === 'network').map((e) => e.message)

    let targetEl: HTMLElement | undefined
    if (captureMode === 'element' && pinned) {
      try {
        targetEl = (document.querySelector(pinned) as HTMLElement) ?? undefined
      } catch {}
    }
    const highFidelityActive =
      highFidelityEnabled && isDisplayMediaAvailable() && hasHighFidelityConsent()
    let screenshotUrl: string | null = null
    if (highFidelityActive) {
      screenshotUrl = await captureScreenshot(apiBase, {
        target: targetEl,
        mode: captureMode,
        highFidelity: true,
      })
    } else {
      // Capture the screenshot but never let it block the report from being
      // sent. We wait up to a short window; if it isn't ready, we send without.
      screenshotUrl = (await Promise.race([
        captureScreenshot(apiBase, {
          target: targetEl,
          mode: captureMode,
          highFidelity: false,
        }),
        new Promise((resolve) => setTimeout(() => resolve(null), 1500)),
      ])) as string | null
    }

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
      const result: any = await submitReport(apiBase, projectKey, payload)
      const isPending = result?.data?.status === 'pending_verification'
      if (isPending) {
        setVerifyBanner(i18n.t('widget.verifySent', { email: email.trim() }))
        setBanner(null)
      } else {
        setVerifyBanner(null)
        setBanner(null)
      }
      setStatus('success')
      collectorRef.current?.stop()
      collectorRef.current = null
    } catch (err) {
      const offline = !isOnline()
      if (offline) {
        enqueue(payload)
        setStatus('success')
        setBanner(i18n.t('widget.error'))
        setVerifyBanner(null)
        collectorRef.current?.stop()
        collectorRef.current = null
        return
      }
      const httpError = err as Error & { status?: number }
      console.error('[trackboard] report submit failed', httpError)
      setStatus('error')
      setVerifyBanner(null)
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
        {verifyBanner && <div class="tb-verify">{verifyBanner}</div>}

        {showConsent && (
          <div class="tb-consent">
            <h4 class="tb-consent-title">{i18n.t('widget.consentTitle')}</h4>
            <p class="tb-consent-body">{i18n.t('widget.consentBody')}</p>
            <div class="tb-consent-actions">
              <button class="tb-btn tb-btn-primary" onClick={handleConsentAllow}>
                {i18n.t('widget.consentAllow')}
              </button>
              <button class="tb-btn tb-btn-secondary" onClick={handleConsentDeny}>
                {i18n.t('widget.consentDeny')}
              </button>
            </div>
          </div>
        )}

        {status === 'loading' && <div>{i18n.t('widget.sending')}</div>}
        {status === 'error' && configError && <div class="tb-error">{configError}</div>}

        {status === 'success' && <div class="tb-success">{i18n.t('widget.success')}</div>}

        {(status === 'ready' || status === 'submitting' || status === 'error') && config && (
          <div>
            <div class="tb-section">
              <div class="tb-section-title">{i18n.t('widget.sectionDetails')}</div>
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
            </div>

            <div class="tb-section">
              <div class="tb-section-title">{i18n.t('widget.sectionContext')}</div>
              <button type="button" class="tb-pin-btn" onClick={togglePin}>
                {pinned ? i18n.t('widget.pinned', { selector: pinned }) : i18n.t('widget.pin')}
              </button>
              {pinned && (
                <div class="tb-pinned">
                  <span class="tb-pinned-selector">{pinned}</span>
                  <button
                    type="button"
                    class="tb-pinned-clear"
                    aria-label={i18n.t('widget.pinClear')}
                    onClick={() => setPinned(null)}
                  >
                    ×
                  </button>
                </div>
              )}

              <div class="tb-hint">{i18n.t('widget.pinHint')}</div>
            </div>

            <div class="tb-section">
              <div class="tb-section-title">{i18n.t('widget.sectionScreenshot')}</div>
              <div class="tb-hint">{i18n.t('widget.screenshotNote')}</div>
            </div>

            <button
              id="tb-submit-btn"
              class="tb-submit"
              disabled={status === 'submitting'}
              onClick={() => void submit()}
            >
              {status === 'submitting' ? i18n.t('widget.sending') : i18n.t('widget.submit')}
            </button>
            <div class="tb-screenshot-note">{i18n.t('widget.screenshotHint')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
