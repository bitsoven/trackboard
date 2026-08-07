/**
 * Build a reasonably stable CSS selector for an element: prefers id, otherwise
 * walks up the tree using tag names and :nth-child indices. Pure (no DOM
 * mutation) so it can be unit-tested.
 */
export function generateSelector(el: Element): string {
  if (!(el instanceof Element)) {
    throw new Error('generateSelector expects a DOM Element')
  }
  if (el.id) {
    return `${tagName(el)}#${el.id}`
  }

  const parts: string[] = []
  let current: Element | null = el

  while (
    current &&
    current.nodeType === 1 &&
    current !== document.documentElement &&
    current !== document.body
  ) {
    let part = tagName(current)
    if (current.id) {
      part += `#${current.id}`
    } else {
      const parent = current.parentElement
      if (parent) {
        const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName)
        if (siblings.length > 1) {
          const index = Array.from(parent.children).indexOf(current) + 1
          part += `:nth-child(${index})`
        }
      }
    }
    parts.unshift(part)
    current = current.parentElement
  }

  return parts.join(' > ')
}

function tagName(el: Element): string {
  return el.tagName.toLowerCase()
}

/**
 * Enable hover-highlight + click-to-lock element pinning. Returns a disposer.
 */
export function startElementPin(onSelect: (el: Element, selector: string) => void): () => void {
  let hovered: Element | null = null

  const onMove = (event: MouseEvent) => {
    const target = event.target as Element | null
    if (!target || !(target instanceof Element)) return
    if (hovered && hovered !== target) hovered.classList.remove('tb-highlight')
    hovered = target
    hovered.classList.add('tb-highlight')
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null
    if (!target || !(target instanceof Element)) return
    event.preventDefault()
    event.stopPropagation()
    onSelect(target, generateSelector(target))
  }

  document.addEventListener('mousemove', onMove, true)
  document.addEventListener('click', onClick, true)

  return () => {
    document.removeEventListener('mousemove', onMove, true)
    document.removeEventListener('click', onClick, true)
    if (hovered) hovered.classList.remove('tb-highlight')
  }
}
