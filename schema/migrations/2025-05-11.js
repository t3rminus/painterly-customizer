module.exports = {
  async up(db) {
    await db.schema
      .alterTable('option-group')
      .renameTo('option_group')
      .execute();
    await db.schema
      .alterTable('option')
      .renameColumn('option-group', 'optionGroup')
      .execute();
  },
  async down(db) {
    await db.schema
      .alterTable('option_group')
      .renameTo('option-group')
      .execute();
    await db.schema
      .alterTable('option')
      .renameColumn('optionGroup', 'option-group')
      .execute();
  }
};