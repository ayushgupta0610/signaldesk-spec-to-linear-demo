import Link from "next/link";
import { notFound } from "next/navigation";
import { inspectEvent } from "@signaldesk/analytics-domain";
import { EventSummary, EventTable } from "@signaldesk/analytics-ui";
import { getTenantDataset } from "@signaldesk/tenant-data";

export default async function TenantPage({ params }: { params: Promise<{ tenantId: string }> }) {
  const { tenantId } = await params;
  const dataset = getTenantDataset(tenantId);
  if (!dataset) notFound();
  const rows = dataset.events.map((event) => ({ event, finding: inspectEvent(event) }));

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">S</div><div><strong>SignalDesk</strong><span>ANALYTICS QA</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="workspace"><span className="workspace-icon">{dataset.tenant.name.charAt(0)}</span><span>{dataset.tenant.name}<small>Demo tenant</small></span></div>
      <nav><span className="nav-item active">◫ <span>Event inspector</span></span><span className="nav-item muted">◷ <span>Session replay</span></span><span className="nav-item muted">◎ <span>Destinations</span></span></nav>
      <div className="sidebar-bottom"><span className="live-dot" /> Fixture data · local demo</div>
    </aside>
    <main className="main">
      <header className="topbar"><span>Overview <b>/</b> Event inspector</span><div className="topbar-right"><span>● System healthy</span><div className="avatar">AG</div></div></header>
      <div className="content">
        <div className="eyebrow">EVENT INTELLIGENCE <span>→</span> LIVE INSPECTOR</div>
        <div className="heading-row"><div><h1>Event inspector</h1><p>See what your site is sending and catch tracking issues early.</p></div><div className="tenant-switch">Tenant <Link href="/t/acme">Acme</Link> <Link href="/t/northstar">Northstar</Link></div></div>
        <EventSummary rows={rows} />
        <section className="panel"><div className="panel-header"><div><h2>Captured events</h2><p>Structural checks on the most recent events for {dataset.tenant.name}.</p></div><span className="count">{rows.length} events</span></div><EventTable rows={rows} /></section>
        <div className="notice"><span>✦</span><div><strong>What’s next?</strong><p>This baseline checks event structure. Campaign attribution quality has not been built yet—that is the feature to scope with Cursor and send to Linear.</p></div></div>
      </div>
    </main>
  </div>;
}
