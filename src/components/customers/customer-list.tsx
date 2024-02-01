"use client";
import paths from "@/paths";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import Link from "next/link";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
} from "react-icons/ai";
import TitleReturn from "../common/title-return";

interface CustomerListTableProps {
  customers: (Customer & {
    _count: {
      customerProduct: number;
    };
  })[];
}

export default function CustomerList({ customers }: CustomerListTableProps) {
  return (
    <>
      <TitleReturn title="工場一覧" path={paths.home()}>
        <Button color="primary" size="sm" className="p-0">
          <Link
            href={paths.customerCreate()}
            className="flex w-full h-full items-center justify-center gap-1"
          >
            <AiOutlinePlus /> 追加
          </Link>
        </Button>
      </TitleReturn>
      <Table aria-label="cutomer table" className="mt-3">
        <TableHeader>
          <TableColumn>顧客コード</TableColumn>
          <TableColumn>顧客名</TableColumn>
          <TableColumn className="text-center">登録商品数</TableColumn>
          <TableColumn className="w-32">action</TableColumn>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.code}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell className="text-center">
                {customer._count.customerProduct}
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Link href={paths.customerShow(customer.id)}>
                    <AiOutlineEye className="text-xl cursor-pointer" />
                  </Link>
                  <Link href={paths.customerEdit(customer.id)}>
                    <AiOutlineEdit className="text-xl cursor-pointer" />
                  </Link>
                  <AiOutlineDelete className="text-xl cursor-pointer text-red-600" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
