import { create } from "zustand";

export interface Cart {
  skuId: string;
  productId: string;
  productNumber: string;
  productName: string;
  quantity: number;
  price: number;
  size: string;
  displayOrder: number;
}

interface State {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  activePage: number;
  setActivePage: (page: number) => void;
}

export const useStore = create<State>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  activePage: 1,
  setActivePage: (page) => set({ activePage: page }),
}));
