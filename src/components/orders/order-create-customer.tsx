"use client";
import { Button } from "@nextui-org/react";
import * as actions from "@/actions";

interface OrderCreateCustomerProps {
  customers: {
    id: string;
    name: string;
  }[];
  getProducts: (id: string) => void;
}

export default function OrderCreateCustomer({
  customers,
  getProducts
}: OrderCreateCustomerProps) {
//   const getProducts = async (id: string) => {
//     const data = await actions.getProducts(id);
//     console.log(data);
//   };

  return (
    <div className="overflow-auto h-[calc(100vh-200px)] px-3">
      <div className="grid gap-3">
        {customers.map((customer) => (
          <Button
            key={customer.id}
            className="text-sm cursor-pointer"
            onClick={() => getProducts(customer.id)}
          >
            {customer.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
