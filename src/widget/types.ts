export type WidgetFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'number'
  | 'date'
  | 'file'
  | 'severity-scale'

export interface WidgetFieldOptions {
  choices?: string[]
  placeholder?: string
  maxLength?: number
  minLength?: number
  min?: number
  max?: number
  accept?: string
  scaleMin?: number
  scaleMax?: number
  scaleLabels?: string[]
}

export interface ShowIfCondition {
  fieldKey: string
  equals?: unknown
  notEquals?: unknown
  in?: unknown[]
}

export interface WidgetField {
  key: string
  label: string
  type: WidgetFieldType
  isRequired: boolean
  options: WidgetFieldOptions | null
  sortOrder: number
  showIf: ShowIfCondition | null
}

export interface WidgetTemplate {
  id: number
  name: string
  isDefault: boolean
  fields: WidgetField[]
}

export interface WidgetProjectConfig {
  name: string
  requireEmailVerification: boolean
}

export interface WidgetConfig {
  project: WidgetProjectConfig
  template: WidgetTemplate | null
}

export interface RuntimeError {
  kind: 'console' | 'window' | 'unhandledrejection' | 'network'
  message: string
  timestamp: number
  detail?: string
}

export type CaptureMode = 'visible' | 'fullpage' | 'element'

export interface HighFidelityConfig {
  enabled: boolean
  consented: boolean
}

export interface WidgetSubmitResult {
  ok: boolean
  status: number
  reportId?: number
  errors?: unknown
}
