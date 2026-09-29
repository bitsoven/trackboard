import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export type ReportFieldView = {
  fieldKey: string
  label: string
  type: string
  value: string | null
}

export type ReportView = {
  id: string
  number: number | null
  title: string
  status: string
  priority: string
  reporterEmail: string | null
  pageUrl: string | null
  browserInfo: any
  consoleErrors: any
  networkErrors: any
  screenshotUrl: string | null
  createdAt: string | null
  updatedAt: string | null
  assignee: { id: number; name: string | null; initials: string } | null
  assigneeId: number | null
  template: { id: number; name: string } | null
  fieldValues: ReportFieldView[]
  project: { id: number; name: string; slug: string } | null
}

/** Fields the widget treats as built-ins, never shown as template fields. */
const RESERVED_FIELDS = ['title', 'reporterEmail']

export function browserFromUserAgent(userAgent?: string | null): string {
  if (!userAgent) return '—'
  const patterns: Array<[RegExp, string]> = [
    [/Edg\/([\d.]+)/, 'Edge'],
    [/OPR\/([\d.]+)/, 'Opera'],
    [/Chrome\/([\d.]+)/, 'Chrome'],
    [/Firefox\/([\d.]+)/, 'Firefox'],
    [/Version\/([\d.]+).*Safari/, 'Safari'],
  ]
  for (const [pattern, name] of patterns) {
    const match = userAgent.match(pattern)
    if (match) return `${name} ${match[1]}`
  }
  return 'Unknown'
}

export function osFromUserAgent(userAgent?: string | null): string {
  if (!userAgent) return '—'
  if (/Windows NT 10/.test(userAgent)) return 'Windows 10/11'
  const windows = userAgent.match(/Windows NT ([\d.]+)/)
  if (windows) return `Windows ${windows[1]}`
  const mac = userAgent.match(/Mac OS X ([\d_]+)/)
  if (mac) return `macOS ${mac[1].replace(/_/g, '.')}`
  const android = userAgent.match(/Android ([\d.]+)/)
  if (android) return `Android ${android[1]}`
  const ios = userAgent.match(/OS ([\d_]+) like Mac OS X/)
  if (ios) return `iOS ${ios[1].replace(/_/g, '.')}`
  if (/Linux/.test(userAgent)) return 'Linux'
  return 'Unknown'
}

/** Turn a reporter email into a human-ish display name ("j.kim@x" → "J Kim"). */
export function displayNameFromEmail(email?: string | null): string {
  if (!email) return 'Unknown reporter'
  const local = email.split('@')[0] ?? email
  const name = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
  return name || email
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
}

export function relativeTime(iso?: string | null): string {
  if (!iso) return '—'
  const timestamp = new Date(iso).getTime()
  if (Number.isNaN(timestamp)) return '—'

  const diff = timestamp - Date.now()
  const abs = Math.abs(diff)
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31_536_000_000],
    ['month', 2_592_000_000],
    ['week', 604_800_000],
    ['day', 86_400_000],
    ['hour', 3_600_000],
    ['minute', 60_000],
  ]
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  for (const [unit, ms] of units) {
    if (abs >= ms) return formatter.format(Math.round(diff / ms), unit)
  }
  return 'just now'
}

export function statusLabel(status: string): string {
  return status
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function priorityLabel(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

/** Board column accent dot, keyed by column key. */
export function columnDotClasses(key: string): string {
  switch (key) {
    case 'new':
      return 'bg-mark-dot'
    case 'in_progress':
      return 'bg-accent'
    case 'canceled':
      return 'bg-ink-300'
    case 'not_now':
      return 'bg-avatar-amber'
    default:
      return 'bg-avatar-teal'
  }
}

/** Type tag pill derived from the report's template name ("Bug Report" → "Bug"). */
export function typeTag(templateName?: string | null): string {
  return (templateName ?? '').split(' ')[0] || 'Report'
}

export function typeTagClasses(templateName?: string | null): string {
  switch (typeTag(templateName).toLowerCase()) {
    case 'bug':
      return 'bg-priority-bg text-priority-fg'
    case 'support':
      return 'bg-status-bg text-status-fg'
    case 'issue':
      return 'bg-avatar-amber/20 text-avatar-amber'
    case 'ui':
      return 'bg-avatar-teal/10 text-avatar-teal'
    default:
      return 'bg-type-bg text-type-fg'
  }
}

/** Priority indicator dot on board cards. */
export function priorityDotClasses(priority: string): string {
  switch (priority) {
    case 'critical':
    case 'high':
      return 'bg-mark-dot'
    case 'medium':
      return 'bg-avatar-teal'
    default:
      return 'bg-avatar-amber'
  }
}

/** Stable avatar tone derived from an email address. */
export function toneForEmail(email?: string | null): 'indigo' | 'teal' | 'amber' {
  const seed = `${email ?? ''}`.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return (['indigo', 'teal', 'amber'] as const)[seed % 3]
}

export function statusPillClasses(status: string): string {
  switch (status) {
    case 'resolved':
      return 'bg-avatar-teal/10 text-avatar-teal'
    case 'closed':
    case 'canceled':
    case 'not_now':
    case 'pending_verification':
      return 'bg-type-bg text-ink-600'
    default:
      return 'bg-status-bg text-status-fg'
  }
}

export function priorityPillClasses(priority: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-700'
    case 'high':
      return 'bg-priority-bg text-priority-fg'
    case 'medium':
      return 'bg-status-bg text-status-fg'
    default:
      return 'bg-type-bg text-ink-600'
  }
}

/**
 * Presentation-only derivations for the report detail page: reporter identity,
 * the environment card rows and how template fields are grouped.
 */
export function useReportDisplay(report: MaybeRefOrGetter<ReportView>) {
  const value = computed(() => toValue(report))

  const reporterName = computed(() => displayNameFromEmail(value.value.reporterEmail))
  const reporterInitials = computed(() => initialsFromName(reporterName.value))
  const reference = computed(() =>
    value.value.number ? `#TB-${value.value.number}` : `#${String(value.value.id).slice(0, 8)}`
  )

  const environmentRows = computed(() => {
    const info = value.value.browserInfo ?? {}
    const screen = info?.screen ?? {}
    return [
      { label: 'BROWSER', value: browserFromUserAgent(info?.userAgent) },
      { label: 'OS', value: osFromUserAgent(info?.userAgent) },
      { label: 'URL', value: value.value.pageUrl ?? '—' },
      {
        label: 'VIEWPORT',
        value: screen?.width && screen?.height ? `${screen.width} × ${screen.height}` : '—',
      },
    ]
  })

  const descriptionFields = computed(() =>
    value.value.fieldValues.filter((field) => field.type === 'textarea' && field.value)
  )

  const extraFields = computed(() =>
    value.value.fieldValues.filter(
      (field) => !RESERVED_FIELDS.includes(field.fieldKey) && field.type !== 'textarea'
    )
  )

  return {
    reporterName,
    reporterInitials,
    reference,
    environmentRows,
    descriptionFields,
    extraFields,
  }
}
