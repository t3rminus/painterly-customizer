import { cloneElement, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(
  (
    {
      render,
      label,
      icon: initialIcon,
      containerClassName = '',
      inputClassName = '',
      labelClassName = '',
      className = '',
      disabled,
      shadow = true,
      error,
      errorClassName = '',
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
            'input relative flex items-center pr-0',
            !icon && 'pl-0',
            disabled && 'input-disabled opacity-40',
            error ? 'input-error text-error' : '',
            inputClassName
          )}
        >
          {!!icon && icon}
          {!render && (
            <input
              {...props}
              ref={ref}
              className={twMerge('grow h-full px-3', className)}
              disabled={disabled}
            />
          )}
          {!!render &&
            render({
              className: twMerge('grow min-h-full px-3', className),
              disabled,
              ...props
            })}
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

Input.displayName = 'Input';
