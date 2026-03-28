"use client";

import useAuthStore from "@/hooks/store/useAuthStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EmailStep } from "./EmailStep";
import { VerifyStep } from "./VerifyStep";

export function AuthModal() {
  const { showAuthModal, closeAuthModal, authStep } = useAuthStore();

  // Modal is always dismissible for email/verify steps
  const canDismiss = true;

  return (
    <Dialog
      open={showAuthModal}
      onOpenChange={(open) => {
        if (!open && canDismiss) {
          closeAuthModal();
        }
      }}
    >
      <DialogContent
        showCloseButton={canDismiss}
        className="bg-card border-border sm:max-w-md"
        onInteractOutside={(e) => {
          if (!canDismiss) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!canDismiss) e.preventDefault();
        }}
      >
        {authStep === "email" && <EmailStep />}
        {authStep === "verify" && <VerifyStep />}
      </DialogContent>
    </Dialog>
  );
}
