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
import { Shipping, ShippingDetail, Sku } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

interface ShippingListProps {
  shippingDetails: (ShippingDetail & {
    shipping: {
      id: number;
      shippingDate: Date;
      order: {
        id: number;
        createdAt: Date;
        customer: {
          name: string;
        };
      };
    };
    sku: Sku & {
      size: {
        name: string;
      };
      product: {
        productNumber: string;
        productName: string;
        color: {
          name: string;
        };
      };
    };
  })[];
}

export default function ShippingList({ shippingDetails }: ShippingListProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold">出荷履歴</h3>
      <Table
        aria-label="shippings table"
        classNames={{
          base: "max-h-[calc(100vh-150px)] ",
          // table: "min-h-[100vh-420px]",
        }}
        className="mt-3"
        layout="fixed"
        isStriped
        isCompact
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn width={80}>出荷NO.</TableColumn>
          <TableColumn width={80}>受付NO.</TableColumn>
          <TableColumn width={200}>受注日</TableColumn>
          <TableColumn width={100}>品番</TableColumn>
          <TableColumn width={200}>商品名</TableColumn>
          <TableColumn width={100}>色</TableColumn>
          <TableColumn width={80}>サイズ</TableColumn>
          <TableColumn width={80}>数量</TableColumn>
          <TableColumn width={300}>顧客名</TableColumn>
          <TableColumn width={120}>出荷日</TableColumn>
        </TableHeader>
        <TableBody>
          {shippingDetails.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell>
                <Link href={paths.shippingShow(String(detail.shipping.id))}>
                  <div className="underline text-blue-500 hover:no-underline">{detail.shipping.id}</div>
                </Link>
              </TableCell>
              <TableCell>{detail.shipping.order.id}</TableCell>
              <TableCell>
                {format(detail.shipping.order.createdAt, "yyyy-MM-dd")}
              </TableCell>
              <TableCell>{detail.sku.product.productNumber}</TableCell>
              <TableCell>{detail.sku.product.productName}</TableCell>
              <TableCell>{detail.sku.product.color.name}</TableCell>
              <TableCell>{detail.sku.size.name}</TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>{detail.shipping.order.customer.name}</TableCell>
              <TableCell>
                {format(new Date(detail.shipping.shippingDate), "yyyy-MM-dd")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
