import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('verification_token').nullable().unique()
      table.timestamp('verification_sent_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('verification_token')
      table.dropColumn('verification_sent_at')
    })
  }
}
