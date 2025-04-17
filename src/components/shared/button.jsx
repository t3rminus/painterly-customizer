import { twMerge } from 'tailwind-merge';
import { Children, isValidElement, cloneElement } from 'react';

export function Button({ className = '', asChild, ...props }) {
  const RenderedComponent = asChild ? Slot : 'button';

  // Prevent submitting forms by default
  if (!asChild && !props.type) {
    props.type = 'button';
  }

  return (
    <RenderedComponent
      className={twMerge(
        'btn btn-primary',
        className
      )}
      {...props}
    />
  );
}

function Slot({ children, ...props }) {
  if (Children.count(children) > 1) {
    throw new Error('Only one child allowed');
  }
  if (isValidElement(children)) {
    return cloneElement(children, {
      ...props,
      ...children.props,
      className: twMerge(props.className, children.props.className)
    });
  }
  return null;
}
