import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badges.jsx';
import { formatDate, isOverdue } from '../../utils/taskMeta.js';

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <div className="card task-table-wrap" style={{ padding: 0, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
            <Th>Title</Th><Th>Category</Th><Th>Priority</Th><Th>Status</Th><Th>Due date</Th><Th align="right">Actions</Th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const overdue = isOverdue(task.due_date, task.status);
            return (
              <tr key={task.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <Td>
                  <strong style={{ fontWeight: 500 }}>{task.title}</strong>
                  {task.description && (
                    <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', margin: 0, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {task.description}
                    </p>
                  )}
                </Td>
                <Td><CategoryBadge category={task.category} /></Td>
                <Td><PriorityBadge priority={task.priority} /></Td>
                <Td><StatusBadge status={task.status} /></Td>
                <Td>
                  <span style={{ color: overdue ? 'var(--color-error)' : 'inherit' }}>
                    {formatDate(task.due_date)}{overdue && ' (overdue)'}
                  </span>
                </Td>
                <Td align="right">
                  <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><FiEdit2 size={15} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} style={{ color: 'var(--color-error)' }}><FiTrash2 size={15} /></button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, align = 'left' }) {
  return <th style={{ padding: 'var(--space-4)', fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)', fontWeight: 500, textAlign: align, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{children}</th>;
}

function Td({ children, align = 'left' }) {
  return <td style={{ padding: 'var(--space-4)', fontSize: 'var(--fs-sm)', textAlign: align, verticalAlign: 'top' }}>{children}</td>;
}