"use client";

import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { UserDropdown } from "./UserDropdown";
import useAuthStore from "@/hooks/store/useAuthStore";
import { Button } from "@/components/ui/button";

export function WalletButton() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return (
    <DynamicConnectButton>
      <Button className="w-[160px] bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium h-11 rounded-md transition-all active:scale-[0.98] border-0">
        Connect
      </Button>
    </DynamicConnectButton>
  );
}
