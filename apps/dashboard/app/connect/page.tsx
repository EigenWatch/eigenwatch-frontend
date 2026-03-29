"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { Wallet } from "lucide-react";
import useAuthStore from "@/hooks/store/useAuthStore";
import { Button } from "@/components/ui/button";

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
        <div className="flex justify-center pt-2">
          <DynamicConnectButton>
            <Button className="w-[160px] bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium h-11 rounded-lg shadow-lg shadow-blue-500/20 border-0 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </Button>
          </DynamicConnectButton>
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
