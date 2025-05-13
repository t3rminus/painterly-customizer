import { db } from '.';

export const getTexturesForOptions = (options) => {
  return db.selectFrom('texture')
    .selectAll()
    .where('option', 'in', options)
    .execute();
};

export const getOptionShape = (groupId) => {
  return db
    .selectFrom('texture')
    .innerJoin(
      (qb) =>
        qb
          .selectFrom('option')
          .select('id')
          .where('optionGroup', '=', groupId)
          .orderBy('order')
          .limit(1)
          .as('opts'),
      'texture.option',
      'opts.id'
    )
    .selectAll('texture')
    .execute();
};