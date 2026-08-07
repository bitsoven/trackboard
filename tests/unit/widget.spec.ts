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
