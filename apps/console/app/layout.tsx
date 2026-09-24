import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "SignalDesk · Analytics QA", description: "Tenant-scoped analytics event inspection" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
