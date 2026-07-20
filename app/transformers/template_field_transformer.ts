import type TemplateField from '#models/template_field'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TemplateFieldTransformer extends BaseTransformer<TemplateField> {
  toObject() {
    return {
      id: this.resource.id,
      reportTemplateId: this.resource.reportTemplateId,
      key: this.resource.key,
      label: this.resource.label,
      type: this.resource.type,
      isRequired: this.resource.isRequired,
      options: this.resource.options,
      sortOrder: this.resource.sortOrder,
      showIf: this.resource.showIf,
    }
  }
}
