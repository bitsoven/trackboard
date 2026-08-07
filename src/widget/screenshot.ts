import html2canvasImport from 'html2canvas'

const html2canvas = html2canvasImport as unknown as (
  element: HTMLElement,
  options?: Record<string, unknown>
) => Promise<HTMLCanvasElement>

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
 * html2canvas can read the pixels without tainting the canvas.
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

export async function captureScreenshot(
  apiBase: string,
  target?: HTMLElement
): Promise<string | null> {
  try {
    await preprocessForCapture(apiBase)
    const node = target ?? document.documentElement
    const canvas = await html2canvas(node, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    })
    return canvas.toDataURL('image/png')
  } catch {
    return null
  }
}
