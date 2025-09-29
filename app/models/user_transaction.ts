import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Product from './product.js'

export default class UserTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare transactionId: number

  @column()
  declare studentId: number
  
  @column()
  declare productId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare quantity: number

  @belongsTo(() => User, {
    foreignKey: 'studentId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>
}