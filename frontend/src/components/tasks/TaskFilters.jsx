import { FiSearch, FiPlus } from 'react-icons/fi';

import Button from '../common/Button.jsx';
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../utils/taskMeta.js';

export default function TaskFilters({ filters, onChange, onAddTask }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value, page: 1 });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
      <div className="input-wrapper" style={{ flex: '1 1 220px', minWidth: 200 }}>
        <span className="input-icon-left" aria-hidden="true"><FiSearch /></span>
        <input type="search" className="form-control" placeholder="Search tasks…" value={filters.search} onChange={update('search')} aria-label="Search tasks" />
      </div>

      <select className="form-control" style={{ width: 'auto' }} value={filters.status} onChange={update('status')} aria-label="Filter by status">
        <option value="">All statuses</option>
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select className="form-control" style={{ width: 'auto' }} value={filters.priority} onChange={update('priority')} aria-label="Filter by priority">
        <option value="">All priorities</option>
        {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>

      <select className="form-control" style={{ width: 'auto' }} value={filters.category} onChange={update('category')} aria-label="Filter by category">
        <option value="">All categories</option>
        {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className="form-control" style={{ width: 'auto' }} value={`${filters.sort_by}:${filters.order}`}
        onChange={(e) => { const [sort_by, order] = e.target.value.split(':'); onChange({ ...filters, sort_by, order, page: 1 }); }}
        aria-label="Sort tasks">
        <option value="due_date:asc">Due date ↑</option>
        <option value="due_date:desc">Due date ↓</option>
        <option value="priority:desc">Priority (high first)</option>
        <option value="created_at:desc">Newest first</option>
      </select>

      <Button variant="primary" onClick={onAddTask} style={{ marginLeft: 'auto' }}>
        <FiPlus /> Add task
      </Button>
    </div>
  );
}