"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import CsvRegisterList from "../csv-register-list";
import { Customer } from "@prisma/client";
import * as actions from "@/actions";

interface CsvRegisterCustomerProps {
  customers: Customer[];
}

export default function CsvRegisterCustomer({
  customers,
}: CsvRegisterCustomerProps) {
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
      const csvSplit = csvFile.split(/\r?\n/).map((csv) => csv.split(","));
      csvSplit.shift();

      const csvArray = csvSplit.map((item) => {
        return {
          ediCode: item[0],
          code: item[1],
          name: item[2],
          address: item[3],
          tel: item[4],
        };
      });
      console.log(csvArray);
      const csvCustomers = csvArray
        .map((csvData) => {
          const customer = findCustomer(csvData.ediCode);
          return {
            ...customer,
            ediCode: csvData.ediCode,
            code: csvData.code,
            name: csvData.name,
            address: csvData.address,
            tel: csvData.tel,
          };
        })
        .filter((csvData) => csvData.ediCode);
      //   console.log(csvCustomers);
      setData(csvCustomers);
    });
  };

  const findCustomer = (ediCode: string) => {
    const customer = customers.find((customer) => customer.ediCode === ediCode);
    return customer;
  };

  const action = actions.csvCreateCustomer.bind(null,data)

  return (
    <form
      className="flex flex-col"
      action={action}
    >
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
          {/* <CsvRegisterList data={data} /> */}
          <div className="flex gap-3">
            <Button color="danger" onClick={() => setData([])}>
              クリア
            </Button>
            <Button type="submit" color="primary" className="w-full">
              登録
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
