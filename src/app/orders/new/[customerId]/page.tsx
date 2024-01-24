import OrderProductList from "@/components/orders/order-product-list";
import { db } from "@/db";

interface OrderCreateCustomerById {
  params: {
    customerId: string;
  };
}
export default async function OrderCreateCustomerById({ params }: OrderCreateCustomerById) {
  const customers = await db.customer.findFirst({
    where: {
      id: Number(params.customerId)
    },
    include: {
      customerProduct: {
        include: {
          product: {
            include: {
              color: true
            }
          }
        }
      }
    }
  });
  await db.$disconnect();
  console.log(customers);
  return (
    <div className="mx-auto max-w-[calc(700px)]">
      <OrderProductList customers={customers} />
    </div>
  );
}