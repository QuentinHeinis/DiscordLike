import { create } from "zustand";
import {Servers} from '@/public/data'

export const useStore = create()((set) => ({
  getNav: Servers,
  setNav: (getNav:[]) => set({ getNav }),
  getActivServ: '',
  setActivServ: (getActivNav:string) => set({ getActivNav }),
}));
