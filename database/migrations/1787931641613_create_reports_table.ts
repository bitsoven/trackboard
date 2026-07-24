import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

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
      table
        .integer('template_id')
        .unsigned()
        .references('id')
        .inTable('report_templates')
        .onDelete('SET NULL')
        .nullable()
      table.string('title').notNullable()
      table.string('status').notNullable().defaultTo('open')
      table.string('priority').notNullable().defaultTo('medium')
      table.string('reporter_email', 254).nullable()
      table.timestamp('reporter_verified_at').nullable()
      table.string('page_url').nullable()
      table.json('browser_info').nullable()
      table.json('console_errors').nullable()
      table.json('network_errors').nullable()
      table.string('screenshot_url').nullable()
      table
        .integer('assignee_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
