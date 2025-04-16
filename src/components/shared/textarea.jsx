import { cloneElement, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Textarea = forwardRef(
  (
    {
      label,
      icon: initialIcon,
      containerClassName,
      inputClassName,
      labelClassName,
      className,
      disabled,
      shadow = true,
      error,
      errorClassName,
      ...props
    },
    ref
  ) => {
    const icon = initialIcon
      ? cloneElement(initialIcon, {
          className: twMerge('shrink-0', initialIcon.props?.className)
        })
      : null;
    return (
      <label className={twMerge('form-control w-full', containerClassName)}>
        {!!label && (
          <div className={twMerge('label label-text', labelClassName)}>
            {label}
          </div>
        )}
        <div
          className={twMerge(
            'input input-bordered relative flex items-center pe-0 h-auto overflow-hidden',
            !icon && 'ps-0',
            disabled && 'input-disabled opacity-40',
            error ? 'input-error text-error' : '',
            inputClassName
          )}
        >
          {!!icon && icon}
          <textarea
            {...props}
            ref={ref}
            className={twMerge('grow h-full px-3 py-3', className)}
            disabled={disabled}
          />
        </div>
        {!!error?.message && (
          <div className={twMerge('label pb-0', errorClassName)}>
            <span className="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </label>
    );
  }
);

Textarea.displayName = 'Textarea';
