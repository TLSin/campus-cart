import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import ProductImage from './product_image.js'

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
  declare imgUrl: string | null

  @column()
  declare stockQuantity: number

  @column()
  declare categoryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @hasMany(() => Product, {
  //   foreignKey: 'productId',
  // })
  // declare products: HasMany<typeof Product>

  @hasMany(() => ProductImage, {
    foreignKey: 'productId',
  })
  declare images: HasMany<typeof ProductImage>
  
  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Category>
}