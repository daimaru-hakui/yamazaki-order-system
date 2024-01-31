"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Order, OrderDetail } from "@prisma/client";
import { format } from "date-fns";
import { useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineEye } from "react-icons/ai";
import OrderShowModal from "./order-show-modal";
import Link from "next/link";
import paths from "@/paths";

interface OrderListProps {
  orders: (Order & {
    user: {
      name: string | null;
    };
    customer: {
      name: string;
    };
  })[];
}

export default function OrderList({ orders }: OrderListProps) {
  const sumCalc = (details: any) => {
    let sum = 0;
    details.forEach((detail: OrderDetail) => {
      sum += detail.quantity * detail.sku.price || 0;
    });
    return sum;
  };

  return (
    <div className="w-full max-w-[calc(600px)] mx-auto">
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.home()}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft />
          <div className="text-sm">戻る</div>
        </Link>
        <div className="font-bold">受注一覧</div>
      </div>
      <Table aria-label="orders table" className="mt-3">
        <TableHeader>
          <TableColumn>NO.</TableColumn>
          <TableColumn>発注日</TableColumn>
          <TableColumn>発注NO.</TableColumn>
          <TableColumn>工場名</TableColumn>
          <TableColumn className="text-center">受注金額</TableColumn>
          <TableColumn>発注者</TableColumn>
          <TableColumn>詳細</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{format(order.createdAt, "yyyy-MM-dd")}</TableCell>
              <TableCell>{order.orderNumber || ""}</TableCell>
              <TableCell>{order.customer.name || "不明"}</TableCell>
              <TableCell className="text-right">
                {sumCalc(order.orderDetail).toLocaleString()}
              </TableCell>
              <TableCell className="">{order.user.name || "不明"}</TableCell>
              <TableCell>
                <OrderShowModal
                  order={order}
                  sum={sumCalc(order.orderDetail).toLocaleString()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
