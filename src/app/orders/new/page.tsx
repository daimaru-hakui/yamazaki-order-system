import OrderCustomerList from "@/components/orders/order-customer-list";
import OrderCreate from "@/components/orders/order-create";
import { db } from "@/db";

export default async function OrderNewPage() {
  const customers = await db.customer.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  await db.$disconnect();
  return (
    <div className="mx-auto max-w-[calc(900px)]">
      <OrderCreate customers={customers} />
      {/* <OrderCustomerList customers={customers} /> */}
    </div>
  );
}
