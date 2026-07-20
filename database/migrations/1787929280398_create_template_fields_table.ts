import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'template_fields'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('report_template_id')
        .unsigned()
        .references('id')
        .inTable('report_templates')
        .onDelete('CASCADE')
        .notNullable()
      table.string('key').notNullable()
      table.string('label').notNullable()
      table.string('type').notNullable()
      table.boolean('is_required').notNullable().defaultTo(false)
      table.json('options').nullable()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.json('show_if').nullable()

      table.unique(['report_template_id', 'key'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
