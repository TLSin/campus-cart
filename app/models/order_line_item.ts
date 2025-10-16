import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderHistory from './order_history.js'
import Product from './product.js'

export default class OrderLineItem extends BaseModel {
  @column({ isPrimary: true })
  declare orderLineId: number

  @column()
  declare orderHistoryId: number 

  @column()
  declare productId: number 

  @column()
  declare quantity: number 

  @column()
  declare price: number

  @column()
  declare productName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => OrderHistory, {
    foreignKey: 'orderHistoryId'
  })
  declare order: BelongsTo<typeof OrderHistory>

  @belongsTo(() => Product, {
    foreignKey: 'productId'
  })
  declare product: BelongsTo<typeof Product>
}