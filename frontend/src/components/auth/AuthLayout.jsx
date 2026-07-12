import { Link } from 'react-router-dom';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5)',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: 'var(--space-6)',
            justifyContent: 'center',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-primary)',
              display: 'inline-block',
            }}
          />
          <strong style={{ fontSize: 'var(--fs-md)' }}>TaskFlow</strong>
        </Link>

        <div className="card">
          <h2 style={{ marginBottom: 'var(--space-1)' }}>{title}</h2>
          {subtitle && <p style={{ marginBottom: 'var(--space-5)' }}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}