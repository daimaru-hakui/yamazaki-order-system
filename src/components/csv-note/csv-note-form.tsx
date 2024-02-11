'use client';
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";


interface CsvNoteForm {
  customers: {
    id: string;
    ediCode: string;
    ediName: string;
    code: string;
    name: string;
  }[];
}

export default function CsvNoteForm({ customers }: CsvNoteForm) {
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
      const csvSplit = csvFile.replace(/"/g, "").split(/\r?\n/).map((csv) => csv.split(','));
      csvSplit.shift();

      const csvArray = csvSplit.map((item) => {
        return {
          "納品日": item[2],
          "受注番号": item[4],
          "商品コード": item[8],
          "商品名": item[12],
          "受注数量": Number(item[28]),
          "原価": Number(item[29]),
          "納品部署コード": item[16]
        };
      });
      const object = csvArray.map((item) => {
        const customer = customers.find((customer) =>
          (item.納品部署コード === customer.ediCode));
        return {
          ...item,
          ...customer
        };
      });
      console.log(object);
      setData(object);
    });
  };

  return (
    <div className="flex flex-col ">
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
          <div className="flex gap-3">
            <Button color="danger" onClick={handleReset}>クリア</Button>
            <CSVDownload data={data} />
          </div>
        </div>
      )}
    </div>
  );
};