import { describe, expect, it } from "vitest";
import { inspectEvent, type CapturedEvent } from "./index";

const event: CapturedEvent = {
  id: "evt-1", name: "page_view", timestamp: "2026-09-24T08:00:00Z",
  pageUrl: "https://acme.example/pricing", source: "browser", payload: { path: "/pricing" }
};

describe("inspectEvent", () => {
  it("accepts a structurally valid event", () => expect(inspectEvent(event).status).toBe("valid"));
  it("reports invalid identity and source URL", () => {
    const result = inspectEvent({ ...event, name: " ", pageUrl: "not-a-url" });
    expect(result.messages).toEqual(["Event name is missing", "Page URL is invalid"]);
  });
  it("does not yet treat missing UTM fields as a schema error", () => {
    expect(inspectEvent(event).status).toBe("valid");
  });
});
