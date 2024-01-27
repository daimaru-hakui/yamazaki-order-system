'use client';
import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import OrderCsvList from "./order-csv-list";
import { SkuWithProduct } from "@/app/order-csv/page";

interface FormOrderCsv {
  skus: SkuWithProduct[];
}

export default function FormOrderCsv({ skus }: FormOrderCsv) {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleFileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;
    const reader = new FileReader();
    reader?.readAsText(file, "Shift_JIS");
    reader.addEventListener("load", async function () {
      if (!reader.result) return;
      const csvFile = reader.result.toString();
      const csvSplit = csvFile.split(/\r?\n/);
      const csvArray = csvSplit.map((csv) => csv.split(','));
      csvArray.shift();

      const csv = csvArray.map((item) => {
        return {
          productId: item[0],
          sizeId: item[1],
          quantity: item[2]
        };
      });
      const csvSkus = csv.map((item) => {
        const sku = findSkus(Number(item.productId), Number(item.sizeId));
        return { ...sku, quantity: item.quantity };
      }).filter((sku) => sku.id);
      setData(csvSkus);
    });
  };

  const findSkus = (productId: number, sizeId: number) => {
    const sku = skus.find((sku) =>
      sku.productId === productId && sku.sizeId === sizeId
    );
    return sku;
  };


  return (
    <form className="flex flex-col ">
      <input type="file" accept='*.csv' onChange={handleFileChange} />
      <Button
        color="primary"
        className="mt-3"
        onClick={handleFileClick}
      >
        読み込み
      </Button>
      <OrderCsvList data={data} />
    </form>
  );
}