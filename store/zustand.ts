import { Channel, ChannelType, Server, User } from "@prisma/client";
import { create } from "zustand";

type modalType = 'deleteMessage'|'addServer' | 'addChannel' | 'leaveServer' | 'updateMember' | 'updateChannel' | 'updateServer' | 'updateProfile' | 'none';

type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  userId?:string,
  user?:User
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
