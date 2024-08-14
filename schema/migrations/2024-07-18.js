const { sql } = require('kysely');

module.exports = {
  async up(db) {
    await db.schema
      .createType('status')
      .asEnum(['pending', 'active', 'needswork', 'removed', 'hidden'])
      .execute();

    await db.schema
      .createTable('user')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('user', 'text', (col) => col.notNull().unique())
      .addColumn('password', 'text')
      .addColumn('admin', 'boolean', (col) => col.defaultTo(false).notNull())
      .addColumn('createdAt', sql`timestamptz`, (col) => col.defaultTo(sql`now()`).notNull())
      .addColumn('lastLogin', sql`timestamptz`)
      .execute();

    await db.schema
      .createTable('version')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('version', 'text', (col) => col.notNull().unique())
      .addColumn('packtemplate', 'text')
      .execute();

    await db.schema
      .createTable('category')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('name', 'text', (col) => col.notNull())
      .addColumn('parent', 'integer', (col) =>
        col.references('category.id').onDelete('set null')
      )
      .execute();

    await db.schema
      .createTable('option-group')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('name', 'text', (col) => col.notNull())
      .addColumn('category', 'integer', (col) =>
        col.references('category.id').onDelete('set null')
      )
      .execute();

    await db.schema
      .createTable('option')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('description', 'text', (col) => col.notNull())
      .addColumn('authors', 'json')
      .addColumn('tags', 'json')
      .addColumn('meta', 'json')
      .addColumn('preview', 'bytea')
      .addColumn('option-group', 'integer', (col) =>
        col.references('option-group.id').onDelete('set null')
      )
      .addColumn('user', 'integer', (col) =>
        col.references('user.id').onDelete('cascade')
      )
      .addColumn('createdAt', sql`timestamptz`)
      .addColumn('updatedAt', sql`timestamptz`)
      .execute();

    await db.schema
      .createTable('texture')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('option', 'integer', (col) =>
        col.references('option.id').onDelete('cascade')
      )
      .addColumn('path', 'text', (col) => col.notNull())
      .addColumn('compose', 'json')
      .addColumn('source', 'bytea')
      .addColumn('version', 'integer', (col) =>
        col.references('version.id').onDelete('set null')
      )
      .execute();
  },
  async down(db) {
    await db.schema.dropTable('texture').execute();
    await db.schema.dropTable('option').execute();
    await db.schema.dropTable('option-group').execute();
    await db.schema.dropTable('category').execute();
    await db.schema.dropTable('version').execute();
    await db.schema.dropTable('user').execute();
    await db.schema.dropType('status').execute();
  }
}