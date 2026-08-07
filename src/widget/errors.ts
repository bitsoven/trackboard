import type { RuntimeError } from './types.js'

export interface ErrorCollector {
  getErrors(): RuntimeError[]
  stop(): void
}

function toText(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Error) return value.message
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

/**
 * Pure helper: derive the URL + method from a fetch() target. Extracted so it
 * can be unit-tested without a DOM.
 */
export function parseRequestTarget(
  input: RequestInfo | URL,
  init?: RequestInit
): {
  url: string
  method: string
} {
  let url: string
  if (typeof input === 'string') {
    url = input
  } else if (input instanceof URL) {
    url = input.toString()
  } else if (input instanceof Request) {
    url = input.url
  } else {
    url = String(input)
  }
  const method = (
    init?.method ??
    (input instanceof Request ? input.method : 'GET') ??
    'GET'
  ).toUpperCase()
  return { url, method }
}

export function startErrorCapture(): ErrorCollector {
  const errors: RuntimeError[] = []

  const originalConsoleError = console.error
  const consoleErrorProxy = (...args: unknown[]) => {
    errors.push({
      kind: 'console',
      message: args.map(toText).join(' '),
      timestamp: Date.now(),
    })
    originalConsoleError.apply(console, args as [])
  }

  const onWindowError = (event: ErrorEvent) => {
    errors.push({
      kind: 'window',
      message: event.message,
      timestamp: Date.now(),
      detail: event.filename ? `${event.filename}:${event.lineno}` : undefined,
    })
  }

  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    errors.push({
      kind: 'unhandledrejection',
      message: toText(event.reason),
      timestamp: Date.now(),
    })
  }

  const originalFetch = window.fetch.bind(window)
  const fetchProxy = (input: RequestInfo | URL, init?: RequestInit) => {
    const target = parseRequestTarget(input, init)
    return originalFetch(input, init).then(
      (response) => {
        if (!response.ok) {
          errors.push({
            kind: 'network',
            message: `HTTP ${response.status} for ${target.method} ${target.url}`,
            timestamp: Date.now(),
          })
        }
        return response
      },
      (reason) => {
        errors.push({
          kind: 'network',
          message: `Failed ${target.method} ${target.url}: ${toText(reason)}`,
          timestamp: Date.now(),
        })
        throw reason
      }
    )
  }

  const originalOpen = XMLHttpRequest.prototype.open
  const xhrProxy = function (
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    ...rest: any[]
  ) {
    const target = typeof url === 'string' ? url : url.toString()
    const wrapped = () => {
      const onReady = () => {
        if (this.readyState === 4 && this.status >= 400) {
          errors.push({
            kind: 'network',
            message: `XHR ${method.toUpperCase()} ${target} -> ${this.status}`,
            timestamp: Date.now(),
          })
        }
      }
      this.addEventListener('readystatechange', onReady)
    }
    wrapped()
    const asyncFlag = rest[0] === undefined ? true : (rest[0] as boolean)
    const user = rest[1] as string | undefined
    const password = rest[2] as string | undefined
    return originalOpen.call(this, method, url, asyncFlag, user, password)
  }

  console.error = consoleErrorProxy as typeof console.error
  window.fetch = fetchProxy as typeof window.fetch
  XMLHttpRequest.prototype.open = xhrProxy
  window.addEventListener('error', onWindowError)
  window.addEventListener('unhandledrejection', onUnhandledRejection)

  return {
    getErrors() {
      return errors.slice()
    },
    stop() {
      console.error = originalConsoleError
      window.fetch = originalFetch
      XMLHttpRequest.prototype.open = originalOpen
      window.removeEventListener('error', onWindowError)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    },
  }
}
