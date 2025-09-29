import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'programs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('program_id')
      table.string('program').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}