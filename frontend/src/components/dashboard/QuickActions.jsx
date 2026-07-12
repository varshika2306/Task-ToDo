import { useNavigate } from 'react-router-dom';
import { FiPlus, FiList, FiUser } from 'react-icons/fi';

const ACTIONS = [
  { label: 'Add task', icon: FiPlus, to: '/tasks?new=1' },
  { label: 'View all tasks', icon: FiList, to: '/tasks' },
  { label: 'Edit profile', icon: FiUser, to: '/profile' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick actions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {ACTIONS.map(({ label, icon: Icon, to }) => (
          <button key={label} onClick={() => navigate(to)} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}