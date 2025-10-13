import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import CartItem from './cart_item.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare cartId: number

  @column()
  declare studentId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'studentId'
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => CartItem, {
    foreignKey: 'cartId'
  })
  declare items: HasMany<typeof CartItem>
}