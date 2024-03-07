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
    <div className="mx-auto max-w-[calc(1500px)]">
      <OrderCreate customers={customers} />
    </div>
  );
}
