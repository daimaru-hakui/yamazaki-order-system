import OrderList from "@/components/orders/order-list";
import { db } from "@/db";

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
      orderDetail: {
        include: {
          sku: {
            include: {
              product: true
            }
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-[calc(700px)]">
      <OrderList orders={orders} />
    </div>
  );
}
