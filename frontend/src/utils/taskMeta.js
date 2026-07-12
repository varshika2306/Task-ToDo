export const STATUS_META = {
  Pending: { badgeClass: 'badge-pending', dotColor: 'var(--color-warning)' },
  'In Progress': { badgeClass: 'badge-in-progress', dotColor: 'var(--color-primary)' },
  Completed: { badgeClass: 'badge-completed', dotColor: 'var(--color-success)' },
};

export const PRIORITY_META = {
  High: { badgeClass: 'badge-high' },
  Medium: { badgeClass: 'badge-medium' },
  Low: { badgeClass: 'badge-low' },
};

export const CATEGORY_OPTIONS = ['Work', 'Study', 'Personal', 'Health', 'Finance', 'Others'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];
export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

export function statusMeta(status) {
  return STATUS_META[status] || { badgeClass: 'badge-category', dotColor: 'var(--color-text-muted)' };
}

export function priorityMeta(priority) {
  return PRIORITY_META[priority] || { badgeClass: 'badge-category' };
}

export function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isOverdue(dueDate, status) {
  if (!dueDate || status === 'Completed') return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}