import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'descriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('description_id')
      table.integer('group_id').unsigned().references('group_id').inTable('groups').onDelete('CASCADE')
      table.string('description', 255)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}