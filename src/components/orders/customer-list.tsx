import { Customer } from "@prisma/client";
import OfficeCard from "./customer-card";

interface CustomerListProps {
  customers:Customer[]
}

export default function CustomerList({customers}:CustomerListProps) {
  return (
    <div className="flex flex-row gap-3">
      {customers.map((customer) => (
        <OfficeCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
