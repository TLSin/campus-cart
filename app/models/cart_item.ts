import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from './product.js'
import Cart from './cart.js'
import type{ BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare cartItemId: number

  @column()
  declare cartId: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cart, {
    foreignKey: 'cartId'
  })
  declare cart: BelongsTo<typeof Cart>

  @belongsTo(() => Product, {
    foreignKey: 'productId'
  })
  declare product: BelongsTo<typeof Product>
}