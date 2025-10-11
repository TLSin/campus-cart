import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Product from './product.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class ProductImage extends BaseModel {
  @column({ isPrimary: true })
  declare imageId: number

  @column()
  declare productId: number

  @column()
  declare imgUrl: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ProductImage, {
    foreignKey: 'productId',
  })
  declare product: HasMany<typeof ProductImage>
}