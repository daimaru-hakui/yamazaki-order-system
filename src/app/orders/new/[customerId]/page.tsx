import OrderProductList from "@/components/orders/order-product-list";
import OrderCartButtonArea from "@/components/orders/order-cart-button-area";
import { db } from "@/db";

interface OrderCreateCustomerById {
  params: {
    customerId: string;
  };
}
export default async function OrderCreateCustomerById({
  params,
}: OrderCreateCustomerById) {
  const customers = await db.customer.findFirst({
    where: {
      id: Number(params.customerId),
    },
    include: {
      customerProduct: {
        include: {
          product: {
            include: {
              color: true,
              skus: {
                include: {
                  size: true,
                  product: true,
                },
              },
            },
          },
        },
      },
    },
  });
  await db.$disconnect();
  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <OrderProductList customers={customers} />
      <OrderCartButtonArea
        customer={{
          customerId: params.customerId,
          customerName: customers?.name,
        }}
      />
    </div>
  );
}
