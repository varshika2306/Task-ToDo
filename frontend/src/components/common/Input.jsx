import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, hint, iconLeft, iconRight, id, ...props }, ref) {
  const inputId = id || props.name;
  return (
    <div className="form-group">
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      <div className={iconLeft || iconRight ? 'input-wrapper' : undefined}>
        {iconLeft && <span className="input-icon-left" aria-hidden="true">{iconLeft}</span>}
        <input
          id={inputId}
          ref={ref}
          className={`form-control${error ? ' has-error' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {iconRight}
      </div>
      {error && <span id={`${inputId}-error`} className="form-error" role="alert">{error}</span>}
      {!error && hint && <span id={`${inputId}-hint`} className="form-hint">{hint}</span>}
    </div>
  );
});

export default Input;