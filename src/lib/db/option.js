import { sql } from 'kysely';
import { db, manyRelation, oneRelation } from '.';

export const getOptions = () => {
  return db
    .selectFrom('option')
    .selectAll()
    .where('status', '=', 'active')
    .orderBy('order')
    .execute();
};

export const getAuthors = async () => {
  const results = await db
    .selectFrom('option')
    .select(sql`jsonb_array_elements_text(authors)`.as('author'))
    .where('authors', 'is not', null)
    .distinct()
    .orderBy('author')
    .execute();

  return results.map(r => r.author);
};

export const getOptionsByUser = async (user) => {
  return db
    .selectFrom('option')
    .selectAll()
    .where('user', '=', user)
    .orderBy('optionGroup')
    .orderBy('order')
    .execute();
}

export const getOption = async (id, user) => {
  return db
    .selectFrom('option')
    .selectAll()
    .select((eb) => [
      manyRelation(
        eb
          .selectFrom('texture')
          .selectAll()
          .whereRef('texture.option', '=', 'option.id')
      ).as('textures'),
      oneRelation(
        eb
          .selectFrom('category')
          .select(['category.id', 'category.name'])
          .innerJoin('option_group', 'option_group.category', 'category.id')
          .whereRef('option_group.id', '=', 'option.optionGroup')
      ).as('category'),
      oneRelation(
        eb
          .selectFrom('option_group')
          .select(['option_group.id', 'option_group.name'])
          .whereRef('option_group.id', '=', 'option.optionGroup')
      ).as('group')
    ])
    .where('id', '=', id)
    .where('user', '=', user)
    .executeTakeFirst();
}