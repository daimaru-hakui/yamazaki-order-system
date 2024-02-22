import OrderProductList from "@/components/orders/order-product-list";
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
      id: params.customerId,
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
                    },
                  },
                  product: {
                    select: {
                      id: true,
                      productNumber: true,
                      productName: true,
                      color: {
                        select: {
                          code: true,
                          name: true,
                        },
                      },
                    },
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
      <OrderProductList
        customerId={params.customerId}
        customerName={customer?.name}
        customerProducts={customer?.customerProduct}
      />
    </div>
  );
}
