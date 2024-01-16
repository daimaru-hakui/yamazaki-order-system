"use client";
import { useStore } from "@/store";
import CustomerList from "./customer-list";
import ProductList from "./product-list";
import { type Customer } from "@prisma/client";

interface OrderNewAreaProps {
  customers: Customer[];
}

export default function OrderNewArea({ customers }: OrderNewAreaProps) {
  const cart = useStore((state) => state.cart);
  console.log(cart);

  const activePage = useStore((state) => state.activePage);
  return (
    <div>
      {activePage === 1 && <CustomerList customers={customers} />}
      {activePage === 2 && <ProductList />}
    </div>
  );
}
