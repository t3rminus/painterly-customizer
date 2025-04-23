import { getAuthors } from '@/lib/db/option';
import { SubmitForm } from './form';
import { getCategoryTree } from '@/lib/db/category';
import { getOptionGroups } from '@/lib/db/option-group';

export default async function Submit() {
  const authors = await getAuthors();
  const categories = await getCategoryTree();
  const groups = await getOptionGroups();

  console.log(categories);

  return <SubmitForm authors={authors} categories={categories} groups={groups} />;
}