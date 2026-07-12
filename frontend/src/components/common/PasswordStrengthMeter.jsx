import { getPasswordStrength } from '../../utils/validators.js';

export default function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const { score, label, color } = getPasswordStrength(password);

  return (
    <div style={{ marginTop: '-0.5rem', marginBottom: 'var(--space-4)' }}>
      <div style={{ display: 'flex', gap: '4px' }} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ flex: 1, height: '4px', borderRadius: 'var(--radius-full)', background: i < score ? color : 'var(--color-border)', transition: 'background 200ms ease' }} />
        ))}
      </div>
      <span className="form-hint" style={{ color }} role="status">{label}</span>
    </div>
  );
}