import { create } from "zustand";

export interface Cart {
  skuId: string;
  productId: string;
  janCode:string | null;
  productCode:string | null;
  productNumber: string;
  productName: string;
  color:string;
  size: string;
  price: number;
  quantity: number;
  displayOrder: number;
}

export type OrderOption = {
  orderNumber: string;
  customerId: string;
  userId: string;
  comment: string;
};

interface State {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  orderOption: OrderOption;
  setOrderOption: (orderOption: OrderOption) => void;
}

export const useStore = create<State>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  orderOption: {
    orderNumber: "",
    customerId: "",
    userId: "",
    comment: ""
  },
  setOrderOption: (orderOption) => set({ orderOption })
}));
