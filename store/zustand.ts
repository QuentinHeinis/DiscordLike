import { create } from "zustand";

type StoreType = {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
};

export const useStore = create<StoreType>()((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),
}));
