'use client';
import { useId, useState, cloneElement, useRef, useImperativeHandle } from 'react';
import ReactSelect, { components } from 'react-select';
import ReactSelectAsync from 'react-select/async';
import ReactSelectCreatable from 'react-select/creatable';
import ReactSelectAsyncCreatable from 'react-select/async-creatable';
import { CheckmarkOutline, CloseOutline } from '@raresail/react-ionicons';
import { twMerge } from 'tailwind-merge';

const Control = ({ children, ...props }) => {
  const initialIcon = props.selectProps?.icon;
  const icon = initialIcon
    ? cloneElement(initialIcon, {
        className: twMerge('shrink-0', initialIcon.props?.className)
      })
    : null;

  return (
    <components.Control {...props}>
      <div className="w-full flex items-center">
        {icon}
        {children}
      </div>
    </components.Control>
  );
};

const MultiValueLabel = ({ children, ...props }) => {
  return (
    <components.MultiValueLabel {...props}>
      {props?.data?.multiLabel || children}
    </components.MultiValueLabel>
  );
};

const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseOutline className="icon-sm" />
    </components.MultiValueRemove>
  );
};

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseOutline className="w-5 h-5 mr-2 opacity-80" />
    </components.ClearIndicator>
  );
};

const Option = ({ isSelected, isMulti, children, ...props}) => {
    return (
      <components.Option {...props} isSelected={isSelected} isMulti={isMulti}>
        {isSelected && !isMulti && (
          <CheckmarkOutline className="inline-block align-middle w-5 h-5 mr-1" />
        )}
        {!isSelected && !isMulti && (
          <div className="inline-block align-middle w-5 h-5 mr-1" />
        )}
        {children}
      </components.Option>
    );
}

const Input = ({ ariaActivedescendant, ...props }) => {
  return (
    <components.Input
      {...props}
      aria-activedescendant={ariaActivedescendant || ''}
    />
  );
}

export function Select({
  id: propId,
  component,
  label,
  containerClassName,
  labelClassName,
  inputClassName,
  className,
  onChange,
  isMulti,
  menuIsOpen,
  value: propValue,
  error,
  errorClassName,
  defaultValue,
  menuPortalTarget,
  noOptionsMessage,
  loadingMessage,
  placeholder,
  instruction,
  instructionClassName,
  disabled,
  name,
  ref: propRef,
  ...props
}) {
  const SelectComponent = component || ReactSelect;
  const ref = useRef();
  const [selectedValue, setSelectedValue] = useState(propValue || defaultValue);
  const actualValue = propValue || selectedValue;
  const id = useId();
  const doOnChange = (selectedVal) => {
    setSelectedValue(selectedVal);
    if (onChange) {
      // Fake event-shaped object, to play nice with other libraries
      onChange({ type: 'change', target: { value: selectedVal, name }});
    }
  };

  let portalTarget;
  try {
    portalTarget = menuPortalTarget || (typeof document !== 'undefined' && document?.body);
  } catch (err) {
    /* ignore */
  }

  useImperativeHandle(
    propRef,
    () => {
      if (!ref.current) {
        return null;
      }
      return new Proxy(ref.current, {
        set(obj, prop, value) {
          if (prop === 'value') {
            setSelectedValue(value);
          }
          obj[prop] = value;
          return true;
        },
        get(obj, prop) {
          if (prop === 'value') {
            return actualValue;
          } else {
            return obj[prop];
          }
        }
      });
    },
    [actualValue]
  );

  return (
    <label
      className={twMerge(
        'form-control w-full',
        disabled && 'opacity-60',
        containerClassName
      )}
      htmlFor={propId || id}
    >
      {!!label && (
        <div className={twMerge('label', labelClassName)}>
          <span className="label-text">{label}</span>
        </div>
      )}
      <SelectComponent
        {...props}
        unstyled
        ref={ref}
        instanceId={id}
        inputId={propId || id}
        isDisabled={disabled}
        value={actualValue}
        onChange={doOnChange}
        isMulti={isMulti}
        menuIsOpen={menuIsOpen}
        noOptionsMessage={() => noOptionsMessage || 'No Options'}
        loadingMessage={() => loadingMessage || 'Loading…'}
        placeholder={placeholder || 'Select…'}
        menuPortalTarget={portalTarget}
        components={{
          DropdownIndicator: null,
          Control,
          MultiValueLabel,
          MultiValueRemove,
          ClearIndicator,
          Option,
          Input
        }}
        className={className}
        classNames={{
          control: ({ isFocused, isMulti }) =>
            twMerge(
              menuIsOpen === false ? 'input' : 'select',
              'px-4 py-2 box-border !outline-2 outline-offset-2 !outline-transparent',
              inputClassName,
              isFocused && '!outline-current',
              isMulti && '!min-h-12',
              !!disabled && 'disabled select-none',
              !!error && 'select-error text-error'
            ),
          menuList: () => 'text-sm bg-base-100 mt-2 p-2 shadow-sm rounded-md',
          option: ({ isFocused }) =>
            twMerge(
              'p-2 hover:bg-primary/5 rounded-field',
              isFocused && 'bg-primary/5'
            ),
          noOptionsMessage: () =>
            'px-4 py-2 text-sm text-[color:var(--placeholder)]',
          valueContainer: ({ hasValue, isMulti }) =>
            twMerge('gap-1', hasValue && isMulti && '-ml-2'),
          multiValueLabel: () =>
            'bg-primary text-primary-content ps-3 pe-2 pt-1 pb-1 rounded-tl-field rounded-bl-field',
          multiValueRemove: () =>
            'bg-primary text-primary-content px-1.5 py-1 rounded-tr-field rounded-br-field hover:bg-primary/60',
          placeholder: () => 'text-current/50',
          groupHeading: () => 'px-4 py-2 text-base-content/40'
        }}
      />
      {!!error?.message && (
        <div className={twMerge('label pb-0', errorClassName)}>
          <span className="label-text-alt text-error">{error?.message}</span>
        </div>
      )}
      {!!instruction && (
        <div className={twMerge('label pb-0', instructionClassName)}>
          {typeof instruction === 'string' ? (
            <span className="label-text-alt opacity-60">{instruction}</span>
          ) : (
            instruction
          )}
        </div>
      )}
    </label>
  );
}

export function SelectAsync({
  debouncedLoad = 300,
  loadOptions: baseLoadOptions,
  searchParams,
  component,
  ...props
}) {
  const debounceRef = useRef();
  const loadOptions = (txt, cb) => {
    if (!(typeof loadOptions === 'function')) {
      return cb(null);
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      const result = await loadOptions({ search: txt, ...searchParams });
      cb(Array.isArray(result) ? result : []);
    }, debouncedLoad);
  };

  return (
    <Select
      component={component || ReactSelectAsync}
      loadOptions={loadOptions}
      {...props}
    />
  );
};

export function SelectCreatable(props) {
  return <Select component={ReactSelectCreatable} {...props} />;
}

export function SelectAsyncCreatable(props) {
  return <SelectAsync component={ReactSelectAsyncCreatable} {...props} />;
}