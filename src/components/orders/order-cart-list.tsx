"use client";
import paths from "@/paths";
import { Cart, useStore } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OrderConfButtonArea from "./order-conf-button-area";

export default function OrderCartList() {
  const cart = useStore((state) => state.cart);
  const [sum, setSum] = useState(0);
  const [sortCart, setSortCart] = useState<Cart[]>([]);
  const serchParams = useSearchParams();
  const customerId = serchParams.get("customerId");
  const customerName = serchParams.get("customerName");

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSum(total);
  }, [cart]);

  useEffect(() => {
    const newCart = cart
      .sort((a: { displayOrder: number }, b: { displayOrder: number }) => {
        return a.displayOrder - b.displayOrder;
      })
      .sort((a: { productId: number }, b: { productId: number }) => {
        return a.productId - b.productId;
      });
    setSortCart(newCart);
  }, [cart]);

  return (
    <div>
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.orderProductCreate(Number(customerId))}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft />
          <div className="text-sm">戻る</div>
        </Link>
        <div className="font-bold">明細確認</div>
      </div>
      <div className="mt-6 text-2xl">{customerName}</div>
      <Table className="mt-3" aria-label="order cart table">
        <TableHeader>
          <TableColumn className="text-center">品番</TableColumn>
          <TableColumn className="text-center">品名</TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center">価格</TableColumn>
          <TableColumn className="text-center">数量</TableColumn>
          <TableColumn className="text-center">合計</TableColumn>
        </TableHeader>
        <TableBody>
          {sortCart.map((item) => (
            <TableRow key={item.skuId}>
              <TableCell>{item.productNumber}</TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell className="text-center">{item.size}</TableCell>
              <TableCell className="text-right">
                {item.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {item.quantity.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {(item.quantity * item.price).toLocaleString()}円
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end items-center p-3 mb-12">
        注文金額合計（税抜）:
        <div className="text-2xl">{`￥${sum.toLocaleString()}`}</div>
      </div>
      <OrderConfButtonArea />
    </div>
  );
}