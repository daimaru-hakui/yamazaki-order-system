"use client";
import { useStore } from "@/store";
import OrderCustomerList from "./order-customer-list";
import OrderProductList from "./order-product-list";
import { Product, type Customer, CustomerProduct, Color } from "@prisma/client";

interface OrderCreateProps {
  customers: Customer[];
}

export default function OrderCreate({ customers }: OrderCreateProps) {
  const activePage = useStore((state) => state.activePage);
  return (
    <div className="mt-3">
      <OrderCustomerList customers={customers} />
    </div>
  );
}
