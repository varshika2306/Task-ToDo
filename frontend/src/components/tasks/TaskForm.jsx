import { useForm } from 'react-hook-form';

import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import Button from '../common/Button.jsx';
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../utils/taskMeta.js';

function toDateInputValue(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export default function TaskForm({ defaultValues, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      category: defaultValues?.category || '',
      priority: defaultValues?.priority || '',
      status: defaultValues?.status || 'Pending',
      due_date: toDateInputValue(defaultValues?.due_date),
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input label="Title" placeholder="e.g. Finish backend API docs" error={errors.title?.message}
        {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Title is too short' } })} />

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" rows={4} className={`form-control${errors.description ? ' has-error' : ''}`} placeholder="Add any extra detail…" {...register('description')} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <Select label="Category" placeholder="Select category" options={CATEGORY_OPTIONS} error={errors.category?.message} {...register('category', { required: 'Required' })} />
        <Select label="Priority" placeholder="Select priority" options={PRIORITY_OPTIONS} error={errors.priority?.message} {...register('priority', { required: 'Required' })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <Select label="Status" options={STATUS_OPTIONS} {...register('status', { required: 'Required' })} />
        <Input label="Due date" type="date" error={errors.due_date?.message} {...register('due_date')} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {defaultValues?.id ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
}