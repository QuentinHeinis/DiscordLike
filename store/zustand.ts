import { create } from "zustand";

type modalType = 'addServer' | 'searchServer' | 'addChannel' | 'updateChannel' | 'none';

type StoreType = {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  modalOpen: modalType;
  setModalOpen: (modalOpen: modalType) => void;
  currentUpdateId: string;
  setCurrentUpdateId: (currentUpdateId: string) => void;
};

export const useStore = create<StoreType>()((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),
  modalOpen: 'none',
  setModalOpen: (modalOpen: modalType) => set({ modalOpen }),
  currentUpdateId: '',
  setCurrentUpdateId: (currentUpdateId: string) => set({ currentUpdateId }),
}));
