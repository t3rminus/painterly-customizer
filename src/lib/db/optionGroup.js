import { db } from '.';

export const getOptionGroups = () => {
  return db.selectFrom('option_group').selectAll().orderBy('order').execute();
}

export const getOptionGroupWithTextures = () => {
  return db
    .selectFrom('option_group')
    .innerJoin(
      (qb) =>
        qb
          .selectFrom('option')
          .select('option.optionGroup')
          .innerJoin('texture', 'texture.option', 'option.id')
          .where('texture.source', 'is not', null)
          .groupBy('option.optionGroup')
          .as('opts'),
      'option_group.id',
      'opts.optionGroup'
    )
    .selectAll('option_group')
    .execute();
};