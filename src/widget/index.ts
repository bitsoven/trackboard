import { h, render } from 'preact'
import { WidgetApp } from './app.js'
import { widgetStyles } from './styles.js'
import { I18n, detectLocale } from './i18n.js'

function findWidgetScript(): HTMLScriptElement | null {
  if (document.currentScript instanceof HTMLScriptElement) {
    return document.currentScript
  }
  const candidates = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[]
  return candidates.find((s) => s.src.includes('/widget/v1/widget.js')) ?? null
}

function bootstrap() {
  const script = findWidgetScript()
  if (!script) {
    console.warn('[trackboard] widget: could not locate own <script> tag')
    return
  }

  const projectKey = script.dataset.projectKey
  if (!projectKey) {
    console.warn('[trackboard] widget: missing data-project-key attribute')
    return
  }

  const apiBase = script.src ? new URL(script.src).origin : location.origin
  const i18n = new I18n(detectLocale(script.dataset.locale))

  const host = document.createElement('div')
  host.id = 'trackboard-widget'
  document.body.appendChild(host)

  // Shadow DOM defaults to "closed" in production. Setting data-shadow-mode="open"
  // (e.g. for end-to-end tests) exposes host.shadowRoot for tooling that needs to
  // pierce the boundary.
  const shadowMode = script.dataset.shadowMode === 'open' ? 'open' : 'closed'
  const shadow = host.attachShadow({ mode: shadowMode })

  const style = document.createElement('style')
  style.textContent = widgetStyles()
  shadow.appendChild(style)

  // Highlight style for element-pin mode is applied to host-page elements, so
  // it must live in the light DOM (global).
  const globalStyle = document.createElement('style')
  globalStyle.textContent =
    '.tb-highlight{outline:2px dashed #2563eb!important;outline-offset:2px;background:rgba(37,99,235,.08);}'
  document.head.appendChild(globalStyle)

  render(h(WidgetApp, { apiBase, projectKey, i18n }), shadow)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap)
} else {
  bootstrap()
}
