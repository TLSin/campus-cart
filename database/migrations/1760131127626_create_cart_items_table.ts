import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('cart_item_id')
      table.integer('cart_id').unsigned().references('cart_id').inTable('carts').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('product_id').inTable('products').onDelete('CASCADE')
      table.integer('quantity')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}