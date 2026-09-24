import type { CapturedEvent, EventFinding } from "@signaldesk/analytics-domain";

export type EventRow = { event: CapturedEvent; finding: EventFinding };

export function EventSummary({ rows }: { rows: EventRow[] }) {
  const valid = rows.filter((row) => row.finding.status === "valid").length;
  return <div className="summary-grid">
    <div className="summary-card"><span>Captured events</span><strong>{rows.length}</strong><small>Across the selected tenant</small></div>
    <div className="summary-card"><span>Schema valid</span><strong>{valid}</strong><small>Identity, time and URL checks</small></div>
    <div className="summary-card"><span>Needs attention</span><strong>{rows.length - valid}</strong><small>Structural validation only</small></div>
  </div>;
}

export function EventTable({ rows }: { rows: EventRow[] }) {
  if (!rows.length) return <p className="empty-state">No captured events for this tenant yet.</p>;
  return <div className="event-table-wrap"><table className="event-table">
    <thead><tr><th>Event</th><th>Source URL</th><th>Captured</th><th>Status</th></tr></thead>
    <tbody>{rows.map(({ event, finding }) => <tr key={event.id}>
      <td><strong>{event.name || "Unnamed event"}</strong><small>{event.id} · {event.source}</small></td>
      <td className="url-cell" title={event.pageUrl}>{event.pageUrl}</td>
      <td>{new Date(event.timestamp).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })} UTC</td>
      <td><span className={`status status-${finding.status}`}>{finding.status === "valid" ? "Valid" : "Review"}</span>{finding.messages.length > 0 && <small>{finding.messages.join("; ")}</small>}</td>
    </tr>)}</tbody>
  </table></div>;
}
