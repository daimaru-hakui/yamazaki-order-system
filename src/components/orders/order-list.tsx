"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";

interface OrderListProps {
  orders: (Order & {
    user: {
      name: string | null;
    };
  })[];
}
export default function OrderList({ orders }: OrderListProps) {
  return (
    <div className="w-full max-w-[calc(600px)] mx-auto">
      <Table aria-label="orders table">
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>発注NO.</TableColumn>
          <TableColumn>発注者</TableColumn>
          <TableColumn>発注日</TableColumn>
          <TableColumn>詳細</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.orderNumber || ""}</TableCell>
              <TableCell>{order.user.name || "不明"}</TableCell>
              <TableCell>{format(order.createdAt, "yyyy-MM-dd")}</TableCell>
              <TableCell>
                <AiOutlineEye className="cursor-pointer" size="25px" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
