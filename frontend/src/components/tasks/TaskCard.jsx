import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badges.jsx';
import { formatDate, isOverdue } from '../../utils/taskMeta.js';

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = isOverdue(task.due_date, task.status);

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
        <strong style={{ fontWeight: 500 }}>{task.title}</strong>
        <div style={{ display: 'flex', gap: 'var(--space-1)', flexShrink: 0 }}>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><FiEdit2 size={15} /></button>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} style={{ color: 'var(--color-error)' }}><FiTrash2 size={15} /></button>
        </div>
      </div>
      {task.description && <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>{task.description}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        <CategoryBadge category={task.category} />
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
      </div>
      <span className="text-muted" style={{ fontSize: 'var(--fs-xs)', color: overdue ? 'var(--color-error)' : undefined }}>
        Due {formatDate(task.due_date)}{overdue && ' · overdue'}
      </span>
    </div>
  );
}