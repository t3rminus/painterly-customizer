'use client';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';

export function FileButton({
  label,
  containerClassName,
  labelClassName,
  onChange,
  fileTypes = 'image/png,image/jpeg,image/webp,image/gif',
  ...props
}) {
  const upload = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', fileTypes);
    fileInput.addEventListener('change', ({ target }) => {
      const file = target?.files?.[0];
      if (onChange) {
        onChange(file);
      }
      fileInput.remove();
    });
    fileInput.click();
  }, [fileTypes, onChange]);

  return (
    <>
      <label
        className={twMerge(
          'form-control block w-full relative',
          containerClassName
        )}
      >
        {!!label && (
          <div className={twMerge('label', labelClassName)}>
            <span className="label-text">{label}</span>
          </div>
        )}
        <Button
          {...props}
          onClick={(e) => {
            e.preventDefault();
            upload();
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              upload();
            }
          }}
        />
      </label>
    </>
  );
}
