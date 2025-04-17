'use client';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ImageOutline } from '@raresail/react-ionicons';

export function ImageBase64({
  label,
  className,
  containerClassName,
  labelClassName,
  defaultValue,
  value,
  onChange,
  signUpload,
  deleteFile,
  placeholder = 'Select an image…',
  icon,
  accept = 'image/png,image/jpeg,image/webp,image/gif',
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(value || defaultValue || '');

  const upload = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', accept);
    fileInput.addEventListener('change', ({ target }) => {
      const file = target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setCurrentValue(reader.result);
        };
        reader.onerror = (err) => {
          alert('An error ocurred opening your file.');
          console.error(err);
        };
        fileInput.remove();
      }
    });
    fileInput.click();
  }, [accept]);

  return (
    <>
      <input value={currentValue} {...props} readOnly type="hidden" />
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
        <div className="relative">
          <div
            role="button"
            aria-label="Select an image"
            onClick={(e) => {
              e.preventDefault();
              upload();
            }}
            tabIndex={0}
            onKeyUp={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                upload();
              }
            }}
            className={twMerge(
              'w-full h-auto aspect-square flex flex-col justify-center items-center bg-transparent p-2 cursor-pointer input input-beautifi bg-base100 shadow-beautifi'
            )}
          >
            {!currentValue && !value && (
              <>
                {!icon && icon !== null && (
                  <ImageOutline className="w-12 h-12 text-base-content/50" strokeWidth="0.75rem" />
                )}
                {icon}
                {!!placeholder && <span>{placeholder}</span>}
              </>
            )}
            {currentValue && (
              <img
                src={currentValue}
                alt="Image Preview"
                className="block w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </label>
    </>
  );
}
