import CsvNoteForm from "@/components/edi-csv-upload/edi-csv-form";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { db } from "@/db";

export default async function EdiCsvUploadPage() {
  const inputData = fs.readFileSync("./products.csv", { encoding: "utf-8" });

  const csvArray = inputData.split(/\r?\n/).map((item) => item.split(","));
  csvArray.shift();
  const products = csvArray.map((item) => ({
    商品コード: item[0],
    商品名: item[1],
    売価: Number(item[2]),
    原価: Number(item[3]),
  }));
  
  console.log(products);
  const customers = await db.customer.findMany();
  const skus = await db.sku.findMany({
    include: {
      product: {
        include: {
          color: {
            select: {
              name: true,
            },
          },
        },
      },
      size: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-[500px]">
      <CsvNoteForm customers={customers} skus={skus} products={products} />
    </div>
  );
}
