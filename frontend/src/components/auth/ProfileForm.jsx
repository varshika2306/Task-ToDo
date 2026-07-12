import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail } from 'react-icons/fi';

import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { userService } from '../../services/userService.js';
import { emailPattern } from '../../utils/validators.js';

export default function ProfileForm({ user }) {
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    mode: 'onBlur',
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });

  const onSubmit = async (values) => {
    try {
      const updated = await userService.updateMe(values);
      setUser(updated);
      toast.success('Profile updated.');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Could not update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Name" iconLeft={<FiUser />} error={errors.name?.message}
        {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name is too short' } })} />

      <Input label="Email" type="email" iconLeft={<FiMail />} error={errors.email?.message}
        {...register('email', { required: 'Email is required', pattern: emailPattern })} />

      <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={!isDirty}>
        Save changes
      </Button>
    </form>
  );
}