import TaskTable from './TaskTable.jsx';
import TaskCard from './TaskCard.jsx';

export default function TaskList({ tasks, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: 64 }} />)}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
        <p style={{ marginBottom: 0 }}>No tasks match your filters yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="task-list-desktop">
        <TaskTable tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="task-list-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />)}
      </div>
      <style>{`
        .task-list-mobile { display: none; }
        @media (max-width: 760px) {
          .task-list-desktop { display: none; }
          .task-list-mobile { display: flex; }
        }
      `}</style>
    </>
  );
}