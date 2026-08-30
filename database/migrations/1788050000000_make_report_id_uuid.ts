import { BaseSchema } from '@adonisjs/lucid/schema'
import { randomUUID } from 'node:crypto'

/**
 * Convert report IDs from auto-increment integers to UUID strings.
 *
 * SQLite cannot alter a primary key's type, so the `reports`,
 * `report_field_values` and `conversations` tables are rebuilt. `conversations.id`
 * is preserved (messages reference it) while `reports.id` and the two columns
 * that reference it (`report_field_values.report_id`, `conversations.report_id`)
 * become UUID strings. Existing rows are backfilled with generated UUIDs.
 *
 * Foreign-key enforcement is disabled for the rebuild and transactions are
 * disabled so the PRAGMA takes effect.
 */
export default class extends BaseSchema {
  static disableTransactions = true

  async up() {
    const db = this.db
    await db.rawQuery('PRAGMA foreign_keys = OFF')

    try {
      // Snapshot existing data
      const reports = await db.from('reports').select('*')
      const fieldValues = await db.from('report_field_values').select('*')
      const conversations = await db.from('conversations').select('*')

      const idMap = new Map<number, string>()
      for (const r of reports) idMap.set(Number(r.id), randomUUID())

      // Drop children first, then reports
      await db.schema.dropTableIfExists('conversations')
      await db.schema.dropTableIfExists('report_field_values')
      await db.schema.dropTableIfExists('reports')

      // Recreate
      await db.schema.createTable('reports', (table) => {
        table.string('id', 36).notNullable().primary()
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
        table.string('verification_token').nullable()
        table.timestamp('verification_sent_at').nullable()
        table.string('reply_to_token').nullable()
      })

      await db.schema.createTable('report_field_values', (table) => {
        table.increments('id').notNullable()
        table.string('report_id', 36).references('id').inTable('reports').onDelete('CASCADE').notNullable()
        table.string('field_key').notNullable()
        table.text('value').nullable()
        table.unique(['report_id', 'field_key'])
      })

      await db.schema.createTable('conversations', (table) => {
        table.increments('id').notNullable()
        table.string('report_id', 36).references('id').inTable('reports').onDelete('CASCADE').notNullable().unique()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
      })

      // Backfill data (preserve conversations.id so messages keep working)
      for (const r of reports) {
        await db.table('reports').insert({
          id: idMap.get(Number(r.id)),
          project_id: r.project_id,
          template_id: r.template_id,
          title: r.title,
          status: r.status,
          priority: r.priority,
          reporter_email: r.reporter_email,
          reporter_verified_at: r.reporter_verified_at,
          page_url: r.page_url,
          browser_info: r.browser_info,
          console_errors: r.console_errors,
          network_errors: r.network_errors,
          screenshot_url: r.screenshot_url,
          assignee_id: r.assignee_id,
          created_at: r.created_at,
          updated_at: r.updated_at,
          verification_token: r.verification_token,
          verification_sent_at: r.verification_sent_at,
          reply_to_token: r.reply_to_token,
        })
      }
      for (const fv of fieldValues) {
        await db.table('report_field_values').insert({
          id: fv.id,
          report_id: idMap.get(Number(fv.report_id)),
          field_key: fv.field_key,
          value: fv.value,
        })
      }
      for (const c of conversations) {
        await db.table('conversations').insert({
          id: c.id,
          report_id: idMap.get(Number(c.report_id)),
          created_at: c.created_at,
          updated_at: c.updated_at,
        })
      }
    } finally {
      await db.rawQuery('PRAGMA foreign_keys = ON')
    }
  }

  async down() {
    const db = this.db
    await db.rawQuery('PRAGMA foreign_keys = OFF')

    try {
      const reports = await db.from('reports').select('*')
      const fieldValues = await db.from('report_field_values').select('*')
      const conversations = await db.from('conversations').select('*')

      const idMap = new Map<string, number>()
      let seq = 1
      for (const r of reports) idMap.set(r.id, seq++)

      await db.schema.dropTableIfExists('conversations')
      await db.schema.dropTableIfExists('report_field_values')
      await db.schema.dropTableIfExists('reports')

      await db.schema.createTable('reports', (table) => {
        table.increments('id').notNullable()
        table.integer('project_id').unsigned().notNullable()
        table.integer('template_id').unsigned().nullable()
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
        table.integer('assignee_id').unsigned().nullable()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
        table.string('verification_token').nullable()
        table.timestamp('verification_sent_at').nullable()
        table.string('reply_to_token').nullable()
      })

      await db.schema.createTable('report_field_values', (table) => {
        table.increments('id').notNullable()
        table.integer('report_id').unsigned().notNullable()
        table.string('field_key').notNullable()
        table.text('value').nullable()
        table.unique(['report_id', 'field_key'])
      })

      await db.schema.createTable('conversations', (table) => {
        table.increments('id').notNullable()
        table.integer('report_id').unsigned().notNullable().unique()
        table.timestamp('created_at').notNullable()
        table.timestamp('updated_at').nullable()
      })

      for (const r of reports) {
        await db.table('reports').insert({
          id: idMap.get(r.id),
          project_id: r.project_id,
          template_id: r.template_id,
          title: r.title,
          status: r.status,
          priority: r.priority,
          reporter_email: r.reporter_email,
          reporter_verified_at: r.reporter_verified_at,
          page_url: r.page_url,
          browser_info: r.browser_info,
          console_errors: r.console_errors,
          network_errors: r.network_errors,
          screenshot_url: r.screenshot_url,
          assignee_id: r.assignee_id,
          created_at: r.created_at,
          updated_at: r.updated_at,
          verification_token: r.verification_token,
          verification_sent_at: r.verification_sent_at,
          reply_to_token: r.reply_to_token,
        })
      }
      for (const fv of fieldValues) {
        await db.table('report_field_values').insert({
          id: fv.id,
          report_id: idMap.get(fv.report_id),
          field_key: fv.field_key,
          value: fv.value,
        })
      }
      for (const c of conversations) {
        await db.table('conversations').insert({
          id: c.id,
          report_id: idMap.get(c.report_id),
          created_at: c.created_at,
          updated_at: c.updated_at,
        })
      }
    } finally {
      await db.rawQuery('PRAGMA foreign_keys = ON')
    }
  }
}
