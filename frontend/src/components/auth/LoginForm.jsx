import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { emailPattern } from '../../utils/validators.js';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ mode: 'onBlur' });

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success('Welcome back!');
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Email" type="email" placeholder="you@example.com" iconLeft={<FiMail />}
        error={errors.email?.message}
        {...register('email', { required: 'Email is required', pattern: emailPattern })} />

      <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" iconLeft={<FiLock />}
        iconRight={
          <button type="button" className="input-icon-right" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        }
        error={errors.password?.message}
        {...register('password', { required: 'Password is required' })} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-5)' }}>
        <Link to="/forgot-password" className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Forgot password?</Link>
      </div>

      <Button type="submit" variant="primary" block isLoading={isSubmitting}>Log in</Button>

      <p className="text-muted" style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--fs-sm)' }}>
        Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>Sign up</Link>
      </p>
    </form>
  );
}