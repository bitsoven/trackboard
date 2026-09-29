import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Add a human-readable sequential report number (`#TB-<number>`) alongside the
 * UUID primary key. Existing rows are backfilled in creation order; new rows
 * are numbered by the Report model's `beforeCreate` hook.
 */
export default class extends BaseSchema {
  protected tableName = 'reports'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('number').nullable()
      table.unique(['number'])
    })

    this.defer(async (db) => {
      const rows = await db.from(this.tableName).select('id').orderBy('created_at', 'asc')
      let next = 1
      for (const row of rows) {
        await db.from(this.tableName).where('id', row.id).update({ number: next })
        next += 1
      }
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('number')
    })
  }
}
