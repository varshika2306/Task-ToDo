import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function CompletionProgressRing({ percentage = 0 }) {
  const value = Math.max(0, Math.min(100, Math.round(percentage)));
  const data = [{ name: 'completion', value }];

  return (
    <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
      <RadialBarChart width={180} height={180} cx="50%" cy="50%" innerRadius="72%" outerRadius="100%" barSize={14} data={data} startAngle={90} endAngle={-270}>
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background={{ fill: 'var(--color-border)' }} dataKey="value" cornerRadius={20} fill="#4f6f52" />
      </RadialBarChart>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <strong style={{ fontSize: 'var(--fs-2xl)' }}>{value}%</strong>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-muted)' }}>Completed</span>
      </div>
    </div>
  );
}