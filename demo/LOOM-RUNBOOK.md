# 2–3 minute Loom: a feature request in the product repo becomes Linear work

Record from **this SignalDesk product repository**, not the standalone publisher repository. The client should see the running app, real source, a fresh Cursor conversation, and then Linear. The attribution feature must be absent from the code at the start.

## Prepare before recording

1. Clone this repo into a clean folder. Run `npm install`, `npm test`, `npm run typecheck`, `npm run check:boundaries`, and `npm run dev`. Open `http://localhost:3000/t/acme` at a readable zoom.
2. In that same folder run `composio dev init -y --no-browser`. Check `composio dev connected-accounts list --toolkits linear` and set `COMPOSIO_USER_ID` for the connected developer-project user in the recording terminal. Do not show tokens, environment files, or `.composio` contents.
3. Open the folder in Cursor. Open Linear in the browser alongside it, on the team you will use. The public JSON example uses a fictional `Engineering` team; for Ayush's own workspace use `Web3`, or whatever `check-linear` confirms. Use a **fresh** feature ID and project name, e.g. `signaldesk-attribution-qa-v1-<date>` and `SignalDesk Attribution QA V1 <date>`. The duplicate guard intentionally prevents replaying the same feature after publication.
4. Start recording with the running app visible. Optionally pre-open `packages/analytics-domain/src/index.ts` and `apps/console/app/t/[tenantId]/page.tsx`, but let Cursor perform its own inspection in chat.

## Cursor conversation

**Opening prompt (paste into a new Cursor chat):**

> This is our baseline analytics QA product. We want a new campaign attribution quality panel, but do not implement it yet. Inspect the existing tenant route, event domain, data adapter, UI package, `architecture.json`, and boundary check. Tell me what is already supported and what is missing. Ask me at most two decisions that materially affect the first slice. Do not write to Linear yet.

**What a credible response should notice:** `CapturedEvent.pageUrl` already contains UTM query parameters in the fixtures; `inspectEvent` checks URL validity but does not judge attribution quality; `TenantPage` already chooses a tenant before loading its events; UI is presentational. This should lead to domain-analysis, UI, and app-composition work—not an invented database migration. If Cursor misses a point, ask, “Which file supports that conclusion?”

**Your answer after its questions:**

> First slice: only browser `page_view` events whose URL contains at least one `utm_*` parameter count as campaign landing events. A landing event is incomplete if `utm_source` or `utm_medium` is blank or absent. Group findings by URL pathname within the selected tenant, show counts and example event IDs, and make the panel read-only. Ignore server events, events without any UTM parameter, and historical backfill. Keep the existing structural validation separate. Plan the work for team `Web3` under a fresh `SignalDesk Attribution QA V1 <date>` project. Do not publish yet.

If the workspace's actual team or labels differ, replace `Web3` and `Feature` with confirmed names. The new spec belongs under `planning/specs/<fresh-feature-id>.json`; do not overwrite the format example.

**Draft-and-preview prompt:**

> Write the agreed JSON spec with package-specific tickets, acceptance criteria, estimates and dependencies. Keep any unresolved questions explicit. Run the offline preview; show me the exact approval code and what will appear in Linear. Stop before publishing.

Review the preview on camera. If the agent left an open question, answer it and re-preview; publication should fail until it is resolved. The expected plan has roughly three tickets: pure attribution checks in `analytics-domain`, a presentational panel in `analytics-ui`, and tenant-scoped composition in `apps/console`. A separate data-adapter ticket is only justified if the code inspection reveals a real data gap.

**Approval prompt, only after you genuinely review the preview:**

> I approve this exact preview with code `<12-character-code>`. Run the Linear access check, publish it, and give me the project URL and created issue identifiers. Do not implement the feature.

If Cursor asks for tool or network permission, approve only the relevant commands. Cut dead wait time in the edit, but keep the actual publication result visible. Refresh Linear and open a sub-issue to show acceptance criteria, estimate, label and dependency.

## Cut to 2:30–3:00

| Time | Screen | Message |
| --- | --- | --- |
| 0:00–0:18 | Running SignalDesk baseline, then repo tree | “This is a working Next.js monorepo. I’m planning a feature that is not in the code yet.” |
| 0:18–0:50 | Cursor prompt and its file-specific findings | “The agent reads the app and package boundaries before suggesting work.” |
| 0:50–1:15 | Its questions and your decisions | “I decide what counts as an attribution issue and keep the first slice read-only.” |
| 1:15–1:48 | JSON spec and offline preview | “Tickets target real packages, carry acceptance criteria and estimates, and respect dependencies. Nothing is in Linear yet.” |
| 1:48–2:25 | Explicit approval and live publish | “Only the approved plan is sent through the Linear connection.” |
| 2:25–2:55 | Linear project, parent and one child issue | “Here is the result, without hand-entering tickets.” |

End on the Linear project beside the GitHub repo. Say this is an **illustrative subset**, not a claim of access to the client's private monorepo. Their engagement would start by mapping their 5 apps, 35 packages, boundary rules and ticket conventions. Do not claim you have operated this exact workflow for months; demonstrate what works today and be candid about its limits.
