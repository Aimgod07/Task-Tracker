import { Check, Calendar } from "lucide-react";

const statusClassMap = {
  "To Do": "todo",
  "In Progress": "in-progress",
  Review: "review",
  Done: "done",
};

export default function TaskRow({ task, selected, onSelect }) {
  return (
    <div
      className={`task-row ${selected ? "selected" : ""}`}
      onClick={() => onSelect(task)}
    >
      <span className={`checkbox ${task.done ? "checked" : ""}`}>
        {task.done && <Check size={12} strokeWidth={3} />}
      </span>

      <div className="task-main">
        <div className={`task-title ${task.done ? "done" : ""}`}>
          {task.title}
        </div>
        <div className="task-project">
          <span
            className="project-dot"
            style={{ background: task.projectColor }}
          />
          {task.project}
        </div>
      </div>

      <img className="task-avatar" src={task.assignee} alt="" />

      <div className="task-due">
        <Calendar size={13} />
        {task.due}
      </div>

      <span className={`status-pill ${statusClassMap[task.status]}`}>
        {task.status}
      </span>
    </div>
  );
}
