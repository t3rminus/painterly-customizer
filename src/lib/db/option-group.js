import { db } from '.';

export const getOptionGroups = () => {
  return db
    .selectFrom('option-group')
    .selectAll()
    .orderBy('order')
    .execute();
}