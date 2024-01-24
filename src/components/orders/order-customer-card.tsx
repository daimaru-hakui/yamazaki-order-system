"use client";
import { useStore } from "@/store";

interface Customer {
  id: number;
  name: string;
}

interface OfficeCardProps {
  customer: Customer;
}

export default function OrderCustomerCard({ customer }: OfficeCardProps) {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const setActivePage = useStore((state) => state.setActivePage);

  const addCustomerCart = (customer: Customer) => {
    setCart({ ...cart, customer: { id: customer.id, name: customer.name } });
    setActivePage(2);
  };

  return (
    <div
      className="p-6 border rounded cursor-pointer bg-white"
      onClick={() => addCustomerCart(customer)}
    >
      <div>{customer.name}</div>
    </div>
  );
}
