export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <div role="tablist" aria-label="Product categories" className="tabs">
      {tabs.map((t) => {
        const isActive = t.id === activeId
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}