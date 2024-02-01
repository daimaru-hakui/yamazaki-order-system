import CustomerList from "@/components/customers/customer-list";
import { db } from "@/db";

export default async function CustomersPage() {
  const customers = await db.customer.findMany({
    include: {
      _count: {
        select: { customerProduct: true }
      }
    },
  });
  if (!customers) {
    return;
  }
  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <CustomerList customers={customers} />
    </div>
  );
}
