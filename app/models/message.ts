import { MessageSchema } from '#database/schema'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { belongsTo } from '@adonisjs/lucid/orm'
import Conversation from '#models/conversation'

export default class Message extends MessageSchema {
  @belongsTo(() => Conversation, { foreignKey: 'conversationId' })
  declare conversation: BelongsTo<typeof Conversation>

  get authorName(): string {
    return this.authorType === 'team' ? 'Team' : 'Reporter'
  }

  get isOutbound(): boolean {
    return this.direction === 'outbound'
  }
}
