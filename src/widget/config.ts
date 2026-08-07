import type { WidgetConfig } from './types.js'

export async function fetchConfig(apiBase: string, projectKey: string): Promise<WidgetConfig> {
  const url = `${apiBase.replace(/\/$/, '')}/api/public/widget/config?key=${encodeURIComponent(projectKey)}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`Widget config request failed with status ${res.status}`)
  }
  const body = (await res.json()) as { data: WidgetConfig }
  return body.data
}
