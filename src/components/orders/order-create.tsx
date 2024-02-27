"use client";
import { Customer, CustomerProduct } from "@prisma/client";
import OrderCreateCustomer from "./order-create-customer";
import * as actions from "@/actions";
import { useState } from "react";
import OrderCreateProduct from "./order-create-product";

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
      productCode: string | null;
      janCode: string | null;
      size: {
        name: string;
      };
    }[];
  };
} & {
  id: string;
  customerId: string;
  productId: string;
})[];

export default function OrderCreate({ customers }: OrderCreateProps) {
  const [products, setProducts] = useState<Data>([]);

  const getProducts = async (id: string) => {
    const data = await actions.getProducts(id);
    console.log(data);
    setProducts(data);
  };

  return (
    <div>
      <div className="grid grid-cols-3 p-6 mt-6 bg-white rounded-lg">
        <OrderCreateCustomer customers={customers} getProducts={getProducts} />
        <OrderCreateProduct customerProducts={products} />
        <div>cart</div>
      </div>
    </div>
  );
}
