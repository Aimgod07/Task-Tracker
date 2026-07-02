import {
  CheckSquare,
  Plus,
  Home,
  ListChecks,
  Inbox,
  FolderKanban,
  Calendar,
  BarChart2,
  Clock,
  Settings,
} from "lucide-react";
import { projects, currentUser } from "../data/tasks";
import { useState } from "react";
import CreateTask from '../components/Createtask';



const navItems = [
  { icon: Home, label: "Home" },
  { icon: ListChecks, label: "My Tasks", badge: 8, active: true },
  { icon: Inbox, label: "Inbox", badge: 3 },
  { icon: FolderKanban, label: "Projects" },
  { icon: Calendar, label: "Calendar" },
  { icon: BarChart2, label: "Reports" },
  { icon: Clock, label: "Time Tracking" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar({ onTaskCreated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newtask=()=>{

    setIsModalOpen(true)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <CheckSquare size={16} />
        </div>
        <span className="sidebar-logo-text">TaskFlow</span>
      </div>

      <button className="new-task-btn"onClick={newtask}>
        <Plus size={15} />
        New Task
      </button>
      <CreateTask
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onTaskCreated={(newTask) => {setIsModalOpen(false);
                onTaskCreated?.(newTask);
              }}
       />

      <ul className="nav-list">
        {navItems.map(({ icon: Icon, label, badge, active }) => (
          <li key={label} className={`nav-item ${active ? "active" : ""}`}>
            <span className="nav-item-left">
              <Icon size={16} />
              {label}
            </span>
            {badge != null && <span className="nav-badge">{badge}</span>}
          </li>
        ))}
      </ul>

      <div className="sidebar-section-label">PROJECTS</div>
      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.id} className="project-item">
            <span className="project-dot" style={{ background: p.color }} />
            {p.name}
          </li>
        ))}
        <li>
          <span className="view-all-link">View all projects</span>
        </li>
      </ul>

      <div className="sidebar-footer">
        <img src={currentUser.avatar} alt={currentUser.name} />
        <div>
          <div className="sidebar-footer-name">{currentUser.name}</div>
          <div className="sidebar-footer-email">{currentUser.email}</div>
        </div>
      </div>
    </aside>
  );
}
