export default function StatCard({ label, value, icon: Icon, accent = 'primary' }) {
  const accentVars = {
    primary: { bg: 'var(--color-primary-tint)', color: 'var(--color-primary-dark)' },
    success: { bg: 'var(--color-success-tint)', color: 'var(--color-success)' },
    warning: { bg: 'var(--color-warning-tint)', color: 'var(--color-warning)' },
    error: { bg: 'var(--color-error-tint)', color: 'var(--color-error)' },
    secondary: { bg: 'var(--color-secondary-tint)', color: 'var(--color-primary-dark)' },
  };
  const { bg, color } = accentVars[accent] || accentVars.primary;

  return (
    <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <span aria-hidden="true" style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 'var(--radius-md)', background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {Icon && <Icon size={20} />}
      </span>
      <div>
        <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>{label}</p>
        <strong style={{ fontSize: 'var(--fs-xl)' }}>{value}</strong>
      </div>
    </div>
  );
}