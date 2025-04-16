import { cloneElement, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = forwardRef(
  (
    {
      render,
      label,
      icon: initialIcon,
      iconAfter,
      containerClassName,
      inputClassName,
      labelClassName,
      className,
      disabled,
      error,
      errorClassName,
      instruction,
      instructionClassName,
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
            'input input-bordered relative flex items-center px-0 overflow-hidden',
            disabled && 'input-disabled opacity-40',
            error ? 'input-error text-error' : '',
            inputClassName
          )}
        >
          {!!icon && <div className="absolute ps-4">{icon}</div>}
          {!render && (
            <input
              {...props}
              ref={ref}
              className={twMerge(
                'grow h-full px-4',
                !!icon && 'ps-12',
                className
              )}
              disabled={disabled}
            />
          )}
          {!!render &&
            render({
              className: twMerge(
                'grow min-h-full px-4',
                !!icon && 'ps-12',
                className
              ),
              disabled,
              ...props
            })}
          {!!iconAfter && (
            <div className="absolute end-0 pe-4">{iconAfter}</div>
          )}
        </div>
        {!!error?.message && (
          <div className={twMerge('label pb-0', errorClassName)}>
            <span className="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
        {!error?.message && !!instruction && (
          <div className={twMerge('label pb-0', instructionClassName)}>
            {typeof instruction === 'string'
              ? (<span className="label-text-alt opacity-60">{instruction}</span>)
              : (instruction)}
          </div>
        )}
      </label>
    );
  }
);

Input.displayName = 'Input';
