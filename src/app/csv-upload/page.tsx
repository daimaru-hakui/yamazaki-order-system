import CsvUploadForm from "@/components/csv-upload/csv-upload-form";
import { db } from "@/db";
import { Color, Product, Size, Sku } from "@prisma/client";

export type SkuWithProduct = (Sku & {
  product: Product & {
    color: Color;
  };
  size: Size;
});


export default async function csvUploadPage() {
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
      <CsvUploadForm skus={skus} />
    </div>
  );
}