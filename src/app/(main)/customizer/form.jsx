'use client';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

const RenderLevel = ({ ...props }) => {
  const { register } = useFormContext();
  const { categories, groups, options } = props;
  return categories.map((category) => (
    <div key={category.name} className="ml-2">
      <h3 className="text-lg">{category.name}</h3>
      <ul className="ml-2">
        {groups
          ?.filter((g) => g.category === category.id)
          .map((g) => (
            <li key={g.id}>
              <h4>{g.name}</h4>
              <div className="flex gap-4 p-2">
                {options.map((o) => (
                  <label key={o.id} className="relative">
                    <input
                      type="radio"
                      value={o.id}
                      className="absolute top-1 left-1 hidden peer"
                      {...register(`+options.${g.id}`)}
                    />
                    <img
                      src={o.preview}
                      alt={o.description}
                      className="w-12 h-12 rendering-pixelated peer-checked:outline outline-orange-500"
                    />
                  </label>
                ))}
              </div>
            </li>
          ))}
      </ul>
      {!!category.children?.length && <RenderLevel {...props} categories={category.children} />}
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
          Pack Me!
        </button>
      </form>
    </FormProvider>
  );
}