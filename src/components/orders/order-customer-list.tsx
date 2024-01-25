import { Customer } from "@prisma/client";
import OrderCustomerCard from "./order-customer-card";

interface CustomerListProps {
  customers: Customer[];
}

export default function OrderCustomerList({ customers }: CustomerListProps) {
  return (
    <div className="flex flex-row gap-3">
      {customers?.map((customer) => (
        <OrderCustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
