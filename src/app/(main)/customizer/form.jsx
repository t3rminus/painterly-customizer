'use client';
import { CollapsingCategory } from '@/components/customizer/collapsing-category';
import { CustomizerOption } from '@/components/customizer/option';
import { useForm, FormProvider } from 'react-hook-form';

const RenderGroups = ({ categoryId, groups: allGroups, options: allOptions }) => {
  const groups = allGroups?.filter((g) => g.category === categoryId) || [];
  if (!groups?.length) {
    return null;
  }
  return (<ul>
    {groups.map((g) => {
      const options = allOptions?.filter((o) => o.optionGroup === g.id) || [];
      if (!options?.length) {
        return null;
      }
      return (
        <li key={g.id} className="mb-4">
          <h4 className="font-bold mb-1">{g.name}</h4>
          <div className="grid gap-1 grid-cols-1">
            {options
              .filter((o) => o.optionGroup === g.id)
              .map((o) => (
                <CustomizerOption key={o.id} option={o} group={g} />
              ))}
          </div>
        </li>
      );
    })}
  </ul>)
}

const RenderLevel = ({ categories, groups, options, depth = 0, ...props }) => {
  return categories.map((category) => (
    <div key={category.name}>
      {!category.children?.length && depth > 0 && (
        <CollapsingCategory name={category.name}>
          <RenderGroups
            categoryId={category.id}
            groups={groups}
            options={options}
          />
        </CollapsingCategory>
      )}
      {!category.children?.length && depth === 0 && (
        <RenderGroups
          categoryId={category.id}
          groups={groups}
          options={options}
        />
      )}
      {!!category.children?.length && (
        <>
          <h3 className="font-bold text-lg mb-2">{category.name}</h3>
          <RenderLevel
            {...props}
            options={options}
            groups={groups}
            categories={category.children}
            depth={depth + 1}
          />
        </>
      )}
    </div>
  ));
}

export default function CustomizerForm({ ...props }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form method="post" action="/customizer/generate">
        <RenderLevel {...props} />
        <button type="submit" className="btn">
          Create My Pack!
        </button>
      </form>
    </FormProvider>
  );
}