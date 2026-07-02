import { useState } from "react";

const API_BASE_URL = "http://localhost:10000/api";

// const DEFAULT_PROJECTS = [
//   { id: "website-redesign", name: "Website Redesign", color: "#6366F1" },
//   { id: "mobile-app", name: "Mobile App", color: "#14B8A6" },
//   { id: "marketing-campaign", name: "Marketing", color: "#EC4899" },
//   { id: "product-launch", name: "Product Launch", color: "#F59E0B" },
//   { id: "client-portal", name: "Client Portal", color: "#22C55E" },
// ];

const PRIORITIES = [
  { value: "Low", color: "#22C55E" },
  { value: "Medium", color: "#F59E0B" },
  { value: "High", color: "#EF4444" },
];

const STATUSES = ["To Do", "In Progress", "Completed"];

const emptyForm = {
  title: "",
  description: "",
  Priority: "Medium",
  status: "To Do",
  dueDate: "",
  category:"",
};

export default function CreateTask({
  isOpen,
  onClose,
  onTaskCreated,
}) {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const resetAndClose = () => {
    setForm(emptyForm);
    setError(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Give the task a title before saving.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // adjust to however auth is stored

      const response = await fetch(`${API_BASE_URL}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          Priority: form.Priority,
          status: form.status,
          dueDate: form.dueDate || null,
          category:form.category
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || "Couldn't create the task. Try again.");
      }

      const newTask = await response.json();

      onTaskCreated?.(newTask);
      resetAndClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="ct-overlay" onClick={resetAndClose}>
      <div className="ct-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ct-header">
          <div className="ct-header-left">
            <div className="ct-header-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="ct-title">New Task</h2>
              <p className="ct-subtitle">Add a task to your workspace</p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="ct-close-btn"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="ct-form">
          {error && (
            <div className="ct-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                <path d="M12 8v5M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <div className="ct-field">
            <label className="ct-label">
              Title <span className="ct-required">*</span>
            </label>
            <input
              type="text"
              autoFocus
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. Redesign the pricing page"
              className="ct-input ct-input-title"
            />
          </div>

          <div className="ct-field">
            <label className="ct-label">Description</label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={3}
              placeholder="Add any relevant details..."
              className="ct-input ct-textarea"
            />
          </div>

          <div className="ct-row">
            <div className="ct-field">
              <label className="ct-label">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={handleChange("category")}
                className="ct-input"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                className="ct-input"
              />
            </div>
          </div>

          <div className="ct-field">
            <label className="ct-label">Priority</label>
            <div className="ct-pill-group">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, priority: p.value }))}
                  className={`ct-pill ${form.priority === p.value ? "ct-pill-active" : ""}`}
                  style={
                    form.priority === p.value
                      ? { borderColor: p.color, color: p.color, background: `${p.color}14` }
                      : undefined
                  }
                >
                  <span className="ct-pill-dot" style={{ background: p.color }} />
                  {p.value}
                </button>
              ))}
            </div>
          </div>

          <div className="ct-field">
            <label className="ct-label">Status</label>
            <div className="ct-segmented">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                  className={`ct-segment ${form.status === s ? "ct-segment-active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="ct-footer">
            <button type="button" onClick={resetAndClose} className="ct-btn ct-btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="ct-btn ct-btn-primary">
              {isSubmitting ? (
                <>
                  <span className="ct-spinner" />
                  Saving...
                </>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .ct-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(15, 15, 20, 0.5);
          backdrop-filter: blur(4px);
          animation: ct-fade-in 0.15s ease-out;
        }

        .ct-modal {
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.03);
          animation: ct-scale-in 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .ct-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 24px 20px;
          border-bottom: 1px solid #F1F1F4;
        }

        .ct-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ct-header-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366F1, #4F46E5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .ct-title {
          margin: 0;
          font-size: 17px;
          font-weight: 650;
          color: #111827;
          letter-spacing: -0.01em;
        }

        .ct-subtitle {
          margin: 2px 0 0;
          font-size: 13px;
          color: #9CA3AF;
        }

        .ct-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #9CA3AF;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .ct-close-btn:hover {
          background: #F3F4F6;
          color: #4B5563;
        }

        .ct-form {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ct-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          color: #DC2626;
          font-size: 13px;
          font-weight: 500;
        }

        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ct-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }

        .ct-required {
          color: #EF4444;
        }

        .ct-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 13px;
          font-size: 14px;
          font-family: inherit;
          color: #111827;
          background: #F9FAFB;
          border: 1.5px solid #E5E7EB;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }

        .ct-input::placeholder {
          color: #ADB1BB;
        }

        .ct-input:focus {
          border-color: #6366F1;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
        }

        .ct-input-title {
          font-size: 15px;
          font-weight: 500;
        }

        .ct-textarea {
          resize: none;
          line-height: 1.5;
        }

        .ct-select-wrap {
          position: relative;
        }

        .ct-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 34px;
        }

        .ct-select-with-dot {
          padding-left: 30px;
        }

        .ct-select-dot {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
        }

        .ct-pill-group {
          display: flex;
          gap: 8px;
        }

        .ct-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 550;
          font-family: inherit;
          color: #6B7280;
          background: #F9FAFB;
          border: 1.5px solid #E5E7EB;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .ct-pill:hover {
          background: #F3F4F6;
        }

        .ct-pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .ct-segmented {
          display: flex;
          background: #F3F4F6;
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
        }

        .ct-segment {
          flex: 1;
          padding: 7px 8px;
          font-size: 12.5px;
          font-weight: 550;
          font-family: inherit;
          color: #6B7280;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .ct-segment-active {
          background: #ffffff;
          color: #111827;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .ct-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 4px;
        }

        .ct-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: inherit;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          transition: all 0.15s;
        }

        .ct-btn-ghost {
          background: transparent;
          color: #6B7280;
        }
        .ct-btn-ghost:hover {
          background: #F3F4F6;
        }

        .ct-btn-primary {
          background: linear-gradient(135deg, #6366F1, #4F46E5);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .ct-btn-primary:hover:not(:disabled) {
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
          transform: translateY(-1px);
        }
        .ct-btn-primary:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .ct-spinner {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: ct-spin 0.6s linear infinite;
        }

        @keyframes ct-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ct-scale-in {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes ct-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .ct-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}