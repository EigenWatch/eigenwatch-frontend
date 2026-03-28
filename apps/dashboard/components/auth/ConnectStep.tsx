"use client";

import { Shield } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";

const websiteUrl =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

export function ConnectStep() {
  return (
    <div className="space-y-6">
      <DialogHeader className="items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 mb-2">
          <Shield className="h-6 w-6 text-blue-500" />
        </div>
        <DialogTitle className="text-center">Connect Wallet</DialogTitle>
        <DialogDescription className="text-center">
          Connect your wallet or sign in with email to get started.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center py-4">
        <DynamicWidget />
      </div>

      <p className="text-[10px] text-[#A1A1AA] text-center px-4">
        By connecting a wallet, you agree to EigenWatch&apos;s{" "}
        <Link
          href={`${websiteUrl}/terms`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors"
        >
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
