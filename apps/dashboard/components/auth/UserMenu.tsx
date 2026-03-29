"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "@/hooks/store/useAuthStore";
import { logoutApi } from "@/lib/auth-api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const { user, tier, accessToken, logout } = useAuthStore();
  const address = primaryWallet?.address;
  const router = useRouter();

  const truncated = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const tierLabel =
    tier === "PRO"
      ? "Pro Plan"
      : tier === "ENTERPRISE"
        ? "Enterprise"
        : "Free Plan";

  const tierColor =
    tier === "PRO" || tier === "ENTERPRISE"
      ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
      : "bg-muted text-muted-foreground border-border";

  async function handleDisconnect() {
    if (accessToken) {
      try {
        await logoutApi(accessToken);
      } catch {
        // Best-effort logout on server
      }
    }
    await handleLogOut();
    logout();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 w-[160px] h-11 rounded-md border border-border bg-card px-3 text-sm text-foreground hover:border-highlight-border transition-colors">
          <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
          <span className="font-mono text-xs truncate flex-1 text-left">
            {truncated}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-border">
        <div className="px-2 py-1.5">
          <Badge className={`text-[10px] ${tierColor}`}>{tierLabel}</Badge>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/settings")}
        >
          <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleDisconnect}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
