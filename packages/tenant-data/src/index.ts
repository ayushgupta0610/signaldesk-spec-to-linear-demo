import type { CapturedEvent } from "@signaldesk/analytics-domain";

export type Tenant = { id: string; name: string };
export type TenantDataset = { tenant: Tenant; events: CapturedEvent[] };

const fixtures: Record<string, TenantDataset> = {
  acme: {
    tenant: { id: "acme", name: "Acme Commerce" },
    events: [
      { id: "ac-101", name: "page_view", timestamp: "2026-09-24T08:31:00Z", pageUrl: "https://acme.example/collections/fall?utm_source=google&utm_medium=cpc", source: "browser", payload: { path: "/collections/fall", campaign: "fall-launch" } },
      { id: "ac-102", name: "add_to_cart", timestamp: "2026-09-24T08:29:00Z", pageUrl: "https://acme.example/products/linen-shirt", source: "browser", payload: { sku: "LS-4", value: 49 } },
      { id: "ac-103", name: "purchase", timestamp: "2026-09-24T08:15:00Z", pageUrl: "https://acme.example/thank-you", source: "server", payload: { orderId: "A-842", value: 98 } },
      { id: "ac-104", name: "", timestamp: "2026-09-24T07:58:00Z", pageUrl: "https://acme.example/", source: "browser", payload: { path: "/" } }
    ]
  },
  northstar: {
    tenant: { id: "northstar", name: "Northstar Labs" },
    events: [
      { id: "ns-201", name: "page_view", timestamp: "2026-09-24T06:42:00Z", pageUrl: "https://northstar.example/demo?utm_source=newsletter&utm_medium=email", source: "browser", payload: { path: "/demo" } },
      { id: "ns-202", name: "signup_started", timestamp: "2026-09-24T06:40:00Z", pageUrl: "https://northstar.example/signup", source: "browser", payload: { plan: "team" } }
    ]
  }
};

/** The route chooses the tenant; callers cannot query across tenants through an event payload. */
export function getTenantDataset(tenantId: string): TenantDataset | null {
  const dataset = fixtures[tenantId];
  return dataset ? structuredClone(dataset) : null;
}
