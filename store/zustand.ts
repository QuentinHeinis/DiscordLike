import { create } from "zustand";
import {Servers} from '@/public/data'

type ServersType = {
  name: string;
  link: string;
  id: number;
  img?: string;
};

type StoreType = {
  getNav: ServersType[];
  setNav: (getNav:[]) => void;
};

export const useStore = create<StoreType>()((set) => ({
  getNav: Servers,
  setNav: (getNav:[]) => set({ getNav }),
}));
