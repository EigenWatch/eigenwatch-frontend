"use client";

import * as React from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { UserDropdown } from "./UserDropdown";
import useAuthStore from "@/hooks/store/useAuthStore";

export function WalletButton() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <UserDropdown />;
  }

  return <DynamicWidget />;
}
