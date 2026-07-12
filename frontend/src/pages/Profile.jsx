import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLogOut } from 'react-icons/fi';

import { useProfile } from '../hooks/useProfile.js';
import { useAuth } from '../hooks/useAuth.js';
import ProfileForm from '../components/auth/ProfileForm.jsx';
import Button from '../components/common/Button.jsx';

export default function Profile() {
  const { user, isLoading, error } = useProfile();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out.');
    navigate('/login', { replace: true });
  };

  const initials = (user?.name || '?').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Profile</h1>
        <p>Manage your account details.</p>
      </div>

      {isLoading && <ProfileSkeleton />}

      {!isLoading && error && (
        <div className="card">
          <p className="text-muted">Couldn&apos;t load your profile. Please try refreshing the page.</p>
        </div>
      )}

      {!isLoading && !error && user && (
        <>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <span aria-hidden="true" style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-primary-tint)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 'var(--fs-lg)', flexShrink: 0 }}>
              {initials}
            </span>
            <div>
              <strong style={{ fontSize: 'var(--fs-md)' }}>{user.name}</strong>
              <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>{user.email}</p>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Edit profile</h3>
            <ProfileForm user={user} />
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ fontSize: 'var(--fs-sm)' }}>Log out</strong>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>You'll need to log back in to access your tasks.</p>
            </div>
            <Button variant="danger" onClick={handleLogout}>
              <FiLogOut size={16} /> Log out
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div className="skeleton" style={{ height: 84 }} />
      <div className="skeleton" style={{ height: 200 }} />
    </div>
  );
}