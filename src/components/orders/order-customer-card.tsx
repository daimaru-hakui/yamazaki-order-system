"use client";
import { useStore } from "@/store";
import Link from "next/link";

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



  return (
    <Link href={`/orders/new/${customer.id}`}>
      <div
        className="p-6 border rounded cursor-pointer bg-white"
      >
        <div>{customer.name}</div>
      </div>
    </Link>
  );
}
