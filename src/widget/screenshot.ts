import { toPng as toPngOrig } from 'html-to-image'

export type CaptureMode = 'visible' | 'fullpage' | 'element'

const CONSENT_KEY = 'trackboard:high-fidelity-consent'
const MAX_SIZE_BYTES = 10 * 1024 * 1024
const FONT_READY_TIMEOUT_MS = 1000

let toPngImpl: typeof toPngOrig = toPngOrig
export function __setToPngMock(fn: typeof toPngOrig | null): void {
  toPngImpl = fn ?? toPngOrig
}
export function __resetToPngMock(): void {
  toPngImpl = toPngOrig
}

export function getHtmlToImageOptions(mode: CaptureMode): Record<string, unknown> {
  const scale = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
  const fontEmbedCSS = collectSafeFontCss()
  const common = {
    cacheBust: true,
    pixelRatio: scale,
    backgroundColor: null as unknown as string,
    preferredFontFormat: 'woff2' as const,
    fontEmbedCSS,
  } as Record<string, unknown>
  if (mode === 'visible') {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024
    const height = typeof window !== 'undefined' ? window.innerHeight : 768
    const scrollX = typeof window !== 'undefined' ? window.scrollX : 0
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    return {
      ...common,
      width,
      height,
      style: { transform: `translate(${-scrollX}px, ${-scrollY}px)`, transformOrigin: 'top left' },
    }
  }
  if (mode === 'element') {
    return { ...common }
  }
  const width = typeof document !== 'undefined' ? document.documentElement.scrollWidth : 1024
  const height = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 768
  return { ...common, width, height }
}

/**
 * Pure helper: decide whether an image URL is cross-origin relative to the
 * embedding page. Used to route tainted images through the server-side proxy
 * before a screenshot is taken.
 */
export function isCrossOrigin(url: string, pageOrigin?: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(url, pageOrigin ?? undefined)
  } catch {
    return false
  }
  if (parsed.protocol === 'data:' || parsed.protocol === 'blob:') return false
  if (!pageOrigin) {
    // No page origin to compare against (e.g. data URL page) → treat as cross-origin
    // only when it is an absolute http(s) URL.
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  }
  let page: URL
  try {
    page = new URL(pageOrigin)
  } catch {
    return false
  }
  return parsed.host !== page.host
}

export function proxyImageUrl(apiBase: string, url: string): string {
  return `${apiBase.replace(/\/$/, '')}/api/public/proxy-image?url=${encodeURIComponent(url)}`
}

/**
 * Rewrite cross-origin <img> sources through the server-side proxy so that
 * html-to-image can read the pixels without tainting the canvas.
 */
export async function preprocessForCapture(apiBase: string): Promise<void> {
  const pageOrigin = typeof location !== 'undefined' ? location.origin : undefined
  const images = Array.from(document.images)
  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.src
      if (!src || !isCrossOrigin(src, pageOrigin)) return
      if (src.includes('/api/public/proxy-image')) return
      const proxied = proxyImageUrl(apiBase, src)
      try {
        img.src = proxied
        if (img.decode) await img.decode()
      } catch {
        // If the proxy fails, leave the original in place (screenshot may taint).
      }
    })
  )
}

// ---------------------------------------------------------------------------
// High-fidelity (Screen Capture API) helpers
// ---------------------------------------------------------------------------

export function isDisplayMediaAvailable(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getDisplayMedia
}

export function hasHighFidelityConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'granted'
  } catch {
    return false
  }
}

export function setHighFidelityConsent(granted: boolean): void {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
  } catch {
    // ignore
  }
}

export function clearHighFidelityConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY)
  } catch {
    // ignore
  }
}

export { MAX_SIZE_BYTES }

async function captureWithDisplayMedia(): Promise<string | null> {
  if (!isDisplayMediaAvailable()) return null
  let stream: MediaStream | null = null
  let video: HTMLVideoElement | null = null
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: 'browser' } as any,
      audio: false,
    })
    const track = stream.getVideoTracks()[0]
    if (!track) return null

    video = document.createElement('video')
    video.srcObject = stream
    video.muted = true
    // Autoplay is required for the video to have dimensions
    await video.play().catch(() => {})
    // Give the video a moment to render
    await new Promise<void>((resolve) => {
      if (video!.readyState >= 2) return resolve()
      const onLoaded = () => {
        video!.removeEventListener('loadeddata', onLoaded)
        resolve()
      }
      video!.addEventListener('loadeddata', onLoaded, { once: true })
      setTimeout(resolve, 500)
    })

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1920
    canvas.height = video.videoHeight || 1080
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataUrl = canvas.toDataURL('image/png')
    return await enforceMaxSize(dataUrl)
  } catch (error: any) {
    // Permission denied, unsupported browser, missing OS-level permission (macOS),
    // or missing user gesture - all should silently fall back.
    const name = error?.name ?? ''
    if (
      name === 'NotAllowedError' ||
      name === 'NotFoundError' ||
      name === 'NotSupportedError' ||
      name === 'AbortError' ||
      name === 'InvalidStateError'
    ) {
      return null
    }
    return null
  } finally {
    if (stream) {
      for (const t of stream.getTracks()) {
        try {
          t.stop()
        } catch {}
      }
    }
    if (video) {
      try {
        video.pause()
        video.srcObject = null
        video.remove()
      } catch {}
    }
  }
}

// ---------------------------------------------------------------------------
// html-to-image fallback with resilience helpers
// ---------------------------------------------------------------------------

