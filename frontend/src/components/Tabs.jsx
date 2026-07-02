const tabs = [
  { label: "All", count: 24 },
  { label: "To Do", count: 8 },
  { label: "In Progress", count: 6 },
  { label: "Review", count: 4 },
  { label: "Done", count: 6 },
];

export default function Tabs({ active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`tab ${active === tab.label ? "active" : ""}`}
          onClick={() => onChange(tab.label)}
        >
          {tab.label}
          <span className="count">{tab.count}</span>
        </button>
      ))}
    </div>
  );
}
