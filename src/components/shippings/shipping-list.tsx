"use client";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Shipping, ShippingDetail, Sku } from "@prisma/client";
import { format } from "date-fns";

interface ShippingListProps {
  shippingDetails: (ShippingDetail & {
    shipping: {
      id: number;
      shippingDate: Date;
      order: {
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
  console.log(shippingDetails);
  return (
    <>
      <h3 className="text-xl font-bold">出荷履歴</h3>
      <Table aria-label="shippings table" className="mt-3">
        <TableHeader>
          <TableColumn>受付番号</TableColumn>
          <TableColumn>受注日</TableColumn>
          <TableColumn>品番</TableColumn>
          <TableColumn>商品名</TableColumn>
          <TableColumn>色</TableColumn>
          <TableColumn>サイズ</TableColumn>
          <TableColumn>数量</TableColumn>
          <TableColumn>顧客名</TableColumn>
          <TableColumn>出荷日</TableColumn>
        </TableHeader>
        <TableBody>
          {shippingDetails.map((detail) => (
            <TableRow key={detail.id}>
              <TableCell>{detail.shipping.id}</TableCell>
              <TableCell>{format(detail.shipping.order.createdAt, "yyyy-MM-dd")}</TableCell>
              <TableCell>{detail.sku.product.productNumber}</TableCell>
              <TableCell>{detail.sku.product.productName}</TableCell>
              <TableCell>{detail.sku.product.color.name}</TableCell>
              <TableCell>{detail.sku.size.name}</TableCell>
              <TableCell>{detail.quantity}</TableCell>
              <TableCell>{detail.shipping.order.customer.name}</TableCell>
              <TableCell>{format(new Date(detail.shipping.shippingDate), "yyyy-MM-dd")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </>
  );
}