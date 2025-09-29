import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_id')
      table.string('product_name').notNullable()
      table.text('description').notNullable()
      table.decimal('product_price', 10, 2).notNullable()
      table.integer('stock_quantity').notNullable().defaultTo(0)
      table.string('image_url').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}