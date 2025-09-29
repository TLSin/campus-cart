import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare productId: number

  @column()
  declare productName: string
  
  @column()
  declare description: string
  
  @column()
  declare productPrice: number
  
  @column()
  declare stockQuantity: number
  
  @column()
  declare imageUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'productId',
  })
  declare products: HasMany<typeof Product>
}