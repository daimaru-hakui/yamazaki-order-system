"use client";

import { useStore } from "@/store";
import { CSSProperties } from "react";

interface OrderCreateCustomerProps {
  customers: {
    id: string;
    name: string;
  }[];
  getProducts: (customer: { id: string; name: string }) => void;
}

export default function OrderCreateCustomer({
  customers,
  getProducts,
}: OrderCreateCustomerProps) {
  const orderOptions = useStore((state) => state.orderOptions);

  const bgStyle: CSSProperties = {
    backgroundColor: "#eee",
  };

  return (
    <div className="col-span-3">
      <div className="p-3 bg-gray-100">工場名を選択</div>
      <div className="overflow-auto h-[calc(100vh-220px)]">
        <div className="grid">
          {customers.map((customer) => (
            <div
              key={customer.id}
              style={customer.id === orderOptions.customer.id ? bgStyle : {}}
              className="text-sm cursor-pointer px-3 py-1 hover:bg-gray-200"
              onClick={() => getProducts(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
