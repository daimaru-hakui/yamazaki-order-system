"use client";
import OrderCreateCustomer from "./order-create-customer";
import * as actions from "@/actions";
import { useState } from "react";
import OrderCreateProduct from "./order-create-product";
import { useStore } from "@/store";
import OrderCreateCart from "./order-create-cart";
import OrderCreateConfirmButton from "./order-create-confirm-button";

interface OrderCreateProps {
  customers: {
    id: string;
    name: string;
  }[];
}

type Data = ({
  product: {
    id: string;
    productNumber: string;
    productName: string;
    color: {
      name: string;
    };
    skus: {
      id: string;
      productId: string;
      productCode: string | null;
      janCode: string | null;
      price: number;
      size: {
        name: string;
      };
      displayOrder: number;
    }[];
  };
} & {
  id: string;
  customerId: string;
  productId: string;
})[];

export default function OrderCreate({ customers }: OrderCreateProps) {
  const [products, setProducts] = useState<Data>([]);
  const orderOptions = useStore((state) => state.orderOptions);
  const setOrderOptions = useStore((state) => state.setOrderOptions);

  const getProducts = async (customer: { id: string; name: string }) => {
    const data = await actions.getProducts(customer);
    setOrderOptions({
      ...orderOptions,
      customer: { id: customer.id, name: customer.name },
    });
    console.log(customer.id, data);
    setProducts(data);
  };

  return (
    <div className="grid grid-cols-12 mt-6 bg-white rounded-lg shadow-sm">
      <OrderCreateCustomer customers={customers} getProducts={getProducts} />
      <OrderCreateProduct customerProducts={products} />
      <OrderCreateCart />
      <OrderCreateConfirmButton
        customer={{
          id: orderOptions.customer.id,
          name: orderOptions.customer.name,
        }}
      />
    </div>
  );
}
