import { ConversationSchema } from '#database/schema'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Report from '#models/report'
import Message from '#models/message'

export default class Conversation extends ConversationSchema {
  @belongsTo(() => Report, { foreignKey: 'reportId' })
  declare report: BelongsTo<typeof Report>

  @hasMany(() => Message, { foreignKey: 'conversationId' })
  declare messages: HasMany<typeof Message>
}