export function collectSafeFontCss(): string | undefined {
  if (typeof document === 'undefined') return undefined
  let css = ''
  let found = false
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null
    try {
      rules = sheet.cssRules
    } catch {
      // Cross-origin stylesheet without CORS - skip
      continue
    }
    if (!rules) continue
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSFontFaceRule) {
        const family = (rule.style as CSSStyleDeclaration).getPropertyValue('font-family')
        // Trackboard (Vite) may inject an @font-face with empty font-family in
        // dev - html-to-image would try to fetch "" and Firefox throws.
        if (!family || !family.trim() || family.trim() === '""' || family.trim() === "''") {
          continue
        }
        found = true
        css += rule.cssText + '\n'
      }
    }
  }
  // If we collected anything, return it; else let html-to-image handle its default
  return found ? css : undefined
}

export async function enforceMaxSize(dataUrl: string): Promise<string> {
  // Data URL prefix is not part of the file size, but overhead is small.
  // Estimate decoded bytes: base64 length * 0.75
  // For simplicity check string length vs 10MB threshold.
  if (dataUrl.length <= MAX_SIZE_BYTES) return dataUrl
  // Too large - re-encode as JPEG with lower quality
  // Try 0.7 then 0.5
  for (const quality of [0.7, 0.5, 0.3]) {
    try {
      const jpeg = await reEncodeToJpeg(dataUrl, quality)
      if (jpeg.length <= MAX_SIZE_BYTES) return jpeg
      // If jpeg is smaller than original png, keep it even if still over? Keep trying lower quality
      dataUrl = jpeg
    } catch {
      break
    }
  }
  // Still too large - return what we have (caller will send, even if large; server rejects only if >10MB and we don't reject report)
  return dataUrl
}

function reEncodeToJpeg(dataUrl: string, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('no context'))
        // Ensure white background for JPEG (transparent -> white)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/jpeg', quality))
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = () => reject(new Error('image load failed'))
    img.src = dataUrl
  })
}

async function captureWithHtmlToImage(
  node: HTMLElement,
  mode: CaptureMode,
): Promise<string | null> {
  try {
    const opts = getHtmlToImageOptions(mode) as any
    return await toPngImpl(node, opts)
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function captureScreenshot(
  apiBase: string,
  targetOrOpts?: HTMLElement | { target?: HTMLElement; mode?: CaptureMode; highFidelity?: boolean },
): Promise<string | null> {
  // Normalize overloaded signature for backwards compat
  let target: HTMLElement | undefined
  let mode: CaptureMode = 'fullpage'
  let highFidelity = false

  const isElement = (v: any) =>
    (typeof HTMLElement !== 'undefined' && v instanceof HTMLElement) ||
    (typeof Element !== 'undefined' && v instanceof Element) ||
    (v && typeof v === 'object' && v.nodeType === 1 && typeof v.tagName === 'string')
  if (isElement(targetOrOpts)) {
    target = targetOrOpts as HTMLElement
    mode = 'element'
  } else if (targetOrOpts && typeof targetOrOpts === 'object') {
    target = (targetOrOpts as any).target
    mode = (targetOrOpts as any).mode ?? (target ? 'element' : 'fullpage')
    highFidelity = (targetOrOpts as any).highFidelity ?? false
  }

  return withTimeout(captureInternal(apiBase, mode, target, highFidelity), SCREENSHOT_TIMEOUT_MS)
}

/**
 * Best-effort screenshot capture. Tries high-fidelity DisplayMedia first when
 * opted-in and available, otherwise falls back to html-to-image DOM capture.
 * If anything hangs or throws, the timeout resolves to null so the report is
 * still sent.
 */
const SCREENSHOT_TIMEOUT_MS = 6500

async function captureInternal(
  apiBase: string,
  mode: CaptureMode,
  target: HTMLElement | undefined,
  highFidelity: boolean,
): Promise<string | null> {
  try {
    // Try high-fidelity first if opted-in - do this before any async waits
    // so the getDisplayMedia call remains within the user gesture.
    if (highFidelity && isDisplayMediaAvailable() && hasHighFidelityConsent()) {
      const displayResult = await captureWithDisplayMedia()
      if (displayResult) {
        return await enforceMaxSize(displayResult)
      }
      // Fall through to DOM capture on any display-media failure
    }

    // Wait for fonts with short fallback - html-to-image will handle safe embedding
    try {
      await Promise.race([
        (document as any).fonts?.ready ?? Promise.resolve(),
        new Promise<void>((resolve) => setTimeout(resolve, FONT_READY_TIMEOUT_MS)),
      ])
    } catch {
      // ignore
    }

    await preprocessForCapture(apiBase)
    const node =
      mode === 'element' && target ? target : (document.documentElement as unknown as HTMLElement)
    const actualMode: CaptureMode = mode === 'element' && !target ? 'fullpage' : mode
    const dataUrl = await captureWithHtmlToImage(node, actualMode)
    if (!dataUrl) return null
    return await enforceMaxSize(dataUrl)
  } catch {
    return null
  }
}

/**
 * Resolve `promise` within `ms`, otherwise resolve `null` so the caller is
 * never left hanging (e.g. when html2canvas stalls on a cross-origin page).
 */
function withTimeout<T>(promise: Promise<T | null>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    let settled = false
    const finish = (value: T | null) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(value)
    }
    const timer = setTimeout(() => finish(null), ms)
    promise.then(
      (value) => finish(value),
      () => finish(null)
    )
  })
}
