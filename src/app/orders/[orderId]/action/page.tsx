import OrderAction from "@/components/orders/order-action";
import { db } from "@/db";

interface OrderActionPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderActionPage({
  params,
}: OrderActionPageProps) {
  const order = await db.order.findFirst({
    where: {
      id: Number(params.orderId),
    },
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
        where: {
          quantity: {
            gt: 0,
          },
        },
        select: {
          id: true,
          janCode: true,
          productCode: true,
          productNumber: true,
          productName: true,
          size: true,
          price: true,
          quantity: true,
          orderQuantity: true,
          memo: true,
          skuId:true,
          shippingDetail: {
            select: {
              quantity: true,
            },
          },
        },
      },
    },
  });
  if (!order) return;
  return (
    <div className="w-full max-w-[900px] mx-auto p-6 pb-24">
      <OrderAction order={order} />
    </div>
  );
}
