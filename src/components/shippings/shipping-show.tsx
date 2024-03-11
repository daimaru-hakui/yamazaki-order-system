"use client";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format } from "date-fns";
import React from "react";
import { getTotalAmount } from "@/utils";

interface ShippingShowProps {
  shipping: {
    id: number;
    orderId: number;
    shippingDate: Date;
    user: {
      name: string | null;
    };
    order: {
      id: number;
      customer: {
        name: string;
      };
    };
    shippingDetail: {
      id: number;
      price: number;
      quantity: number;
      orderDetail: {
        productCode: string | null;
        productNumber: string | null;
        productName: string | null;
        color: string | null;
        size: string | null;
      };
    }[];
  };
}

export default function ShippingShow({ shipping }: ShippingShowProps) {
  const sum = getTotalAmount(shipping.shippingDetail);
  console.log(sum)

  return (
    <div className="p-6 bg-white rounded-lg drop-shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between gap-2 px-5">
        <div className="w-full sm:w-[calc(400px)] grid gap-2">
          <dl className="grid grid-cols-4 items-center gap-6">
            <dt className="col-span-1 text-xs text-gray-400">工場名</dt>
            <dd className="col-span-3 text-sm">
              {shipping.order.customer.name}
            </dd>
          </dl>
          <dl className="grid grid-cols-4 items-center gap-6">
            <dt className="col-span-1 text-xs text-gray-400">受注日</dt>
            <dd className="col-span-3 text-sm">
              {format(new Date(shipping.shippingDate), "yyyy-MM-dd")}
            </dd>
          </dl>
          <dl className="grid grid-cols-4 items-center gap-6">
            <dt className="col-span-1 text-xs text-gray-400">担当者</dt>
            <dd className="col-span-3 text-sm">
              {shipping.user?.name || "不明"}
            </dd>
          </dl>
        </div>
        <div className="">
          <dl className="grid grid-cols-2 items-center gap-6">
            <dt className="text-xs sm:text-md text-gray-400 sm:text-right">
              合　計
            </dt>
            <dd className="text-sm sm:text-3xl">￥{sum}</dd>
          </dl>
        </div>
      </div>
      <Table
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        shadow="none"
        classNames={{
          base: "max-h-[520px] overflow-auto",
        }}
      >
        <TableHeader>
          <TableColumn>品番</TableColumn>
          <TableColumn>品名</TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center">単価</TableColumn>
          <TableColumn className="text-center">出荷数</TableColumn>
          <TableColumn className="text-center">合計</TableColumn>
          {/* <TableColumn>コメント</TableColumn> */}
        </TableHeader>
        <TableBody loadingContent={<Spinner color="white" />}>
          {shipping.shippingDetail.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell>{detail.orderDetail.productNumber}</TableCell>
              <TableCell>{detail.orderDetail.productName}</TableCell>
              <TableCell className="text-center">
                {detail.orderDetail.size}
              </TableCell>
              <TableCell className="text-right">
                {detail.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {detail.quantity.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {(detail.price * detail.quantity).toLocaleString()}
              </TableCell>
              {/* <TableCell>{detail.memo}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
