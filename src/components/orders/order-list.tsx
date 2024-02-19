"use client";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Order, OrderDetail, Shipping, Sku } from "@prisma/client";
import { format } from "date-fns";
import OrderShowModal from "./order-show-modal";
import OrderListDropdown from "./order-list-dropdown";

interface OrderListProps {
  orders: (Order & {
    user: {
      name: string | null;
    };
    customer: {
      name: string;
    };
    totalQuantity: number;
    totalOrderQuantity: number;
    orderDetail: (OrderDetail &
    {
      sku: (Sku & {
        product: {
          productNumber: string;
          productName: string;
        };
        size: {
          name: string;
        };
      });
      shippingQuantity: number;
    })[];
  })[];
}

export const sumCalc = (details: (OrderDetail & { sku: { price: number; }; })[]) => {
  let sum = 0;
  details.forEach((detail) => {
    sum += detail.orderQuantity * detail.sku.price || 0;
  });
  return sum;
};

const statusLabel = (totalOrderQuantity: number, totalQuantity: number,) => {
  if (totalOrderQuantity === totalQuantity) {
    return <Chip color="default">未手配</Chip>;
  }
  if (totalQuantity === 0) {
    return <Chip color="success" className="text-white">出荷済</Chip>;
  }
  if (totalOrderQuantity > totalQuantity) {
    return <Chip color="primary">注文残</Chip>;
  }
};


export default function OrderList({ orders }: OrderListProps) {

  return (
    <>
      <h3 className="text-xl font-bold">受注一覧</h3>
      <Table aria-label="orders table" className="mt-3">
        <TableHeader>
          <TableColumn className="text-center">出荷状況</TableColumn>
          <TableColumn>NO.</TableColumn>
          <TableColumn>発注日</TableColumn>
          <TableColumn>発注NO.</TableColumn>
          <TableColumn>工場名</TableColumn>
          <TableColumn className="text-right">受注金額（円）</TableColumn>
          <TableColumn className="text-center">発注者</TableColumn>
          <TableColumn>actions</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell width={50}>{statusLabel(order.totalOrderQuantity, order.totalQuantity)}
              </TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{format(order.createdAt, "yyyy-MM-dd")}</TableCell>
              <TableCell>{order.orderNumber || ""}</TableCell>
              <TableCell>{order.customer.name || "不明"}</TableCell>
              <TableCell className="text-right">
                {sumCalc(order.orderDetail).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">{order.user.name || "不明"}</TableCell>
              <TableCell className="flex items-center gap-3">
                <OrderShowModal
                  order={order}
                  sum={sumCalc(order.orderDetail).toLocaleString()}
                />
                <OrderListDropdown orderId={order.id} totalQuantity={order.totalQuantity} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
