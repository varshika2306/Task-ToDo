import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import PasswordStrengthMeter from '../common/PasswordStrengthMeter.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { emailPattern } from '../../utils/validators.js';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur', defaultValues: { password: '' } });

  const password = useWatch({ control, name: 'password' });

  const onSubmit = async ({ name, email, password: pwd }) => {
    try {
      await registerUser(name, email, pwd);
      toast.success('Account created — please log in.');
      navigate('/login', { replace: true });
    } catch (err) {
      const message = err.response?.data?.detail || 'Could not create account. Try again.';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Name"
        type="text"
        placeholder="Your full name"
        iconLeft={<FiUser />}
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name is too short' },
        })}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        iconLeft={<FiMail />}
        error={errors.email?.message}
        {...register('email', { required: 'Email is required', pattern: emailPattern })}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create a password"
        iconLeft={<FiLock />}
        iconRight={
          <button
            type="button"
            className="input-icon-right"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        }
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Use at least 8 characters' },
        })}
      />
      <PasswordStrengthMeter password={password} />

      <Input
        label="Confirm password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Re-enter your password"
        iconLeft={<FiLock />}
        iconRight={
          <button
            type="button"
            className="input-icon-right"
            onClick={() => setShowConfirm((s) => !s)}
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        }
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) => value === password || 'Passwords do not match',
        })}
      />

      <Button
        type="submit"
        variant="primary"
        block
        isLoading={isSubmitting}
        style={{ marginTop: 'var(--space-2)' }}
      >
        Create account
      </Button>

      <p
        className="text-muted"
        style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--fs-sm)' }}
      >
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>
          Log in
        </Link>
      </p>
    </form>
  );
}