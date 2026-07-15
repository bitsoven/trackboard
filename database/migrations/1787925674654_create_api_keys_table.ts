import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'api_keys'

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
      table.string('key_hash').notNullable().unique()
      table.string('label').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('revoked_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
