"use client";
import { useStore } from "@/store";
import OrderCustomerList from "./order-customer-list";
import OrderProductList from "./order-product-list";
import { Product, type Customer, CustomerProduct, Color } from "@prisma/client";


interface OrderCreateProps {
  customers: Customer[];
}

export default function OrderCreate({ customers }: OrderCreateProps) {
  const cart = useStore((state) => state.cart);


  const activePage = useStore((state) => state.activePage);
  return (
    <div>
      {activePage === 1 && <OrderCustomerList customers={customers} />}
      {/* {activePage === 2 && <OrderProductList products={prodSucts} />} */}
    </div>
  );
}
