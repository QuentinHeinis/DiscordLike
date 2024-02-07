import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

type modalType = 'deleteMessage'|'addServer' | 'searchServer' | 'addChannel' | 'updateChannel' | 'none';

type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  userId?:string
}

type StoreType = {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  data: ModalData;
  modalOpen: modalType;
  setModalOpen: (modalOpen: modalType, data?:ModalData) => void;
  currentUpdateId: string;
  setCurrentUpdateId: (currentUpdateId: string) => void;
};

export const useStore = create<StoreType>()((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen: boolean) => set({ menuOpen }),
  data: {},
  modalOpen: 'none',
  setModalOpen: (modalOpen: modalType, data = {}) => set({ modalOpen, data}),
  currentUpdateId: '',
  setCurrentUpdateId: (currentUpdateId: string) => set({ currentUpdateId }),
}));
