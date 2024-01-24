import OrderCreate from "@/components/orders/order-create";
import { db } from "@/db";

export default async function OrderNewPage() {
  const customers = await db.customer.findMany();
  await db.$disconnect();
  return (
    <div className="mx-auto max-w-[calc(700px)]">
      <OrderCreate customers={customers} />
    </div>
  );
}
