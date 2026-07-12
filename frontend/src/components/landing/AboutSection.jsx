import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section style={{ background: 'var(--color-card)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container about-grid" style={{ padding: 'var(--space-7) 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Why TaskFlow</h2>
          <p style={{ marginBottom: 'var(--space-3)' }}>
            Most task apps either do too little or bury you in features you'll never touch. TaskFlow sticks to the essentials — a clear list, honest priorities, and a dashboard that tells you the truth about how you're actually doing.
          </p>
          <p>It's built on a straightforward FastAPI backend with JWT authentication, so your tasks stay private and yours — no accounts to manage beyond your own.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="about-stats">
          <StatBlock value="6" label="Task categories" />
          <StatBlock value="3" label="Priority levels" />
          <StatBlock value="100%" label="Yours — private by default" />
        </motion.div>
      </div>

      <style>{`
        .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
        @media (max-width: 760px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function StatBlock({ value, label }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <strong style={{ fontSize: 'var(--fs-2xl)', color: 'var(--color-primary)' }}>{value}</strong>
      <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--space-1)' }}>{label}</p>
    </div>
  );
}