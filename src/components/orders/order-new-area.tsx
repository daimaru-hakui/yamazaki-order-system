"use client";
import { useStore } from "@/store";
import CustomerList from "./customer-list";
import ProductList from "./product-list";

export default function OrderNewArea() {
  const cart = useStore((state) => state.cart);
  console.log(cart)
  const activePage = useStore((state) => state.activePage);
  return (
    <div>
      {activePage === 1 && <CustomerList />}
      {activePage === 2 && <ProductList />}
    </div>
  );
}
