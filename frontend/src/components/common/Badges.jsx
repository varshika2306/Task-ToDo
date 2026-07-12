import { statusMeta, priorityMeta } from '../../utils/taskMeta.js';

export function StatusBadge({ status }) {
  const { badgeClass } = statusMeta(status);
  return <span className={`badge ${badgeClass}`}>{status}</span>;
}

export function PriorityBadge({ priority }) {
  const { badgeClass } = priorityMeta(priority);
  return <span className={`badge ${badgeClass}`}>{priority}</span>;
}

export function CategoryBadge({ category }) {
  return <span className="badge badge-category">{category}</span>;
}