export interface ReportPayload {
  title: string
  reporterEmail: string
  pageUrl?: string
  templateId?: number
  fieldValues?: Record<string, unknown>
  browserInfo?: unknown
  consoleErrors?: unknown
  networkErrors?: unknown
  screenshotUrl?: string | null
}

export interface QueuedReport {
  payload: ReportPayload
  queuedAt: number
  attempts: number
}

const QUEUE_KEY = 'trackboard:offline-queue'

export function isOnline(): boolean {
  return typeof navigator === 'undefined' ? true : navigator.onLine !== false
}

export function loadQueue(): QueuedReport[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveQueue(queue: QueuedReport[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {
    // Storage may be unavailable (private mode / quota) — drop silently.
  }
}

export function enqueue(payload: ReportPayload): QueuedReport[] {
  const queue = loadQueue()
  queue.push({ payload, queuedAt: Date.now(), attempts: 0 })
  saveQueue(queue)
  return queue
}

export function clearQueue(): void {
  saveQueue([])
}

export async function submitReport(
  apiBase: string,
  projectKey: string,
  payload: ReportPayload
): Promise<unknown> {
  const url = `${apiBase.replace(/\/$/, '')}/api/public/reports?key=${encodeURIComponent(projectKey)}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    let errors: unknown
    try {
      errors = await res.json()
    } catch {
      errors = null
    }
    const error = new Error(`Report submit failed with status ${res.status}`) as Error & {
      status: number
      errors: unknown
    }
    error.status = res.status
    error.errors = errors
    throw error
  }
  return res.json()
}

/**
 * Attempt to send all queued reports. Returns how many were flushed and how
 * many remain. Failures stay in the queue for the next retry.
 */
export async function flushQueue(
  apiBase: string,
  projectKey: string
): Promise<{
  flushed: number
  remaining: number
}> {
  const queue = loadQueue()
  if (queue.length === 0) return { flushed: 0, remaining: 0 }

  const remaining: QueuedReport[] = []
  let flushed = 0
  for (const item of queue) {
    try {
      await submitReport(apiBase, projectKey, item.payload)
      flushed++
    } catch {
      remaining.push(item)
    }
  }
  saveQueue(remaining)
  return { flushed, remaining: remaining.length }
}

/**
 * Wire up automatic retry when the browser regains connectivity.
 */
export function registerReconnect(apiBase: string, projectKey: string): () => void {
  const handler = () => {
    if (isOnline()) void flushQueue(apiBase, projectKey)
  }
  window.addEventListener('online', handler)
  return () => window.removeEventListener('online', handler)
}
