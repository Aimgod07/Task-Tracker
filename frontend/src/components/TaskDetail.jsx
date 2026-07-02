import { 
  X, Pencil, Trash2, Flag, ChevronDown, Check, Plus, FileText 
} from "lucide-react";
import { useState, useEffect } from "react";
import { updateTask, deleteTask } from "../services/taskapi";

export default function TaskDetail({ task, onClose, onTaskUpdated, onTaskDeleted }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (task) {
      setFormData(task);
      setEditing(false);           // Always start in view mode
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    console.log("Updating task with data:", formData);   // ← Debug
    const response = await updateTask(task._id, formData);
    console.log("Update success:", response);            // ← Debug
    
    alert("Task updated successfully!");
    setEditing(false);
    onTaskUpdated?.();
  } catch (err) {
    console.error("Full Update Error:", err.response?.data || err.message);  // ← Better log
    alert(`Failed to update task: ${err.response?.data?.message || err.message}`);
  }
};

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task._id);
        alert("Task deleted successfully!");
        onTaskDeleted?.();
      } catch (err) {
        alert("Failed to delete task");
      }
    }
  };

  if (!task) {
    return <aside className="detail-panel empty">Select a task to view details</aside>;
  }

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <h2>{task.title}</h2>
        <div className="detail-header-actions">
          <Pencil size={15} onClick={() => setEditing(true)} style={{ cursor: 'pointer' }} />
          <X size={16} onClick={onClose} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* ==================== VIEW MODE ==================== */}
      {!editing ? (
        <>
          {/* Your existing beautiful UI goes here */}
          <div className="detail-project-tag">
            <span className="project-dot" style={{ background: task.projectColor || '#3b82f6' }} />
            {task.project || 'General'}
          </div>

          <div className="detail-field-grid">
            <div className="detail-field">
              <span className="detail-field-label">Assignee</span>
              <span className="detail-field-value">{task.assignee?.name || 'Unassigned'}</span>
            </div>
            <div className="detail-field">
              <span className="detail-field-label">Due date</span>
              <span className="detail-field-value">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-field-label">Priority</span>
              <span className="detail-field-value">{task.priority || 'Medium'}</span>
            </div>
            <div className="detail-field">
              <span className="detail-field-label">Status</span>
              <span className="detail-field-value">{task.status || 'To Do'}</span>
            </div>
          </div>

          <div>
            <div className="detail-section-title">Description</div>
            <p className="detail-description">{task.description || 'No description provided.'}</p>
          </div>

          {/* Subtasks, Attachments, etc. - keep your existing code */}

          {/* Action Buttons at Bottom */}
          <div className="detail-actions">
            <button className="edit-btn" onClick={() => setEditing(true)}>
              <Pencil size={16} /> Update Task
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              <Trash2 size={16} /> Delete Task
            </button>
          </div>
        </>
      ) : (
        /* ==================== EDIT MODE ==================== */
        <div className="edit-form">
          <input name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" />
          <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" />
          <input type="date" name="dueDate" value={formData.dueDate?.split('T')[0] || ''} onChange={handleChange} />
          
          <select name="status" value={formData.status || ''} onChange={handleChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>

          <select name="priority" value={formData.priority || ''} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="edit-actions">
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </aside>
  );
}