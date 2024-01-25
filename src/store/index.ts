import { create } from "zustand";

export interface Cart {
  customer: {
    id: number | undefined;
    name: string;
  };
  comment: string;
  items:
    | {
        skuId: number | undefined;
        productNumber: string;
        productName: string;
        quantity: number;
        price: number;
      }[]
    ;
}

interface State {
  cart: Cart;
  setCart: (cart: Cart) => void;
  activePage: number;
  setActivePage: (page: number) => void;
}

export const useStore = create<State>((set) => ({
  cart: {
    customer: {
      id: undefined,
      name: "",
    },
    comment: "",
    items: [],
  },
  setCart: (cart) => set({ cart }),
  activePage: 1,
  setActivePage: (page) => set({ activePage: page }),
}));
