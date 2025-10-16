import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'order_line_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_line_id')
      table.integer('order_history_id').unsigned().references('order_history_id').inTable('order_histories').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('product_id').inTable('products').onDelete('CASCADE')
      table.integer('quantity')
      table.decimal('price', 10, 2)
      table.string('product_name')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}