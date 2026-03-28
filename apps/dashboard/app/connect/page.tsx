"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Wallet } from "lucide-react";
import useAuthStore from "@/hooks/store/useAuthStore";

export const dynamic = "force-dynamic";

function ConnectPageContent() {
  const { isAuthenticated, isRestoring } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sanitize redirect URL to prevent loops
  let targetRedirect = searchParams.get("redirect") || "/operator";
  if (targetRedirect.startsWith("/connect")) {
    targetRedirect = "/operator";
  }

  // Redirect to the target page once fully authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(targetRedirect);
    }
  }, [isAuthenticated, targetRedirect, router]);

  if (isRestoring) {
    return (
      <div className="h-full min-h-[60vh] flex items-center justify-center py-[45px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="h-full min-h-[60vh] flex items-center justify-center py-[45px]">
      <div className="max-w-md w-full rounded-lg border border-border bg-card p-8 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Wallet className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Connect Your Wallet
        </h2>
        <p className="text-sm text-muted-foreground">
          Connect your wallet or sign in with email to access the EigenWatch
          dashboard.
        </p>
        <div className="flex justify-center">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
}

export default function ConnectPage() {
  return (
    <Suspense
      fallback={
        <div className="h-full min-h-[60vh] flex items-center justify-center py-[45px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <ConnectPageContent />
    </Suspense>
  );
}
