import { db } from '.';

export const getTexturesForOptions = (options) => {
  return db.selectFrom('texture')
    .selectAll()
    .where('option', 'in', options)
    .execute();
};
