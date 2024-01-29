import { Customer } from "@prisma/client";
import Link from "next/link";

interface CustomerListProps {
  customers: { id: string, name: string; }[];
}

export default function OrderCustomerList({ customers }: CustomerListProps) {

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {customers?.map((customer) => (
        <Link key={customer.id} href={`/orders/new/${customer.id}`}>
          <div className="p-6 border rounded cursor-pointer bg-white">
            <div>{customer.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
