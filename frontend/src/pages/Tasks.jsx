import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useTasks } from '../hooks/useTasks.js';
import { useDebounce } from '../hooks/useDebounce.js';
import { taskService } from '../services/taskService.js';

import TaskFilters from '../components/tasks/TaskFilters.jsx';
import TaskList from '../components/tasks/TaskList.jsx';
import TaskDrawer from '../components/tasks/TaskDrawer.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import Pagination from '../components/common/Pagination.jsx';

const PAGE_SIZE = 10;

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    sort_by: 'due_date',
    order: 'asc',
    page: 1,
  });

  // Auto-open the create drawer when arriving via the dashboard's "Add task" quick
  // action (?new=1). Computed once as the initial value — no effect needed, since
  // this is deriving state from the URL at mount rather than reacting to a change.
  const [drawerState, setDrawerState] = useState(() => ({
    isOpen: searchParams.get('new') === '1',
    task: null,
  }));
  const [confirmState, setConfirmState] = useState({ isOpen: false, task: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const closeDrawer = () => {
    setDrawerState({ isOpen: false, task: null });
    if (searchParams.get('new') === '1') {
      searchParams.delete('new');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const debouncedSearch = useDebounce(filters.search, 400);

  const queryParams = useMemo(
    () => ({
      page: filters.page,
      limit: PAGE_SIZE,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(filters.status && { status: filters.status }),
      ...(filters.priority && { priority: filters.priority }),
      ...(filters.category && { category: filters.category }),
      sort_by: filters.sort_by,
      order: filters.order,
    }),
    [filters.page, filters.status, filters.priority, filters.category, filters.sort_by, filters.order, debouncedSearch]
  );

  const { tasks, meta, isLoading, refetch } = useTasks(queryParams);

  const totalPages = meta?.total ? Math.ceil(meta.total / PAGE_SIZE) : 1;

  const handleDelete = async () => {
    if (!confirmState.task) return;
    setIsDeleting(true);
    try {
      await taskService.deleteTask(confirmState.task.id);
      toast.success('Task deleted.');
      setConfirmState({ isOpen: false, task: null });
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Could not delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Tasks</h1>
        <p>Search, filter, and manage everything on your plate.</p>
      </div>

      <TaskFilters filters={filters} onChange={setFilters} onAddTask={() => setDrawerState({ isOpen: true, task: null })} />

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onEdit={(task) => setDrawerState({ isOpen: true, task })}
        onDelete={(task) => setConfirmState({ isOpen: true, task })}
      />

      <Pagination page={filters.page} totalPages={totalPages} onPageChange={(page) => setFilters((f) => ({ ...f, page }))} />

      <TaskDrawer isOpen={drawerState.isOpen} task={drawerState.task} onClose={closeDrawer} onSaved={refetch} />

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Delete this task?"
        message={`"${confirmState.task?.title}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmState({ isOpen: false, task: null })}
      />
    </div>
  );
}