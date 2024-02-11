import CsvUploadForm from "@/components/csv-register/csv-register-form";
import { db } from "@/db";
import { Color, Product, Size, Sku } from "@prisma/client";

export type SkuWithProduct = (Sku & {
  product: Product & {
    color: Color;
  };
  size: Size;
});


export default async function csvRegisterPage() {
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
    <div className="mx-auto max-w-[calc(800px)]">
      <CsvUploadForm skus={skus} />
    </div>
  );
}