import OrderAction from "@/components/orders/order-action";
import { db } from "@/db";

interface OrderActionPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderActionPage({ params }: OrderActionPageProps) {
  const order = await db.order.findFirst({
    where: {
      id: Number(params.orderId)
    },
    include: {
      user: {
        select: {
          name: true
        }
      },
      customer: {
        select: {
          name: true
        }
      },
      orderDetail: {
        include: {
          sku: {
            include: {
              product: {
                include: {
                  color: {
                    select: {
                      name: true
                    }
                  },
                  category: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
  if (!order) return;
  return (
    <div className="w-full max-w-[900px] mx-auto">
      <OrderAction order={order} />
    </div>
  );
}