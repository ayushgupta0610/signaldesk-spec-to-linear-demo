# SignalDesk: product-repo planning demo

This is a working baseline product repository, not a prewritten ticket list. It contains a small Next.js analytics QA console in an npm-workspaces monorepo. A product owner can describe a *new* feature in Cursor, have the agent inspect real app/package code and boundaries, settle scope, preview a structured plan, and—only after explicit approval—publish a Linear project with a parent issue, estimated sub-issues, and dependencies.

The repository is a deliberately reduced analogue of a larger enterprise Turborepo: one App Router app and three internal packages. It uses in-memory tenant fixtures, **not** a live Neon database, and does not claim to reproduce a client's private stack. The planning/publishing tool is in `src/`; the product code is in `apps/` and `packages/`.

## Run the baseline

Requires Node 22.18+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/t/acme`. Switch to `/t/northstar` to see different tenant-scoped fixture data. `npm test`, `npm run typecheck`, and `npm run check:boundaries` verify the baseline and planning tool.

## Plan a new feature from Cursor

Open **this repository** in Cursor and start a chat with:

> We need a campaign attribution quality panel for the analytics console. Inspect the existing tenant route, event model, fixture adapter, UI package, and architecture rules. Help me decide exactly which events should be flagged and what the first version should show. Ask me the key scope questions. Do not implement the feature or write to Linear yet.

The `.cursor/rules/spec-to-linear.mdc` rule and `AGENTS.md` describe the workflow. The agent should cite actual files, ask decisions, write a new JSON spec under `planning/specs/`, and run `node --experimental-strip-types src/cli.ts preview planning/specs/<name>.json`. The preview is offline and prints an approval code. Only after a human explicitly approves that exact preview may it publish.

The public `planning/specs/campaign-quality-example.json` is a format reference with unresolved questions, **not** the feature to publish on camera. For a live recording, use a fresh feature ID and project name. See [the Loom runbook](demo/LOOM-RUNBOOK.md).

## Connect Linear for live publication

This publisher uses a connected Composio developer-project user; there is no Linear token in the repo. Run `composio dev init -y --no-browser` here, connect Linear in that developer project, and identify the connected user with `composio dev connected-accounts list --toolkits linear`. Set `COMPOSIO_USER_ID` in your shell. The spec's `teamName` must match a team in your Linear workspace and its labels must exist there.

```bash
COMPOSIO_USER_ID=your-user-id node --experimental-strip-types src/cli.ts check-linear planning/specs/your-feature.json
COMPOSIO_USER_ID=your-user-id node --experimental-strip-types src/cli.ts publish planning/specs/your-feature.json --approve CODE_FROM_PREVIEW
```

The preview validator rejects unresolved questions, unknown package targets, missing acceptance criteria, invalid estimates, and dependency cycles. The approval code binds the reviewed spec and architecture map. Before publishing, the adapter searches for existing issue keys and refuses to blindly duplicate a partial prior run. It creates a Linear project, parent feature, child tickets, labels, estimates, and blocking relationships. It does not write code, merge PRs, or manage production tenant data.

## Repo map

- `apps/console`: tenant route and App Router shell.
- `packages/analytics-domain`: event types and validation rules.
- `packages/tenant-data`: tenant-scoped fixture adapter; swap this boundary for a real DB adapter.
- `packages/analytics-ui`: event table and summary cards.
- `architecture.json`: permitted dependencies and planning constraints.
- `src/`: deterministic spec validator, preview, and Linear publisher.
- `planning/specs/`: example spec shape and drafts created in chat.

The baseline has a clear gap for the Loom feature: it validates event identity and payload shape but has **no attribution-quality analysis**. The agent should discover that distinction rather than being handed tickets upfront.
