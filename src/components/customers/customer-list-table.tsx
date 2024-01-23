"use client";
import paths from "@/paths";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

interface CustomerListTableProps {
  customers: Customer[];
}

export default function CustomerListTable({
  customers,
}: CustomerListTableProps) {
  return (
    <Table aria-label="cutomer table" className="mt-3">
      <TableHeader>
        <TableColumn>顧客名</TableColumn>
        <TableColumn>商品登録</TableColumn>
        <TableColumn className="w-32">action</TableColumn>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{1}</TableCell>
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
  );
}