# Agent instructions for SignalDesk

This repository has a real baseline product in `apps/console` and `packages/*`. For a new feature request, inspect `architecture.json`, relevant package manifests and source files, and `scripts/check-boundaries.mjs`. Cite the files that drive the design. Distinguish existing behavior from proposed behavior.

Co-author scope with the user. Ask at most two high-impact questions at a time, including tenant and edge-case behavior where relevant. Save the resulting feature spec in `planning/specs/<feature-id>.json`, matching the example shape. Keep unresolved choices in `openQuestions`; do not silently decide them. Make tickets small, package-specific, estimated, and ordered by dependencies. Run the offline preview and show the approval code.

Never publish to Linear before the user explicitly approves the exact preview/code. Once approved, run `check-linear` and then `publish` with that code. Report the project URL and issue IDs. Do not implement the feature unless separately requested. Do not put credentials or `.composio` contents in commits or recordings.
