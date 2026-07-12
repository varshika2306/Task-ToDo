import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth.js';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out.');
    navigate('/login', { replace: true });
  };

  const initials = (user?.name || '?')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header style={{ height: 'var(--navbar-height)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-5)', position: 'sticky', top: 0, zIndex: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button onClick={onMenuClick} className="btn btn-ghost btn-icon navbar-menu-btn" aria-label="Open menu">
          <FiMenu size={20} />
        </button>
        <div>
          <p style={{ margin: 0, fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>Welcome back</p>
          <strong style={{ fontSize: 'var(--fs-md)' }}>{user?.name || 'there'}</strong>
        </div>
      </div>

      <div ref={menuRef} style={{ position: 'relative' }}>
        <button onClick={() => setMenuOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'transparent', border: 'none', cursor: 'pointer' }} aria-haspopup="true" aria-expanded={menuOpen}>
          <span aria-hidden="true" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary-tint)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 'var(--fs-sm)' }}>
            {initials}
          </span>
          <FiChevronDown size={16} color="var(--color-text-muted)" />
        </button>

        {menuOpen && (
          <div role="menu" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', minWidth: '180px', overflow: 'hidden' }}>
            <button role="menuitem" onClick={() => { setMenuOpen(false); navigate('/profile'); }} className="navbar-menu-item">
              <FiUser size={16} /> Profile
            </button>
            <button role="menuitem" onClick={handleLogout} className="navbar-menu-item danger">
              <FiLogOut size={16} /> Log out
            </button>
          </div>
        )}
      </div>

      <style>{`
        .navbar-menu-btn { display: none; }
        .navbar-menu-item { display: flex; align-items: center; gap: var(--space-2); width: 100%; padding: 0.75rem var(--space-4); font-size: var(--fs-sm); color: var(--color-text); background: none; border: none; text-align: left; cursor: pointer; }
        .navbar-menu-item:hover { background: var(--color-bg); }
        .navbar-menu-item.danger { color: var(--color-error); }

        @media (max-width: 900px) {
          .navbar-menu-btn { display: inline-flex; }
        }
      `}</style>
    </header>
  );
}