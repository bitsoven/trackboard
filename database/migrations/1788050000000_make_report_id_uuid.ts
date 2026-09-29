import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Convert report IDs from auto-increment integers to UUID strings.
 *
 * SQLite cannot alter a primary key's type, so `reports`, `report_field_values`
 * and `conversations` are dropped and recreated. PostgreSQL supports
 * `ALTER COLUMN ... TYPE`, so the foreign keys are dropped, the columns are
 * widened to `varchar(36)` and the foreign keys are recreated.
 *
 * Existing rows are intentionally discarded: the tables are recreated from
 * scratch rather than migrated.
 */
export default class extends BaseSchema {
  static disableTransactions = true

  private isSqlite() {
    const dialect = this.db.dialect.name
    return dialect === 'better-sqlite3' || dialect === 'sqlite3' || dialect === 'libsql'
  }

  async up() {
    if (this.isSqlite()) {
      return this.rebuildSqlite(true)
    }
    return this.alterPostgres(true)
  }

  async down() {
    if (this.isSqlite()) {
      return this.rebuildSqlite(false)
    }
    return this.alterPostgres(false)
  }

  /**
   * SQLite: drop and recreate the three tables. `uuid` selects the new
   * string-based schema, `false` restores the original integer schema.
   */
  private async rebuildSqlite(uuid: boolean) {
    const db = this.db
    await db.rawQuery('PRAGMA foreign_keys = OFF')

    try {
      await db.schema.dropTableIfExists('conversations')
      await db.schema.dropTableIfExists('report_field_values')
      await db.schema.dropTableIfExists('reports')

      if (uuid) {
        await this.createUuidTables()
      } else {
        await this.createIntegerTables()
      }
    } finally {
      await db.rawQuery('PRAGMA foreign_keys = ON')
    }
  }

  /**
   * PostgreSQL: widen the id columns to `varchar(36)` (or narrow them back to
   * integer on rollback) without recreating the tables.
   */
  private async alterPostgres(uuid: boolean) {
    const db = this.db

    await this.dropReportForeignKeys()

    if (uuid) {
      await db.rawQuery('ALTER TABLE reports ALTER COLUMN id DROP DEFAULT')
      await db.rawQuery('ALTER TABLE reports ALTER COLUMN id TYPE varchar(36) USING id::text')
    } else {
      await db.rawQuery('ALTER TABLE reports ALTER COLUMN id TYPE integer USING id::integer')
      await db.rawQuery('CREATE SEQUENCE IF NOT EXISTS reports_id_seq OWNED BY reports.id')
      await db.rawQuery("ALTER TABLE reports ALTER COLUMN id SET DEFAULT nextval('reports_id_seq')")
      await db.rawQuery(
        "SELECT setval('reports_id_seq', COALESCE((SELECT MAX(id) FROM reports), 1))"
      )
    }

    const reportIdType = uuid
      ? 'varchar(36) USING report_id::text'
      : 'integer USING report_id::integer'
    await db.rawQuery(`ALTER TABLE report_field_values ALTER COLUMN report_id TYPE ${reportIdType}`)
    await db.rawQuery(`ALTER TABLE conversations ALTER COLUMN report_id TYPE ${reportIdType}`)

    await this.createReportForeignKeys()
  }

  private async dropReportForeignKeys() {
    const db = this.db
    await db.rawQuery(
      'ALTER TABLE report_field_values DROP CONSTRAINT IF EXISTS report_field_values_report_id_foreign'
    )
    await db.rawQuery(
      'ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_report_id_foreign'
    )
  }

  private async createReportForeignKeys() {
    const db = this.db
    await db.rawQuery(
      'ALTER TABLE report_field_values ADD CONSTRAINT report_field_values_report_id_foreign FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE'
    )
    await db.rawQuery(
      'ALTER TABLE conversations ADD CONSTRAINT conversations_report_id_foreign FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE'
    )
  }

  private async createUuidTables() {
    const db = this.db

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
      table
        .string('report_id', 36)
        .references('id')
        .inTable('reports')
        .onDelete('CASCADE')
        .notNullable()
      table.string('field_key').notNullable()
      table.text('value').nullable()
      table.unique(['report_id', 'field_key'])
    })

    await db.schema.createTable('conversations', (table) => {
      table.increments('id').notNullable()
      table
        .string('report_id', 36)
        .references('id')
        .inTable('reports')
        .onDelete('CASCADE')
        .notNullable()
        .unique()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  private async createIntegerTables() {
    const db = this.db

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
  }
}
