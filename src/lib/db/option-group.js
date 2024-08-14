import { db } from '.';

export const getOptionGroups = () => {
  return db
    .selectFrom('option-group')
    .selectAll()
    .execute();
}