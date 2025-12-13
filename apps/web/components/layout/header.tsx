"use client";

import { NavBar } from "@repo/ui/NavBar";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3002";

const navLinks = [
  { label: "Dashboard", href: `${dashboardUrl}` },
  { label: "Operator", href: `${dashboardUrl}/operator` },
  { label: "AVS", href: `${dashboardUrl}/avs` },
  { label: "Strategy", href: `${dashboardUrl}/strategy` },
];


export default function Header() {
  return (
    <NavBar
      logoHref="/"
      navLinks={navLinks}
    />
  );
}
