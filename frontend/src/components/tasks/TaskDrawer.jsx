import { useState } from 'react';
import toast from 'react-hot-toast';

import Drawer from '../common/Drawer.jsx';
import TaskForm from './TaskForm.jsx';
import { taskService } from '../../services/taskService.js';

export default function TaskDrawer({ isOpen, task, onClose, onSaved }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(task?.id);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await taskService.updateTask(task.id, values);
        toast.success('Task updated.');
      } else {
        await taskService.createTask(values);
        toast.success('Task created.');
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Could not save task. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit task' : 'New task'}>
      <TaskForm defaultValues={task} onSubmit={handleSubmit} onCancel={onClose} isSubmitting={isSubmitting} />
    </Drawer>
  );
}