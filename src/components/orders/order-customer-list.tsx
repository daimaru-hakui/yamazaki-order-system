import { Customer } from "@prisma/client";
import OfficeCard from "./order-customer-card";

interface CustomerListProps {
  customers: Customer[];
}

export default function OrderCustomerList({ customers }: CustomerListProps) {
  return (
    <div className="flex flex-row gap-3">
      {customers.map((customer) => (
        <OfficeCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
