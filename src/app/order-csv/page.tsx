import FormOrderCsv from "@/components/order-csv/form-order-csv";
import { db } from "@/db";
import { Color, Product, Size, Sku } from "@prisma/client";

export type SkuWithProduct = (Sku & {
  product: Product & {
    color: Color;
  };
  size: Size;
});


export default async function OrderCsvPage() {
  const skus = await db.sku.findMany({
    include: {
      product: {
        include: {
          color: true
        }
      },
      size: true
    }
  });

  return (
    <div className="mx-auto max-w-[calc(700px)]">
      <FormOrderCsv skus={skus} />
    </div>
  );
}