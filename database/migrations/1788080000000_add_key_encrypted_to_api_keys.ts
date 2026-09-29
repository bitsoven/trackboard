import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Store a reversibly-encrypted copy of each API key so the widget install page
 * can render a working embed snippet without asking the user to re-create a
 * token. Verification keeps using `key_hash`; `key_encrypted` is only for
 * display and is decrypted with the app key.
 */
export default class extends BaseSchema {
  protected tableName = 'api_keys'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('key_encrypted').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('key_encrypted')
    })
  }
}
