import { getAuthors } from '@/lib/db/option';
import { SubmitForm } from './form';
import { getCategoryTree } from '@/lib/db/category';
import { getOptionGroupWithTextures } from '@/lib/db/optionGroup';

export default async function Submit() {
  const authors = await getAuthors();
  const categories = await getCategoryTree();
  const groups = await getOptionGroupWithTextures();

  return <SubmitForm authors={authors} categories={categories} groups={groups} />;
}