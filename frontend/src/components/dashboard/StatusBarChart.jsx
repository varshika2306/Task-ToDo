import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

export default function StatusBarChart({ pending, inProgress, completed }) {
  const data = [
    { name: 'Pending', value: pending || 0, color: '#dda15e' },
    { name: 'In Progress', value: inProgress || 0, color: '#4f6f52' },
    { name: 'Completed', value: completed || 0, color: '#588157' },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DAD7CD" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Poppins, sans-serif', fill: '#6B7A75' }} axisLine={{ stroke: '#DAD7CD' }} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fontFamily: 'Poppins, sans-serif', fill: '#6B7A75' }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: 'rgba(169, 179, 136, 0.15)' }} contentStyle={{ borderRadius: 12, border: '1px solid #DAD7CD', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif' }} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}