import { useState, useEffect } from 'react';
import { getTaskById, updateTask, deleteTask } from '../services/taskapi';

export default function Task({ task, onTaskUpdated, onTaskDeleted }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(task || {});

  useEffect(() => {
    setFormData(task || {});
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task._id, formData);
      alert('Task updated successfully!');
      setEditing(false);
      onTaskUpdated?.();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(task._id);
        alert('Task deleted!');
        onTaskDeleted?.();
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  if (!task) return <p>Select a task to view details</p>;

  return (
    <div className="task-detail">
      <h2>Task Details</h2>

      {editing ? (
        <div>
          <input
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate?.split('T')[0] || ''}
            onChange={handleChange}
          />
          <select name="status" value={formData.status || ''} onChange={handleChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {task.status}</p>

          <button onClick={() => setEditing(true)}>Edit Task</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
}