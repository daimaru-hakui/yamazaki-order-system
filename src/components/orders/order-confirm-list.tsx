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
import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
import OrderRegisterButtonArea from "./order-register-button-area";
import OrderConfirmQuantityInput from "./order-confirm-quantiy-input";
import OrderOption from "./order-option";
import TitleReturn from "../common/title-return";

export default function OrderConfirmList() {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const [sum, setSum] = useState(0);
  const [sortCart, setSortCart] = useState<Cart[]>([]);
  const serchParams = useSearchParams();
  const customerId = serchParams.get("customerId") as string;
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
      .sort(
        (a: { displayOrder: number }, b: { displayOrder: number }) =>
          a.displayOrder - b.displayOrder
      )
      .sort(
        (a: { productId: any }, b: { productId: any }) =>
          a.productId - b.productId
      );
    setSortCart(newCart);
  }, [cart]);

  const handleClickDelete = (skuId: string) => {
    if (!skuId) return;
    const newCart = cart.filter((item) => item.skuId !== skuId);
    setCart(newCart);
  };

  const updateQuantity = (skuId: string, quantity: number) => {
    const newCart = cart.map((item) => {
      if (item.skuId === skuId) {
        return {
          ...item,
          quantity,
        };
      } else {
        return item;
      }
    });
    console.log(newCart);
    setCart(newCart);
  };

  return (
    <div>
      <TitleReturn title="明細確認" path={paths.orderProductCreate(customerId)} />
      <div className="mt-6 text-2xl">{customerName}</div>
      <Table className="mt-3" aria-label="order cart table">
        <TableHeader>
          <TableColumn className="text-center">品番</TableColumn>
          <TableColumn className="text-center">品名</TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center">価格</TableColumn>
          <TableColumn className="text-center">数量</TableColumn>
          <TableColumn className="text-center">合計</TableColumn>
          <TableColumn className="text-center">削除</TableColumn>
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
                <OrderConfirmQuantityInput
                  skuId={item.skuId}
                  quantity={item.quantity}
                  updateQuantity={updateQuantity}
                />
              </TableCell>
              <TableCell className="text-right">
                {(item.quantity * item.price).toLocaleString()}円
              </TableCell>
              <TableCell className="text-center">
                <AiFillDelete
                  className="mx-auto text-lg cursor-pointer"
                  onClick={() => handleClickDelete(item.skuId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end items-center p-3">
        注文金額合計（税抜）:
        <div className="text-2xl">{`￥${sum.toLocaleString()}`}</div>
      </div>
      <div className="mt-6 mb-16">
        <OrderOption customerId={customerId} />
      </div>

      <OrderRegisterButtonArea />
    </div>
  );
}
