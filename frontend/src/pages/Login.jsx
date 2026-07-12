// Login.jsx
import AuthLayout from '../components/auth/AuthLayout.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';

export default function Login() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to manage your tasks.">
      <LoginForm />
    </AuthLayout>
  );
}