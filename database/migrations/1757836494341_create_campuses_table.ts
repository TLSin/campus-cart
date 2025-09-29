import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'campuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('campus_id')
      table.string('campus').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}