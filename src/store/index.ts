import { create } from "zustand";

export interface Cart {
  skuId: string;
  productId: string;
  janCode: string | null;
  productCode: string | null;
  productNumber: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  displayOrder: number;
}

export type OrderOptions = {
  orderNumber: string;
  customer: {
    id: string;
    name: string;
  };
  userId: string;
  comment: string;
};

interface State {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  removeCart: (id: string) => void;
  resetCart: () => void;
  orderOptions: OrderOptions;
  setOrderOptions: (orderOptions: OrderOptions) => void;
  resetOrderOptions: () => void;
}

export const useStore = create<State>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  removeCart: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.skuId !== id);
      return {
        cart: newCart,
      };
    }),
  resetCart: () => set({ cart: [] }),
  orderOptions: {
    orderNumber: "",
    customer: {
      id: "",
      name: "",
    },
    userId: "",
    comment: "",
  },
  setOrderOptions: (orderOptions) => set({ orderOptions }),
  resetOrderOptions: () =>
    set({
      orderOptions: {
        orderNumber: "",
        customer: {
          id: "",
          name: "",
        },
        userId: "",
        comment: "",
      },
    }),
}));
