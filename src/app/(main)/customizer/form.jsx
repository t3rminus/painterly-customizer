'use client';
import { CustomizerGroup } from '@/components/customizer/group';
import { CustomizerOption } from '@/components/customizer/option';
import { useForm, FormProvider } from 'react-hook-form';

const RenderLevel = ({ ...props }) => {
  const { categories, groups, options } = props;
  return categories.map((category) => (
    <div key={category.name}>
      {!category.children?.length && (
        <CustomizerGroup name={category.name}>
          <ul>
            {groups
              ?.filter((g) => g.category === category.id)
              .map((g) => (
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
              ))}
          </ul>
        </CustomizerGroup>
      )}
      {!!category.children?.length && (
        <>
          <h3 className="font-bold text-lg mb-2">{category.name}</h3>
          <RenderLevel {...props} categories={category.children} />
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