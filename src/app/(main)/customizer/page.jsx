import { getCategoryTree } from '@/lib/db/category';
import { getOptions } from '@/lib/db/option';
import { getOptionGroups } from '@/lib/db/option-group';
import CustomizerForm from './form';

export default async function Customizer() {
  const categories = await getCategoryTree();
  const groups = await getOptionGroups();
  let options = await getOptions();

  options = options.map((o) => ({
    ...o,
    preview: `data:image/png;base64,${o.preview.toString('base64')}`
  }));

  return <CustomizerForm categories={categories} groups={groups} options={options} />
}
