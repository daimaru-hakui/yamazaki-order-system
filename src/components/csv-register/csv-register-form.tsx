'use client';
import { Button } from "@nextui-org/react";
import { useState } from "react";
import CsvRegisterList from "./csv-register-list";
import { SkuWithProduct } from "@/app/csv-register/page";

interface CsvRegisterFormProps {
  skus: SkuWithProduct[];
}

export default function CsvRegisterForm({ skus }: CsvRegisterFormProps) {
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
      const csvSplit = csvFile.split(/\r?\n/).map((csv) => csv.split(','));
      csvSplit.shift();

      const csvArray = csvSplit.map((item) => {
        return {
          productId: item[0],
          sizeCode: Number(item[1]),
          quantity: Number(item[2]),
          lastName: item[3],
          firstName: item[4],
          comment: item[5]
        };
      });
      const csvSkus = csvArray.map((item) => {
        const sku = findSkus(item.productId, item.sizeCode);
        return {
          ...sku,
          quantity: item.quantity,
          lastName: item.lastName,
          firstName: item.firstName,
          comment: item.comment
        };
      }).filter((sku) => sku.id);
      console.log(csvSkus);
      setData(csvSkus);
    });
  };

  const findSkus = (productId: string, sizeCode: number) => {
    const sku = skus.find((sku) =>
      sku.productId === productId && sku.size.code === sizeCode
    );
    return sku;
  };


  return (
    <form className="flex flex-col ">
      {data.length === 0 && (
        <div
          className="flex justify-between items-center mt-6 p-6 bg-white rounded-lg drop-shadow-md"
        >
          <input type="file" accept='*.csv' onChange={handleFileChange} />
          {file && (
            <Button
              color="primary"
              onClick={handleFileClick}
            >
              読み込み
            </Button>
          )
          }
        </div>
      )}
      {data.length > 0 && (
        <div className="flex flex-col gap-6 mt-6">
          <CsvRegisterList data={data} />
          <div className="flex gap-3">
            <Button color="danger" onClick={() => setData([])}>クリア</Button>
            <Button color="primary" className="w-full">登録</Button>
          </div>
        </div>
      )}
    </form>
  );
};