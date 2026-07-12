import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import { StatusBadge, PriorityBadge } from '../common/Badges.jsx';
import { formatDate } from '../../utils/taskMeta.js';

export default function RecentTasks({ tasks, isLoading }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <h3>Recent tasks</h3>
        <Link to="/tasks" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--fs-sm)', color: 'var(--color-primary)', fontWeight: 500 }}>
          View all <FiArrowRight size={14} />
        </Link>
      </div>

      {isLoading && <ListSkeleton />}

      {!isLoading && tasks.length === 0 && (
        <p className="text-muted" style={{ fontSize: 'var(--fs-sm)' }}>No tasks yet. Create your first one to see it here.</p>
      )}

      {!isLoading && tasks.length > 0 && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 500, color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</p>
                <span className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Due {formatDate(task.due_date)}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton" style={{ height: 44 }} />
      ))}
    </div>
  );
}