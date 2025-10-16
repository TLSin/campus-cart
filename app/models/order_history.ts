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
  declare totalAmount: number

  @column()
  declare shippingFee: number

  @column()
  declare status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' 

  @column()
  declare paymentMethod: 'COD' | 'GCash' | 'Maya'

  @column()
  declare shippingAddress: string

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