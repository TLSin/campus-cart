import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

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

  // @hasMany(() => ProductImage, {
  //   foreignKey: 'imgUrl',
  // })
  // declare images: HasMany<typeof ProductImage>

  @belongsTo(() => Product, {
    foreignKey: 'productId'
  })
  declare product: BelongsTo<typeof  Product>
}