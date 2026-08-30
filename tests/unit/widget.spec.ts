import { test } from '@japa/runner'
import { readFileSync, existsSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { generateSelector } from '../../src/widget/element_pin.js'
import { isFieldVisible } from '../../src/widget/form.js'
import { isCrossOrigin, proxyImageUrl } from '../../src/widget/screenshot.js'
import { parseRequestTarget } from '../../src/widget/errors.js'
import { enqueue, loadQueue, clearQueue, type ReportPayload } from '../../src/widget/submit.js'
import { I18n, detectLocale } from '../../src/widget/i18n.js'

class FakeElement {
  tagName: string
  id: string
  nodeType = 1
  parentElement: FakeElement | null
  children: FakeElement[]
  constructor(tag: string, id = '', parent: FakeElement | null = null) {
    this.tagName = tag.toUpperCase()
    this.id = id
    this.parentElement = parent
    this.children = []
  }
}

class FakeStorage {
  private store = new Map<string, string>()
  getItem(k: string) {
    return this.store.has(k) ? this.store.get(k)! : null
  }
  setItem(k: string, v: string) {
    this.store.set(k, String(v))
  }
  removeItem(k: string) {
    this.store.delete(k)
  }
  clear() {
    this.store.clear()
  }
}

test.group('Widget | element-pin selector', (group) => {
  let span: FakeElement

  group.setup(() => {
    // @ts-expect-error - minimal DOM globals for the pure selector helper
    global.Element = FakeElement
    const html = new FakeElement('html')
    const body = new FakeElement('body', '', html)
    html.children = [body]
    const c1 = new FakeElement('div', '', body)
    const c2 = new FakeElement('div', '', body)
    body.children = [c1, c2]
    const p = new FakeElement('p', '', c1)
    span = new FakeElement('span', '', c1)
    c1.children = [p, span]
    // @ts-expect-error - must reference the exact DOM nodes the helper stops at
    global.document = { documentElement: html, body }
  })

  test('uses id when present', ({ assert }) => {
    const el = new FakeElement('button', 'submit-btn')
    assert.equal(generateSelector(el as unknown as Element), 'button#submit-btn')
  })

  test('builds nth-child path without id', ({ assert }) => {
    assert.equal(generateSelector(span as unknown as Element), 'div:nth-child(1) > span')
  })

  test('throws for non-element input', ({ assert }) => {
    assert.throws(() => generateSelector({} as any))
  })
})

test.group('Widget | form visibility', () => {
  test('respects equals condition', ({ assert }) => {
    const field = {
      key: 'details',
      label: 'Details',
      type: 'textarea' as const,
      isRequired: true,
      options: null,
      sortOrder: 0,
      showIf: { fieldKey: 'type', equals: 'bug' },
    }
    assert.isFalse(isFieldVisible(field, { type: 'feature' }))
    assert.isTrue(isFieldVisible(field, { type: 'bug' }))
  })

  test('respects notEquals condition', ({ assert }) => {
    const field = {
      key: 'reason',
      label: 'Reason',
      type: 'text' as const,
      isRequired: false,
      options: null,
      sortOrder: 0,
      showIf: { fieldKey: 'type', notEquals: 'bug' },
    }
    assert.isTrue(isFieldVisible(field, { type: 'feature' }))
    assert.isFalse(isFieldVisible(field, { type: 'bug' }))
  })

  test('respects in condition', ({ assert }) => {
    const field = {
      key: 'os',
      label: 'OS',
      type: 'text' as const,
      isRequired: false,
      options: null,
      sortOrder: 0,
      showIf: { fieldKey: 'platform', in: ['web', 'mobile'] },
    }
    assert.isTrue(isFieldVisible(field, { platform: 'web' }))
    assert.isFalse(isFieldVisible(field, { platform: 'desktop' }))
  })
})

test.group('Widget | screenshot helpers', () => {
  test('flags cross-origin urls relative to page', ({ assert }) => {
    assert.isFalse(isCrossOrigin('/img.png', 'https://app.test'))
    assert.isTrue(isCrossOrigin('https://cdn.other.com/x.png', 'https://app.test'))
    assert.isFalse(isCrossOrigin('https://app.test/y.png', 'https://app.test'))
    assert.isFalse(isCrossOrigin('data:image/png;base64,xxx', 'https://app.test'))
  })

  test('treats absolute urls as cross-origin when no page origin', ({ assert }) => {
    assert.isTrue(isCrossOrigin('https://example.com/x.png'))
  })

  test('builds proxy image url', ({ assert }) => {
    const url = proxyImageUrl('https://track.test', 'https://cdn.x/y.png')
    assert.equal(url, 'https://track.test/api/public/proxy-image?url=https%3A%2F%2Fcdn.x%2Fy.png')
  })
})

test.group('Widget | error capture parsing', () => {
  test('parses fetch target from string and Request', ({ assert }) => {
    assert.deepEqual(parseRequestTarget('/api/x', { method: 'POST' }), {
      url: '/api/x',
      method: 'POST',
    })
    const req = new Request('https://api.test/reports', { method: 'PUT' })
    assert.deepEqual(parseRequestTarget(req), { url: 'https://api.test/reports', method: 'PUT' })
  })
})

test.group('Widget | i18n', () => {
  test('falls back to english and interpolates vars', ({ assert }) => {
    const i18n = new I18n('en')
    assert.equal(i18n.t('widget.open'), 'Report a bug')
    assert.equal(i18n.t('widget.pinned', { selector: 'div > a' }), 'Pinned: div > a')
  })

  test('uses requested locale dictionary', ({ assert }) => {
    const i18n = new I18n('es')
    assert.equal(i18n.t('widget.open'), 'Reportar un error')
  })

  test('detects locale from explicit hint and falls back to english', ({ assert }) => {
    assert.equal(detectLocale('de'), 'de')
    assert.equal(detectLocale('fr'), 'en')
    assert.equal(detectLocale(), 'en')
  })
})

test.group('Widget | offline queue', (group) => {
  group.setup(() => {
    // @ts-expect-error - localStorage stub
    global.localStorage = new FakeStorage()
    clearQueue()
  })

  test('enqueues and loads reports', ({ assert }) => {
    const payload: ReportPayload = {
      title: 'Broken button',
      reporterEmail: 'a@example.com',
      fieldValues: { description: 'x' },
    }
    const queue = enqueue(payload)
    assert.lengthOf(queue, 1)
    assert.equal(loadQueue()[0].payload.title, 'Broken button')
    clearQueue()
    assert.lengthOf(loadQueue(), 0)
  })
})

test.group('Widget | bundle size', () => {
  test('gzipped widget bundle is under 150KB', ({ assert }) => {
    const file = `${process.cwd()}/public/widget/v1/widget.js`
    if (!existsSync(file)) {
      // Bundle is produced by `pnpm build:widget`; skip when not built.
      return
    }
    const raw = readFileSync(file)
    const gzipped = gzipSync(raw).length
    assert.isBelow(gzipped, 150 * 1024, `gzipped widget is ${(gzipped / 1024).toFixed(1)}KB`)
  })
})

test.group('Widget | high-fidelity capture', () => {
  test('detects Screen Capture API availability', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const origDesc = Object.getOwnPropertyDescriptor(global as any, 'navigator')
    Object.defineProperty(global as any, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    })
    assert.isFalse(mod.isDisplayMediaAvailable())
    Object.defineProperty(global as any, 'navigator', {
      value: { mediaDevices: {} },
      writable: true,
      configurable: true,
    })
    assert.isFalse(mod.isDisplayMediaAvailable())
    Object.defineProperty(global as any, 'navigator', {
      value: { mediaDevices: { getDisplayMedia: async () => ({}) } },
      writable: true,
      configurable: true,
    })
    assert.isTrue(mod.isDisplayMediaAvailable())
    if (origDesc) Object.defineProperty(global as any, 'navigator', origDesc)
    else delete (global as any).navigator
  })

  test('consent flow is one-time and opt-in', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    // Use FakeStorage for localStorage
    ;(global as any).localStorage = new (class {
      private store = new Map<string, string>()
      getItem(k: string) {
        return this.store.has(k) ? this.store.get(k)! : null
      }
      setItem(k: string, v: string) {
        this.store.set(k, String(v))
      }
      removeItem(k: string) {
        this.store.delete(k)
      }
    })()
    mod.clearHighFidelityConsent()
    assert.isFalse(mod.hasHighFidelityConsent())
    mod.setHighFidelityConsent(true)
    assert.isTrue(mod.hasHighFidelityConsent())
    mod.setHighFidelityConsent(false)
    assert.isFalse(mod.hasHighFidelityConsent())
    mod.clearHighFidelityConsent()
    assert.isFalse(mod.hasHighFidelityConsent())
  })

  test('collectSafeFontCss skips empty fontFamily (Vite dev Firefox)', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const origDocument = (global as any).document
    const fakeRuleEmpty = {
      style: { getPropertyValue: (k: string) => (k === 'font-family' ? '' : '') },
      cssText: '@font-face { font-family: ""; src: url("bad.woff"); }',
    }
    const fakeRuleValid = {
      style: { getPropertyValue: (k: string) => (k === 'font-family' ? '"Inter"' : '') },
      cssText: '@font-face { font-family: "Inter"; src: url("inter.woff"); }',
    }
    // Mock CSSFontFaceRule for instanceof check
    ;(global as any).CSSFontFaceRule = class CSSFontFaceRule {}
    Object.setPrototypeOf(fakeRuleEmpty, (global as any).CSSFontFaceRule.prototype)
    Object.setPrototypeOf(fakeRuleValid, (global as any).CSSFontFaceRule.prototype)
    ;(global as any).document = {
      styleSheets: [
        {
          cssRules: [fakeRuleEmpty, fakeRuleValid],
        },
      ],
    }
    const css = mod.collectSafeFontCss()
    assert.include(css ?? '', 'Inter')
    assert.notInclude(css ?? '', 'font-family: ""')
    ;(global as any).document = origDocument
    delete (global as any).CSSFontFaceRule
  })

  test('enforceMaxSize keeps small screenshots', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const small = 'data:image/png;base64,' + 'A'.repeat(1000)
    const result = await mod.enforceMaxSize(small)
    assert.equal(result, small)
  })

  test('enforceMaxSize re-encodes large screenshots to JPEG', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    // Mock Image and canvas for Node environment
    const origImage = (global as any).Image
    const origDocument = (global as any).document
    let capturedQuality: number | null = null
    ;(global as any).Image = class MockImage {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      naturalWidth = 100
      naturalHeight = 100
      private _srcVal = ''
      set src(v: string) {
        this._srcVal = v
        setTimeout(() => this.onload?.(), 0)
      }
      get src() {
        return this._srcVal
      }
    }
    ;(global as any).document = {
      createElement: (tag: string) => {
        if (tag === 'canvas') {
          return {
            width: 0,
            height: 0,
            getContext: () => ({
              fillStyle: '',
              fillRect: () => {},
              drawImage: () => {},
            }),
            toDataURL: (type: string, quality?: number) => {
              capturedQuality = quality ?? null
              // Return a smaller JPEG
              return 'data:image/jpeg;base64,' + 'B'.repeat(100)
            },
          }
        }
        return origDocument?.createElement?.(tag) ?? {}
      },
    }
    const large = 'data:image/png;base64,' + 'A'.repeat(mod.MAX_SIZE_BYTES + 100)
    const result = await mod.enforceMaxSize(large)
    assert.isTrue(result.startsWith('data:image/jpeg'))
    assert.equal(capturedQuality, 0.7)
    ;(global as any).Image = origImage
    ;(global as any).document = origDocument
  })

  test('getHtmlToImageOptions respects capture modes', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const origWindow = (global as any).window
    const origDocument = (global as any).document
    ;(global as any).window = {
      devicePixelRatio: 3,
      innerWidth: 1280,
      innerHeight: 800,
      scrollX: 100,
      scrollY: 200,
    }
    ;(global as any).document = {
      documentElement: { scrollWidth: 2500, scrollHeight: 4000 },
      styleSheets: [],
    }
    // HiDPI capped at 2
    let opts: any = mod.getHtmlToImageOptions('fullpage')
    assert.equal(opts.pixelRatio, 2)
    assert.equal(opts.width, 2500)
    assert.equal(opts.height, 4000)

    opts = mod.getHtmlToImageOptions('visible')
    assert.equal(opts.width, 1280)
    assert.equal(opts.height, 800)
    assert.include(opts.style.transform, '-100px')
    assert.include(opts.style.transform, '-200px')

    // Restore
    ;(global as any).window = origWindow
    ;(global as any).document = origDocument
  })

  test('captureScreenshot falls back when displayMedia denied', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const origNavigatorDesc = Object.getOwnPropertyDescriptor(global as any, 'navigator')
    const origLocalStorage = (global as any).localStorage
    const origDocument = (global as any).document
    const origWindow = (global as any).window
    // Mock localStorage with consent granted
    ;(global as any).localStorage = {
      getItem: (k: string) => (k === 'trackboard:high-fidelity-consent' ? 'granted' : null),
      setItem: () => {},
      removeItem: () => {},
    }
    Object.defineProperty(global as any, 'navigator', {
      value: {
        mediaDevices: {
          getDisplayMedia: async () => {
            const e: any = new Error('Permission denied')
            e.name = 'NotAllowedError'
            throw e
          },
        },
      },
      writable: true,
      configurable: true,
    })
    ;(global as any).document = {
      documentElement: { scrollWidth: 1200, scrollHeight: 800 },
      styleSheets: [],
      createElement: (tag: string) => {
        if (tag === 'canvas') {
          return {
            width: 0,
            height: 0,
            getContext: () => null,
            toDataURL: () => 'data:image/png;base64,fallback',
          }
        }
        return {}
      },
      fonts: { ready: Promise.resolve() },
    }
    ;(global as any).window = {
      devicePixelRatio: 1,
      innerWidth: 1024,
      innerHeight: 768,
      scrollX: 0,
      scrollY: 0,
    }
    // Ensure images collection exists for preprocess
    ;(global as any).document.images = []
    // Mock html-to-image to return a valid png
    mod.__setToPngMock(async () => 'data:image/png;base64,fallback')
    const result = await mod.captureScreenshot('https://api.test', {
      mode: 'visible',
      highFidelity: true,
    })
    assert.equal(result, 'data:image/png;base64,fallback')
    mod.__resetToPngMock()
    if (origNavigatorDesc) Object.defineProperty(global as any, 'navigator', origNavigatorDesc)
    else delete (global as any).navigator
    ;(global as any).localStorage = origLocalStorage
    ;(global as any).document = origDocument
    ;(global as any).window = origWindow
  })

  test('captureScreenshot with element mode captures pinned element only', async ({ assert }) => {
    const mod = await import('../../src/widget/screenshot.js')
    const origDocument = (global as any).document
    const origWindow = (global as any).window
    ;(global as any).document = {
      documentElement: { scrollWidth: 1200, scrollHeight: 800 },
      styleSheets: [],
      createElement: (tag: string) => ({}),
      fonts: { ready: Promise.resolve() },
      images: [],
    }
    ;(global as any).window = {
      devicePixelRatio: 1,
      innerWidth: 1024,
      innerHeight: 768,
      scrollX: 0,
      scrollY: 0,
    }
    if (typeof location === 'undefined') (global as any).location = { origin: 'https://app.test' }
    let capturedNode: any = null
    mod.__setToPngMock(async (node: any) => {
      capturedNode = node
      return 'data:image/png;base64,element'
    })
    const fakeEl = { tagName: 'DIV', nodeType: 1 } as unknown as HTMLElement
    const result = await mod.captureScreenshot('https://api.test', {
      target: fakeEl,
      mode: 'element',
      highFidelity: false,
    })
    assert.equal(result, 'data:image/png;base64,element')
    assert.equal(capturedNode, fakeEl)
    mod.__resetToPngMock()
    ;(global as any).document = origDocument
    ;(global as any).window = origWindow
  })
})
