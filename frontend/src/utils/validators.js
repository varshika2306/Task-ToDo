export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Enter a valid email address',
};

const STRENGTH_LEVELS = [
  { label: 'Very weak', color: 'var(--color-error)' },
  { label: 'Weak', color: 'var(--color-error)' },
  { label: 'Fair', color: 'var(--color-warning)' },
  { label: 'Good', color: 'var(--color-secondary)' },
  { label: 'Strong', color: 'var(--color-success)' },
  { label: 'Very strong', color: 'var(--color-success)' },
];

export function getPasswordStrength(password = '') {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return { score, ...STRENGTH_LEVELS[score] };
}