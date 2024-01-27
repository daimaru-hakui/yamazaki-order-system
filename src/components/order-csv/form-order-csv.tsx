'use client';
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import OrderCsvList from "./order-csv-list";
import { SkuWithProduct } from "@/app/order-csv/page";

interface FormOrderCsv {
  skus: SkuWithProduct[];
}

export default function FormOrderCsv({ skus }: FormOrderCsv) {
  const [fileUpload, setFileUpload] = useState<File[] | null>(null);
  const [data, setData] = useState<any>([]);
  console.log(skus);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFileUpload((prev => [...Array.from(prev || []), ...Array.from(files)]));
  };

  const handleFileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!fileUpload) return;
    const file = fileUpload[0];
    const reader = new FileReader();
    reader.readAsText(file, "Shift_JIS");
    reader.addEventListener("load", async function () {
      if (!reader.result) return;
      const csvFile = reader.result.toString();
      const csvSplit = csvFile.split(/\r?\n/);
      const csvArray = csvSplit.map((csv) => csv.split(','));
      const header = csvArray.shift();

      const csv = csvArray.map((item) => {
        return {
          productId: item[0],
          sizeId: item[1]
        };
      });
      setData(csv);
    });
  };

  console.log(data);

  return (
    <form className="flex flex-col ">
      <Input type="file" accept='.csv' onChange={handleFileChange} />
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