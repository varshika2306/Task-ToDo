import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button.jsx';

export default function ConfirmDialog({ isOpen, title = 'Are you sure?', message, confirmLabel = 'Delete', isLoading, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            onClick={onCancel} aria-hidden="true"
            style={{ position: 'fixed', inset: 0, background: 'rgba(47, 62, 70, 0.4)', zIndex: 60 }}
          />
          <motion.div
            role="alertdialog" aria-modal="true" aria-label={title}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.16 }}
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 61, width: 'min(380px, 90vw)', background: 'var(--color-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--space-5)' }}
          >
            <h3 style={{ marginBottom: 'var(--space-2)' }}>{title}</h3>
            <p style={{ marginBottom: 'var(--space-5)' }}>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
              <Button variant="ghost" onClick={onCancel} disabled={isLoading}>Cancel</Button>
              <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>{confirmLabel}</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}