import { motion } from 'framer-motion';
import { FiCheckSquare, FiPieChart, FiFilter, FiShield } from 'react-icons/fi';

const FEATURES = [
  { icon: FiCheckSquare, title: 'Organize everything', description: 'Create, categorize, and prioritize tasks across work, study, health, and more.' },
  { icon: FiPieChart, title: 'Visual dashboards', description: 'See your workload at a glance with charts that make progress obvious.' },
  { icon: FiFilter, title: 'Powerful filters', description: 'Search, sort, and filter by status, priority, or category in an instant.' },
  { icon: FiShield, title: 'Secure by design', description: 'JWT-based authentication keeps every task private to your account.' },
];

export default function FeaturesSection() {
  return (
    <section className="container" style={{ padding: 'var(--space-7) 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <h2>Everything you need, nothing you don't</h2>
        <p style={{ maxWidth: 480, margin: '0 auto' }}>A focused feature set designed to keep you moving, not managing the app itself.</p>
      </div>

      <div className="features-grid">
        {FEATURES.map(({ icon: Icon, title, description }, i) => (
          <motion.div key={title} className="card card-hover" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}>
            <span aria-hidden="true" style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-tint)', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
              <Icon size={20} />
            </span>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>{title}</h3>
            <p style={{ marginBottom: 0, fontSize: 'var(--fs-sm)' }}>{description}</p>
          </motion.div>
        ))}
      </div>

      <style>{`.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4); }`}</style>
    </section>
  );
}