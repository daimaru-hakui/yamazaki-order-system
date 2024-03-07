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
import { useEffect, useState } from "react";
import {AiFillDelete } from "react-icons/ai";
import OrderRegisterButtonArea from "./order-create-register-button";
import OrderConfirmQuantityInput from "./order-create-quantiy-input";
import OrderCreateOption from "./order-create-option";
import TitleReturn from "../common/title-return";

export default function OrderCreateConfirmList() {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const orderOptions = useStore((state) => state.orderOptions);

  const [sum, setSum] = useState(0);
  const [sortCart, setSortCart] = useState<Cart[]>([]);

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
    <div className="w-full mb-24">
      <TitleReturn
        title="明細確認"
        path={paths.orderProductCreate(orderOptions.customer.id)}
      />
      <div className="mt-6 text-2xl">{orderOptions.customer.name}</div>
      <Table
        layout="auto"
        fullWidth
        className="mt-3"
        aria-label="order cart table"
      >
        <TableHeader className="">
          <TableColumn className="text-center min-w-[calc(100px)]">
            品番
          </TableColumn>
          <TableColumn className="text-center min-w-[calc(200px)]">
            品名
          </TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center min-w-[calc(100px)]">
            価格
          </TableColumn>
          <TableColumn className="text-center min-w-[calc(100px)]">
            数量
          </TableColumn>
          <TableColumn className="text-center min-w-[calc(100px)]">
            合計
          </TableColumn>
          <TableColumn className="text-center min-w-[calc(100px)]">
            削除
          </TableColumn>
        </TableHeader>
        <TableBody>
          {sortCart.map((item) => (
            <TableRow key={item.skuId}>
              <TableCell>{item.productNumber}</TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell className="text-center">{item.size}</TableCell>
              <TableCell className="text-right">
                {item.price.toLocaleString()}円
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
        <OrderCreateOption />
      </div>

      <OrderRegisterButtonArea />
    </div>
  );
}
