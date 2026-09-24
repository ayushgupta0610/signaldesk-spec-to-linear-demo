import type { NextConfig } from "next";

const config: NextConfig = {
  agentRules: false,
  transpilePackages: ["@signaldesk/analytics-domain", "@signaldesk/analytics-ui", "@signaldesk/tenant-data"]
};

export default config;
