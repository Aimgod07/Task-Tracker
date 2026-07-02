import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import TaskRow from "./TaskRow";
import SortDropdown from "./Sorter";
import { useEffect, useState, useCallback } from "react";
import { getTasks } from "../services/taskapi";

export default function TaskList({ selectedTask, onSelectTask ,refreshTrigger}) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTasks({
        search: searchTerm,
        sort: sortBy,
      });

      console.log("✅ Tasks fetched:", res); // Debug
      setTasks(res.data || res || []);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setError("Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, sortBy]);

  // Initial load
  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]); // Only once on mount

  // Refetch when search or sort changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        fetchTasks();
      },
      searchTerm ? 400 : 0,
    );

    return () => clearTimeout(timeoutId);
  }, [searchTerm, sortBy, fetchTasks]);

  return (
    <div>
      {/* Toolbar */}
      <div className="list-toolbar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="due-asc">Due Date ↑</option>
          <option value="due-desc">Due Date ↓</option>
        </select>
      </div>

      {/* Status */}
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task Count */}
      {!loading && (
        <div className="task-group-title">
          Tasks <span className="count">({tasks.length})</span>
        </div>
      )}

      {/* Task List */}
      <div className="task-group">
        <div className="task-list">
          {tasks.length === 0 && !loading ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${selectedTask?._id === task._id ? "selected" : ""}`}
                onClick={() => onSelectTask(task)}
              >
                <TaskRow
                  key={task._id}
                  task={task}
                  selected={selectedTask?._id === task._id} // ← use 'selected'
                  onSelect={onSelectTask}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
