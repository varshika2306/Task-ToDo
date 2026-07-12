import { forwardRef } from 'react';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size, block, isLoading, disabled, children, className = '', ...props },
  ref
) {
  const classes = [
    'btn',
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? <span className="spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
});

export default Button;