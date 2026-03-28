"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  useDynamicContext,
  useIsLoggedIn,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import useAuthStore from "@/hooks/store/useAuthStore";
import {
  doRefresh,
  logout as apiLogout,
  authenticateWithDynamic,
} from "@/lib/auth-api";
import { setAuthCookie, clearAuthCookie } from "@/actions/utils";
import { AuthModal } from "./AuthModal";
import { BetaPerkModal } from "@/components/beta/BetaPerkModal";
import type { UnseenBetaPerk } from "@/types/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { primaryWallet, sdkHasLoaded, handleLogOut } =
    useDynamicContext();
  const isDynamicLoggedIn = useIsLoggedIn();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, openAuthModal, setRestoring } = useAuthStore();

  const hasAttemptedRefresh = useRef(false);
  const hasAttemptedDynamicAuth = useRef(false);
  const previousAddress = useRef<string | undefined>(undefined);

  // Beta perk modal state
  const [betaPerkQueue, setBetaPerkQueue] = useState<UnseenBetaPerk[]>([]);
  const [showBetaModal, setShowBetaModal] = useState(false);

  // When user data changes, check for unseen beta perks
  useEffect(() => {
    if (user?.unseen_beta_perks && user.unseen_beta_perks.length > 0) {
      setBetaPerkQueue(user.unseen_beta_perks);
      setShowBetaModal(true);
    }
  }, [user?.unseen_beta_perks]);

  const handleBetaPerkDismiss = useCallback(() => {
    setBetaPerkQueue((prev) => {
      const remaining = prev.slice(1);
      if (remaining.length === 0) {
        setShowBetaModal(false);
      }
      return remaining;
    });
  }, []);

  // Handle Dynamic auth success — send token to our backend
  useEffect(() => {
    if (!sdkHasLoaded || !isDynamicLoggedIn || !primaryWallet) {
      return;
    }

    const authToken = getAuthToken();
    if (!authToken) return;

    const walletAddress = primaryWallet.address;

    // Already authenticated with our backend for this wallet
    if (isAuthenticated && previousAddress.current === walletAddress) {
      return;
    }

    // Prevent duplicate auth attempts
    if (hasAttemptedDynamicAuth.current) return;
    hasAttemptedDynamicAuth.current = true;

    (async () => {
      try {
        const data = await authenticateWithDynamic(authToken);

        useAuthStore.getState().setAccessToken(data.tokens.access_token);
        await setAuthCookie(data.tokens.access_token);
        useAuthStore.getState().setUser(data.user);

        previousAddress.current = walletAddress;

        // Check if user needs to add email
        const emails = data.user.emails || [];
        const hasVerifiedEmail = emails.some((e: any) => e.is_verified);
        const hasUnverifiedEmail = emails.some((e: any) => !e.is_verified);

        if (!hasVerifiedEmail && !hasUnverifiedEmail) {
          // No email at all — nudge them to add one (only for wallet-connected users)
          openAuthModal("email");
        } else if (hasUnverifiedEmail && !hasVerifiedEmail) {
          openAuthModal("verify");
        }
      } catch (err: any) {
        console.error("Dynamic auth failed:", err);
        // If email conflict (409), show error but don't block — user can retry with different email
        if (err?.status === 409) {
          // Reset Dynamic auth so they can try again
          hasAttemptedDynamicAuth.current = false;
          await handleLogOut();
          alert(
            err.message ||
              "This email is already linked to another account. Please use a different email or sign in with the wallet associated with that account.",
          );
        }
      } finally {
        setRestoring(false);
      }
    })();
  }, [
    sdkHasLoaded,
    isDynamicLoggedIn,
    primaryWallet,
    isAuthenticated,
    openAuthModal,
    setRestoring,
    handleLogOut,
  ]);

  // Handle wallet disconnection from Dynamic
  useEffect(() => {
    if (!sdkHasLoaded) return;

    if (!isDynamicLoggedIn && previousAddress.current && isAuthenticated) {
      // Dynamic logged out — clear our auth
      apiLogout().then(() => {
        if (pathname !== "/connect") {
          router.replace("/connect");
        }
      });
      previousAddress.current = undefined;
      hasAttemptedDynamicAuth.current = false;
      hasAttemptedRefresh.current = false;
    }
  }, [sdkHasLoaded, isDynamicLoggedIn, isAuthenticated, pathname, router]);

  // Silent refresh on mount (for returning users with valid session)
  useEffect(() => {
    if (!sdkHasLoaded) return;
    if (isAuthenticated || hasAttemptedRefresh.current) return;
    // If Dynamic is logged in, the Dynamic auth effect will handle it
    if (isDynamicLoggedIn) return;

    hasAttemptedRefresh.current = true;

    doRefresh()
      .then(() => {
        // doRefresh already called setAccessToken and setUser
      })
      .catch(() => {
        // No existing session — redirect to connect
        if (pathname !== "/connect") {
          const params = new URLSearchParams();
          params.set("redirect", pathname + window.location.search);
          router.replace(`/connect?${params.toString()}`);
        }
      })
      .finally(() => {
        setRestoring(false);
      });
  }, [
    sdkHasLoaded,
    isDynamicLoggedIn,
    isAuthenticated,
    setRestoring,
    router,
    pathname,
  ]);

  const currentPerk = betaPerkQueue[0] ?? null;

  return (
    <>
      {children}
      <AuthModal />
      <BetaPerkModal
        perk={currentPerk}
        open={showBetaModal && currentPerk !== null}
        onDismiss={handleBetaPerkDismiss}
      />
    </>
  );
}
