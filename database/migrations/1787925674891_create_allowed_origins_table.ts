import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'allowed_origins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .notNullable()
      table.string('origin').notNullable()
      table.unique(['project_id', 'origin'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
