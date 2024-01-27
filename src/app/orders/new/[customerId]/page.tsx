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
  const customer = await db.customer.findFirst({
    where: {
      id: Number(params.customerId),
    },
    include: {
      customerProduct: {
        include: {
          product: {
            include: {
              color: { select: { name: true } },
              skus: {
                include: {
                  size: {
                    select: {
                      name: true,
                    }
                  },
                  product: {
                    select: {
                      id: true,
                      productNumber: true,
                      productName: true
                    }
                  },
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
      <OrderProductList customerName={customer?.name} customerProducts={customer?.customerProduct} />
      <OrderCartButtonArea
        customer={{
          customerId: params.customerId,
          customerName: customer?.name,
        }}
      />
    </div>
  );
}
