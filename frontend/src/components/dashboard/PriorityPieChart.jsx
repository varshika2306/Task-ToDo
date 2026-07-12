import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PRIORITY_COLORS = {
  High: '#bc4749',
  Medium: '#dda15e',
  Low: '#a9b388',
};

export default function PriorityPieChart({ high = 0, medium = 0, low = 0 }) {
  const chartData = [
    { name: 'High', value: high },
    { name: 'Medium', value: medium },
    { name: 'Low', value: low },
  ];

  if (chartData.every((d) => !d.value)) {
    return <EmptyState />;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={PRIORITY_COLORS[entry.name]} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DAD7CD', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif' }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: '0.75rem', fontFamily: 'Poppins, sans-serif' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function EmptyState() {
  return (
    <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>
      No tasks yet — add one to see priority breakdown.
    </div>
  );
}