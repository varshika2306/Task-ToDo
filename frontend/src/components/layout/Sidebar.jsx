import { NavLink } from 'react-router-dom';
import { FiGrid, FiCheckSquare, FiUser, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/tasks', label: 'Tasks', icon: FiCheckSquare },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{ position: 'fixed', inset: 0, background: 'rgba(47, 62, 70, 0.35)', zIndex: 30 }}
          className="sidebar-backdrop"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-5) var(--space-5) var(--space-6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span aria-hidden="true" style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary)', display: 'inline-block' }} />
            <strong style={{ fontSize: 'var(--fs-md)' }}>TaskFlow</strong>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon sidebar-close" aria-label="Close menu">
            <FiX />
          </button>
        </div>

        <nav style={{ padding: '0 var(--space-3)' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink to={to} onClick={onClose} className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link-active' : ''}`}>
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style>{`
        .sidebar { width: var(--sidebar-width); background: var(--color-card); border-right: 1px solid var(--color-border); flex-shrink: 0; }
        .sidebar-close { display: none; }
        .sidebar-link { display: flex; align-items: center; gap: var(--space-3); padding: 0.7rem var(--space-4); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--fs-sm); font-weight: var(--fw-medium); transition: background var(--transition-fast), color var(--transition-fast); }
        .sidebar-link:hover { background: var(--color-bg); color: var(--color-text); }
        .sidebar-link-active { background: var(--color-primary-tint); color: var(--color-primary-dark); }
        .sidebar-backdrop { display: none; }

        @media (max-width: 900px) {
          .sidebar { position: fixed; top: 0; left: 0; bottom: 0; z-index: 40; transform: translateX(-100%); transition: transform var(--transition-base); }
          .sidebar-open { transform: translateX(0); }
          .sidebar-close { display: inline-flex; }
          .sidebar-backdrop { display: block; }
        }
      `}</style>
    </>
  );
}