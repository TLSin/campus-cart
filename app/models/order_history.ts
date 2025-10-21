import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import OrderLineItem from './order_line_item.js'

export default class OrderHistory extends BaseModel {
  @column({ isPrimary: true })
  declare orderHistoryId: number

  @column()
  declare studentId: number 

  @column()
  declare totalAmount: string

  @column()
  declare shippingFee: string

  @column()
  declare status: 'Pending' | 'Awaiting Payment' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Payment Failed'

  @column()
  declare paymentMethod: 'COD' | 'GCash'

  @column()
  declare shippingAddress: string

  @column()
  declare xenditExternalId: string | null

  @column()
  declare paymentQrCodeUrl: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'studentId'
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => OrderLineItem, {
    foreignKey: 'orderHistoryId'
  })
  declare items: HasMany<typeof OrderLineItem>
}