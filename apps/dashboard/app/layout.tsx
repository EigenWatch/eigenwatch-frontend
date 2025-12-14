import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./Provider";
import { NavBar } from "@repo/ui/NavBar";

const navLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Operator", href: "/operator" },
  { label: "AVS", href: "/avs" },
  { label: "Strategy", href: "/strategy" },
];

export const metadata: Metadata = {
  title: "EigenWatch",
  description: "Risk Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`antialiased bg-background text-foreground`}>
        <AppProvider>
          <div className="flex flex-col w-full h-screen">
            <NavBar
              logoHref={process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000"}
              navLinks={navLinks}
            />
            <div className=" w-full flex h-full overflow-y-auto pt-[65px]">
              <div className="max-w-[1440px] w-full mx-auto flex flex-col h-full px-[108px]">
                {children}
              </div>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
