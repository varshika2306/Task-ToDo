import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section style={{ padding: 'var(--space-7) 0' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-7) var(--space-6)', textAlign: 'center', color: 'var(--color-accent)' }}>
          <h2 style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>Ready to get organized?</h2>
          <p style={{ color: 'rgba(254, 250, 224, 0.85)', maxWidth: 480, margin: '0 auto var(--space-5)' }}>
            Create your account in under a minute and start turning your to-do list into done.
          </p>
          <Link to="/register" className="btn" style={{ background: 'var(--color-accent)', color: 'var(--color-primary-dark)' }}>
            Create your account <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}