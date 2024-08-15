'use client'
import { CaretForwardOutline } from '@raresail/react-ionicons';
import { useFormContext } from 'react-hook-form';

export function CustomizerOption({ option, group }) {
  const { register } = useFormContext();
  return (
    <label key={option.id} className="relative cursor-pointer">
      <input
        type="radio"
        value={option.id}
        className="absolute top-1 left-1 hidden peer"
        {...register(`+options.${group.id}`)}
      />
      <div className="flex gap-2 p-2 rounded items-center text-sm leading-tight group peer-checked:bg-base-200">
        <CaretForwardOutline className="w-5 h-5 invisible peer-checked:group-[]:visible" />
        <img
          src={option.preview}
          alt={option.description}
          className="w-6 h-6 [image-rendering:pixelated]"
        />
        <h5>{option.description}</h5>
        <div className="italic ml-auto mr-0">
          {!!Array.isArray(option.authors) && (
            <>by {option.authors.join(',')}</>
          )}
        </div>
      </div>
    </label>
  );
}