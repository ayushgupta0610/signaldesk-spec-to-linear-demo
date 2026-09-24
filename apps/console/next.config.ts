import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: ["@signaldesk/analytics-domain", "@signaldesk/analytics-ui", "@signaldesk/tenant-data"]
};

export default config;
