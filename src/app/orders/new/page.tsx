import OrderCustomerList from "@/components/orders/order-customer-list";
import { db } from "@/db";

export default async function OrderNewPage() {
  const customers = await db.customer.findMany({
    select: {
      id: true,
      name: true
    }
  });
  await db.$disconnect();
  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <div className="text-md font-bold text-center">
        <div>発注</div>
      </div>
      <OrderCustomerList customers={customers} />
    </div>
  );
}
