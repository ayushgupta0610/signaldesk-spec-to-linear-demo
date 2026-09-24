import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import type { Architecture, FeatureSpec } from "../src/model.ts";
import { approvalHash, marker, validateAndOrder } from "../src/plan.ts";

const architecture = JSON.parse(readFileSync("architecture.json", "utf8")) as Architecture;
const fixture: FeatureSpec = {
  featureId: "fixture-feature",
  projectName: "Fixture Feature",
  teamName: "Fixture Team",
  summary: "Test the plan validator against the product package graph.",
  decisions: ["This is a test fixture."],
  openQuestions: [],
  tickets: [
    { key: "event-model", title: "Model the finding", package: "packages/analytics-domain", goal: "Represent findings in the domain.", acceptance: ["Domain tests pass."], estimate: 3, labels: ["Feature"], dependsOn: [] },
    { key: "event-list", title: "Render the finding", package: "packages/analytics-ui", goal: "Show findings without data access.", acceptance: ["UI renders a finding."], estimate: 5, labels: ["Feature"], dependsOn: ["event-model"] },
    { key: "tenant-route", title: "Compose tenant route", package: "apps/console", goal: "Use scoped data in the route.", acceptance: ["Only the selected tenant is read."], estimate: 5, labels: ["Feature"], dependsOn: ["event-model", "event-list"] }
  ]
};
const copy = (): FeatureSpec => structuredClone(fixture);

test("orders tickets after their dependencies", () => {
  const spec = copy();
  spec.tickets.reverse();
  assert.deepEqual(validateAndOrder(spec, architecture).map((item) => item.key), ["event-model", "event-list", "tenant-route"]);
});

test("rejects open decisions and dependency cycles", () => {
  const open = copy();
  open.openQuestions.push("Where are events stored?");
  assert.throws(() => validateAndOrder(open, architecture), /Resolve open questions/);
  const cyclic = copy();
  cyclic.tickets[0]!.dependsOn.push("tenant-route");
  assert.throws(() => validateAndOrder(cyclic, architecture), /Dependency cycle/);
});

test("rejects unknown package targets and weak tickets", () => {
  const badPackage = copy();
  badPackage.tickets[0]!.package = "packages/unknown";
  assert.throws(() => validateAndOrder(badPackage, architecture), /Unknown package/);
  const noAcceptance = copy();
  noAcceptance.tickets[0]!.acceptance = [];
  assert.throws(() => validateAndOrder(noAcceptance, architecture), /acceptance criteria/);
});

test("approval code changes with the reviewed spec", () => {
  const edited = copy();
  edited.tickets[0]!.goal += " Updated.";
  assert.notEqual(approvalHash(fixture, architecture), approvalHash(edited, architecture));
  assert.equal(marker("feature", "task"), "spec-to-linear:feature:task");
});
