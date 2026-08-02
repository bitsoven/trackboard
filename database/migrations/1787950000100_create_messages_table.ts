import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('conversation_id')
        .unsigned()
        .references('id')
        .inTable('conversations')
        .onDelete('CASCADE')
        .notNullable()
      table.string('direction', 16).notNullable().checkIn(['inbound', 'outbound'])
      table.string('author_type', 16).notNullable().checkIn(['team', 'reporter'])
      table.integer('author_id').unsigned().nullable()
      table.text('body').notNullable()
      table.string('email_message_id').nullable()
      table.string('in_reply_to').nullable()
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
