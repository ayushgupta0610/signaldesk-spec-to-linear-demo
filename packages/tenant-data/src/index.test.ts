import { describe, expect, it } from "vitest";
import { getTenantDataset } from "./index";

describe("tenant data adapter", () => {
  it("returns only the selected tenant's events", () => {
    const acme = getTenantDataset("acme")!;
    expect(acme.events.every((event) => event.id.startsWith("ac-"))).toBe(true);
    expect(acme.events.some((event) => event.id.startsWith("ns-"))).toBe(false);
  });
  it("rejects unknown tenants and returns defensive copies", () => {
    expect(getTenantDataset("unknown")).toBeNull();
    getTenantDataset("acme")!.events.pop();
    expect(getTenantDataset("acme")!.events).toHaveLength(4);
  });
});
