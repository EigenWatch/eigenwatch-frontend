import { create } from "zustand";
import { User, AuthTier } from "@/types/auth.types";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isRestoring: boolean;
  tier: AuthTier;

  // Actions
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setAuthenticating: (val: boolean) => void;
  setRestoring: (val: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isRestoring: true,
  tier: "FREE",

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      tier: user?.tier || "FREE",
    }),

  setAccessToken: (accessToken) => set({ accessToken }),

  setAuthenticating: (isAuthenticating) => set({ isAuthenticating }),

  setRestoring: (isRestoring) => set({ isRestoring }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isAuthenticating: false,
      tier: "FREE",
    }),
}));

export default useAuthStore;
