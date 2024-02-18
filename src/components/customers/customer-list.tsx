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
import TitleWithButton from "../common/title-return";
import CustomerShowModal from "./customer-show-modal";

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
      <TitleWithButton title="顧客登録">
        <Button color="primary" size="sm" className="p-0">
          <Link
            href={paths.customerCreate()}
            className="flex w-full h-full items-center justify-center gap-1"
          >
            <AiOutlinePlus /> 追加
          </Link>
        </Button>
      </TitleWithButton>
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
                  <CustomerShowModal customer={customer} />
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
