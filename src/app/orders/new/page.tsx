import OrderCreate from "@/components/orders/order-create";
import { db } from "@/db";

export default async function OrderNewPage() {
  const customers = await db.customer.findMany();
  await db.$disconnect();
  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <div className="text-md font-bold text-center">
        <div>発注</div>
      </div>
      <OrderCreate customers={customers} />
    </div>
  );
}
