import { create } from "zustand";

type Gym = {
  id: string;
  name: string;
  email: string;
};

type AuthStore = {
  gym: Gym | null;
  isAuthenticated: boolean;
  login: (gym: Gym) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  gym: null,
  isAuthenticated: false,
  login: (gym) => set({ gym, isAuthenticated: true }),
  logout: () => set({ gym: null, isAuthenticated: false }),
}));
