import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';

import AuthLayout from '../components/auth/AuthLayout.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

export default function ForgotPassword() {
  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <Input label="Email" type="email" placeholder="you@example.com" iconLeft={<FiMail />} disabled />
        <Button type="submit" variant="primary" block disabled>
          Send reset link
        </Button>
      </form>
      <p className="text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--fs-sm)' }}>
        This flow isn&apos;t wired to the backend yet.{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Back to login</Link>
      </p>
    </AuthLayout>
  );
}