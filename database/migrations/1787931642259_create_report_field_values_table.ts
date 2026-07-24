import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'report_field_values'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('report_id')
        .unsigned()
        .references('id')
        .inTable('reports')
        .onDelete('CASCADE')
        .notNullable()
      table.string('field_key').notNullable()
      table.text('value').nullable()

      table.unique(['report_id', 'field_key'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
