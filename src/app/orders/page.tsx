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
              product: {
                select: {
                  productName: true,
                  productNumber: true
                }
              },
              size: {
                select: {
                  name: true
                }
              }
            }
          },
          shippingDetail: {
            select: {
              quantity: true
            }
          }
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  const newOrders = orders.map((order) => {
    const newOrderDetail = order.orderDetail.map((detail) => {
      let sum = 0;
      detail.shippingDetail.forEach((shipping) => {
        sum += shipping.quantity;
      });
      return {
        ...detail,
        shippingQuantity: sum
      };
    });
    let [totalQuantity, totalOrderQuantity] = [0, 0];
    order.orderDetail.forEach((detail) => {
      totalQuantity += detail.quantity;
      totalOrderQuantity += detail.orderQuantity;
    });
    return {
      ...order,
      orderDetail: newOrderDetail,
      totalQuantity,
      totalOrderQuantity
    };
  });

  console.log(newOrders);

  return (
    <div className="mx-auto w-full max-w-[calc(1000px)]">
      <OrderList orders={newOrders} />
    </div>
  );
}
