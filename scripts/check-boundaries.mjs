import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const roots = ["apps/console", "packages/analytics-domain", "packages/tenant-data", "packages/analytics-ui"];
const allowed = new Map([
  ["apps/console", new Set(["@signaldesk/analytics-domain", "@signaldesk/tenant-data", "@signaldesk/analytics-ui"])],
  ["packages/analytics-domain", new Set()],
  ["packages/tenant-data", new Set(["@signaldesk/analytics-domain"])],
  ["packages/analytics-ui", new Set(["@signaldesk/analytics-domain"])]
]);
const errors = [];
function walk(dir, visit) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, visit);
    else if (/\.tsx?$/.test(entry.name)) visit(path);
  }
}
for (const root of roots) walk(join(root, existsSync(join(root, "src")) ? "src" : "app"), (path) => {
  const code = readFileSync(path, "utf8");
  for (const match of code.matchAll(/(?:from\s*|import\s*\(|require\s*\()\s*["']([^"']+)["']/g)) {
    const dependency = match[1];
    if (dependency.startsWith("@signaldesk/") && !allowed.get(root).has(dependency)) errors.push(`${relative(".", path)} cannot import ${dependency}`);
    if (root === "packages/analytics-domain" && /^(react|next|node:fs|node:child_process|@signaldesk\/)/.test(dependency)) errors.push(`${relative(".", path)} violates the pure domain boundary: ${dependency}`);
    if (root === "packages/analytics-ui" && dependency === "@signaldesk/tenant-data") errors.push(`${relative(".", path)} cannot read tenant data directly`);
  }
});
if (errors.length) { process.stderr.write(`${errors.join("\n")}\n`); process.exitCode = 1; }
else process.stdout.write("Package import boundaries passed\n");
