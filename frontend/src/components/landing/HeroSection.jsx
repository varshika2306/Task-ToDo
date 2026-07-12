import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
};

export default function HeroSection() {
  return (
    <section className="container" style={{ padding: 'var(--space-8) 0 var(--space-7)', textAlign: 'center' }}>
      <motion.span custom={0} initial="hidden" animate="visible" variants={fadeUp} className="badge badge-in-progress" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>
        Built for people who like their to-do list tidy
      </motion.span>

      <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp} style={{ fontSize: 'clamp(2rem, 5vw, var(--fs-3xl))', maxWidth: 720, margin: '0 auto' }}>
        Manage your tasks with clarity, not chaos.
      </motion.h1>

      <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp} style={{ fontSize: 'var(--fs-md)', maxWidth: 560, margin: 'var(--space-4) auto var(--space-6)' }}>
        TaskFlow gives you one calm place to plan, prioritize, and track everything you need to get done — with dashboards that actually make sense at a glance.
      </motion.p>

      <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn btn-primary">Get started free <FiArrowRight /></Link>
        <Link to="/login" className="btn btn-outline">Log in</Link>
      </motion.div>

      <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} style={{ display: 'flex', gap: 'var(--space-5)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--space-6)', color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiCheckCircle color="var(--color-success)" /> No credit card required</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiCheckCircle color="var(--color-success)" /> Free to use</span>
      </motion.div>
    </section>
  );
}