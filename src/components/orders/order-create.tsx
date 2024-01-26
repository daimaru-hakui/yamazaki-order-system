"use client";
import OrderCustomerList from "./order-customer-list";
import { type Customer } from "@prisma/client";

interface OrderCreateProps {
  customers: Customer[];
}

export default function OrderCreate({ customers }: OrderCreateProps) {
  return (
    <div className="mt-3">
      <OrderCustomerList customers={customers} />
    </div>
  );
}
