export type EventStatus = "valid" | "invalid";

export type CapturedEvent = {
  id: string;
  name: string;
  timestamp: string;
  pageUrl: string;
  source: "browser" | "server";
  payload: Record<string, unknown>;
};

export type EventFinding = {
  eventId: string;
  status: EventStatus;
  messages: string[];
};

/** Baseline schema checks only. Campaign attribution is intentionally not analyzed yet. */
export function inspectEvent(event: CapturedEvent): EventFinding {
  const messages: string[] = [];
  if (!event.name.trim()) messages.push("Event name is missing");
  if (Number.isNaN(Date.parse(event.timestamp))) messages.push("Timestamp is invalid");
  try {
    const url = new URL(event.pageUrl);
    if (!(["http:", "https:"].includes(url.protocol))) messages.push("Page URL must be HTTP(S)");
  } catch {
    messages.push("Page URL is invalid");
  }
  return { eventId: event.id, status: messages.length ? "invalid" : "valid", messages };
}
