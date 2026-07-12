import { FiCheckSquare, FiClock, FiLoader, FiAlertTriangle } from 'react-icons/fi';

import { useDashboard } from '../hooks/useDashboard.js';
import { useTasks } from '../hooks/useTasks.js';

import StatCard from '../components/dashboard/StatCard.jsx';
import PriorityPieChart from '../components/dashboard/PriorityPieChart.jsx';
import StatusBarChart from '../components/dashboard/StatusBarChart.jsx';
import CompletionProgressRing from '../components/dashboard/CompletionProgressRing.jsx';
import RecentTasks from '../components/dashboard/RecentTasks.jsx';
import QuickActions from '../components/dashboard/QuickActions.jsx';

export default function Dashboard() {
  const { data, isLoading: statsLoading } = useDashboard();
  const { tasks, isLoading: tasksLoading } = useTasks({ limit: 5, sort_by: 'due_date', order: 'asc' });

  const stats = data || {};

  // Backend doesn't return completion_rate — derive it from total_tasks/completed.
  const completionRate =
  stats.completion_rate ??
  (stats.total_tasks
    ? Math.round((stats.completed_tasks / stats.total_tasks) * 100)
    : 0);

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Dashboard</h1>
        <p>Here's how your tasks are shaping up.</p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <StatCard label="Total tasks" value={statsLoading ? '—' : stats.total_tasks ?? 0} icon={FiCheckSquare} accent="primary" />
        <StatCard
  label="Pending"
  value={statsLoading ? "—" : stats.pending_tasks ?? 0}
  icon={FiClock}
  accent="warning"
/>

<StatCard
  label="In progress"
  value={statsLoading ? "—" : stats.in_progress_tasks ?? 0}
  icon={FiLoader}
  accent="secondary"
/>

<StatCard
  label="Overdue"
  value={statsLoading ? "—" : stats.overdue_tasks ?? 0}
  icon={FiAlertTriangle}
  accent="error"
/>
      </div>

      {/* Charts row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Priority distribution</h3>
          <PriorityPieChart
  high={stats.high_priority_tasks}
  medium={stats.medium_priority_tasks}
  low={stats.low_priority_tasks}
/>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Task status</h3>
          <StatusBarChart
  pending={stats.pending_tasks}
  inProgress={stats.in_progress_tasks}
  completed={stats.completed_tasks}
/>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Completion rate</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <CompletionProgressRing percentage={completionRate} />
          </div>
        </div>
      </div>

      {/* Recent tasks + quick actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 'var(--space-4)',
        }}
      >
        <RecentTasks tasks={tasks} isLoading={tasksLoading} />
        <QuickActions />
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}