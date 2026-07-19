const workbenchStages = [
  { id: '01', label: 'Exact context', state: 'BOUNDED' },
  { id: '02', label: 'Guarded change', state: 'CONFIRM' },
  { id: '03', label: 'Validation', state: 'CHECKED' },
  { id: '04', label: 'Git action', state: 'EXPLICIT' },
] as const

export function WorkbenchRunVisual() {
  return (
    <figure className="pm-workbench-visual">
      <figcaption className="sr-only">
        A bounded Workbench run moves from exact local context through a
        confirmed change and targeted validation to an explicit Git action.
      </figcaption>

      <div className="pm-workbench-visual__header">
        <span>RUN-042</span>
        <span>LOCAL PROJECT</span>
      </div>

      <ol>
        {workbenchStages.map((stage, index) => (
          <li key={stage.id}>
            <span className="pm-workbench-stage__number">{stage.id}</span>
            <div>
              <strong>{stage.label}</strong>
              <span>{stage.state}</span>
            </div>
            {index < workbenchStages.length - 1 ? (
              <span className="pm-workbench-stage__connector" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="pm-workbench-visual__scope">
        <span>SCOPE</span>
        <strong>3 files · 1 requested change</strong>
      </div>
    </figure>
  )
}
