import { type WidgetField, type WidgetFieldOptions } from './types.js'

interface FieldProps {
  field: WidgetField
  value: unknown
  error?: string
  onChange: (value: unknown) => void
}

function textValue(value: unknown): string {
  return value === undefined || value === null ? '' : String(value)
}

function boolValue(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on'
}

export function Field(props: FieldProps) {
  const { field, value, error, onChange } = props
  const options: WidgetFieldOptions = field.options ?? {}
  const label = (
    <label class="tb-label" for={`tb-${field.key}`}>
      {field.label}
      {field.isRequired && <span class="tb-req"> *</span>}
    </label>
  )

  let control: preact.JSX.Element

  switch (field.type) {
    case 'textarea': {
      control = (
        <textarea
          id={`tb-${field.key}`}
          class="tb-textarea"
          placeholder={options.placeholder}
          maxLength={options.maxLength}
          value={textValue(value)}
          onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
        />
      )
      break
    }
    case 'select': {
      const choices = options.choices ?? []
      control = (
        <select
          id={`tb-${field.key}`}
          class="tb-select"
          value={textValue(value)}
          onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        >
          <option value="">—</option>
          {choices.map((c: string) => (
            <option value={c} selected={c === textValue(value)}>
              {c}
            </option>
          ))}
        </select>
      )
      break
    }
    case 'radio': {
      const choices = options.choices ?? []
      control = (
        <div>
          {choices.map((c: string) => (
            <div class="tb-radio">
              <input
                type="radio"
                id={`tb-${field.key}-${c}`}
                name={`tb-${field.key}`}
                value={c}
                checked={textValue(value) === c}
                onChange={() => onChange(c)}
              />
              <label for={`tb-${field.key}-${c}`}>{c}</label>
            </div>
          ))}
        </div>
      )
      break
    }
    case 'checkbox': {
      const choices = options.choices ?? []
      if (choices.length > 0) {
        const arr = Array.isArray(value) ? (value as string[]) : []
        control = (
          <div>
            {choices.map((c: string) => (
              <div class="tb-check">
                <input
                  type="checkbox"
                  id={`tb-${field.key}-${c}`}
                  value={c}
                  checked={arr.includes(c)}
                  onChange={(e) => {
                    const checked = (e.target as HTMLInputElement).checked
                    const next = checked ? [...arr, c] : arr.filter((x) => x !== c)
                    onChange(next)
                  }}
                />
                <label for={`tb-${field.key}-${c}`}>{c}</label>
              </div>
            ))}
          </div>
        )
      } else {
        control = (
          <div class="tb-check">
            <input
              type="checkbox"
              id={`tb-${field.key}`}
              checked={boolValue(value)}
              onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
            />
          </div>
        )
      }
      break
    }
    case 'number': {
      control = (
        <input
          id={`tb-${field.key}`}
          class="tb-input"
          type="number"
          min={options.min}
          max={options.max}
          value={value === undefined || value === null ? '' : Number(value)}
          onInput={(e) => onChange((e.target as HTMLInputElement).valueAsNumber)}
        />
      )
      break
    }
    case 'date': {
      control = (
        <input
          id={`tb-${field.key}`}
          class="tb-input"
          type="date"
          value={textValue(value)}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        />
      )
      break
    }
    case 'file': {
      control = (
        <input
          id={`tb-${field.key}`}
          class="tb-input"
          type="file"
          accept={options.accept}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        />
      )
      break
    }
    case 'severity-scale': {
      const min = typeof options.scaleMin === 'number' ? options.scaleMin : 1
      const max = typeof options.scaleMax === 'number' ? options.scaleMax : 5
      const steps: number[] = []
      for (let i = min; i <= max; i++) steps.push(i)
      control = (
        <div class="tb-scale">
          {steps.map((s) => (
            <button
              type="button"
              class={Number(value) === s ? 'active' : ''}
              onClick={() => onChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )
      break
    }
    case 'text':
    default: {
      control = (
        <input
          id={`tb-${field.key}`}
          class="tb-input"
          type="text"
          placeholder={options.placeholder}
          maxLength={options.maxLength}
          value={textValue(value)}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        />
      )
      break
    }
  }

  return (
    <div class="tb-field">
      {label}
      {control}
      {error && <div class="tb-error">{error}</div>}
    </div>
  )
}
