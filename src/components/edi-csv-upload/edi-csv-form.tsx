"use client";
import { Button } from "@nextui-org/react";
import { Customer, Product, Sku } from "@prisma/client";
import { format } from "date-fns";
import { useState } from "react";
import { CSVLink } from "react-csv";

interface CsvNoteForm {
  customers: Customer[];
  products: {
    商品コード: string;
    商品名: string;
    売価: number;
    原価: number;
  }[];
  skus: (Sku & {
    product: Product & {
      color: {
        name: string;
      };
    };
    size: {
      name: string;
    };
  })[];
}

export default function CsvNoteForm({
  customers,
  skus,
  products,
}: CsvNoteForm) {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleReset = () => {
    setData([]);
    setFile(null);
  };

  const handleFileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;
    const reader = new FileReader();
    reader?.readAsText(file, "Shift_JIS");
    reader.addEventListener("load", async function () {
      if (!reader.result) return;
      const csvFile = reader.result.toString();
      const csvSplit = csvFile
        .replace(/"/g, "")
        .split(/\r?\n/)
        .map((csv) => csv.split(","));
      csvSplit.shift();

      const csvArray = csvSplit.map((item) => {
        return {
          納品日: item[2],
          受注番号: item[4],
          商品コード: item[8],
          商品名: item[12]?.replace(/[[Ａ-Ｚａ-ｚ０-９－]/g, charChange),
          受注数量: Number(item[28]),
          売価: Number(item[29]),
          納品部署コード: item[16],
        };
      });
      const customerJoinArray = csvArray
        .map((item) => {
          const customer = customers.find(
            (customer) => item.納品部署コード === customer.ediCode
          );
          // const sku = skus.find((sku) => sku.productCode === item.商品コード);
          const a = item.納品日?.slice(0, 4);
          const b = item.納品日?.slice(4, 6);
          const c = item.納品日?.slice(6);
          const d = a + "-" + b + "-" + c;
          return {
            顧客コード: customer?.code,
            顧客名: customer?.name,
            商品コード: item?.商品コード,
            メーカー名: "",
            商品名: item.商品名,
            サイズ: "",
            受注数量: item.受注数量,
            納品日: d,
            受注番号: item.受注番号,
            上代: "",
            売価: item.売価,
            原価: "",
          };
        })
        .map((item) => {
          const product = products.find(
            (product) => item.商品コード === product.商品コード
          );
          return {
            ...item,
            原価: product?.原価,
          };
        })
        .filter((item) => item.受注数量);
      console.log(customerJoinArray);
      setData(customerJoinArray);
    });
  };

  function charChange(str: string) {
    return String.fromCharCode(str.charCodeAt(0) - 0xfee0);
  }

  return (
    <div className="flex flex-col ">
      {data.length === 0 && (
        <div className="flex justify-between items-center mt-6 p-6 bg-white rounded-lg drop-shadow-md">
          <input type="file" accept="*.csv" onChange={handleFileChange} />
          {file && (
            <Button color="primary" onClick={handleFileClick}>
              読み込み
            </Button>
          )}
        </div>
      )}
      {data.length > 0 && (
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex gap-3">
            <Button color="danger" onClick={handleReset}>
              クリア
            </Button>
            <CSVLink
              className="w-full"
              data={data}
              filename={`${format(new Date(), "yyyy-MM-dd")}_yamazaki`}
            >
              <Button className="w-full">Download</Button>
            </CSVLink>
          </div>
        </div>
      )}
    </div>
  );
}
