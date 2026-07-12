import { forwardRef } from 'react';

const Select = forwardRef(function Select({ label, error, hint, options = [], placeholder, id, ...props }, ref) {
  const selectId = id || props.name;
  return (
    <div className="form-group">
      {label && <label htmlFor={selectId} className="form-label">{label}</label>}
      <select id={selectId} ref={ref} className={`form-control${error ? ' has-error' : ''}`} aria-invalid={Boolean(error)} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      {error && <span className="form-error" role="alert">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
});

export default Select;