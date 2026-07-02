import { Search, Bell, Settings as SettingsIcon } from "lucide-react";
import SearchBar from './Searchbar';

export default function TopBar() {
  return (
    <div className="topbar">
      <h1>My Tasks</h1>
      <div className="topbar-actions">
        <button className="icon-btn">
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
        <button className="icon-btn">
          <SettingsIcon size={16} />
        </button>
      </div>
    </div>
  );
}
