import { Link } from 'react-router-dom';

export default function PublicNavbar() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(248, 248, 242, 0.85)', backdropFilter: 'blur(6px)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--navbar-height)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', display: 'inline-block' }} />
          <strong style={{ fontSize: 'var(--fs-md)' }}>TaskFlow</strong>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
        </nav>
      </div>
    </header>
  );
}