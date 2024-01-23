import OrderNewArea from "@/components/orders/order-new-area";
import { db } from "@/db";

export default async function OrderNewPage() {
  const customers = await db.customer.findMany({
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
  console.log(customers);
  return (
    <div className="mx-auto max-w-[calc(700px)]">
      <OrderNewArea customers={customers} />
    </div>
  );
}
