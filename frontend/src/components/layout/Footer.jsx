export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-5) 0' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', display: 'inline-block' }} />
          <strong style={{ fontSize: 'var(--fs-sm)' }}>TaskFlow</strong>
        </span>
        <span className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>© {new Date().getFullYear()} TaskFlow. Built with FastAPI &amp; React.</span>
      </div>
    </footer>
  );
}