import { getAuthors } from '@/lib/db/option';
import { getOption } from './actions';
import { getCategoryTree } from '@/lib/db/category';
import { getOptionGroupWithTextures } from '@/lib/db/optionGroup';
import { getUser } from '@/lib/auth';
import { TextureForm } from '@/components/submit/texture-form';
import { notFound } from 'next/navigation';

export default async function EditSubmission({ params: paramsPromise }) {
  const { id } = await paramsPromise;
  const authors = await getAuthors();
  const categories = await getCategoryTree();
  const groups = await getOptionGroupWithTextures();
  const user = await getUser();
  let option;
  if (/^[0-9]+$/.test(id)) {
    option = await getOption(id, user.id);
    if (!option) {
      return notFound();
    }
  } else if (id !== 'new') {
    return notFound();
  }

  return (
    <>
      <h3 className="font-bold pb-4">Submit a Texture</h3>
      <TextureForm
        option={option}
        authors={authors}
        categories={categories}
        groups={groups}
      />
    </>
  );
}