"use client";
import paths from "@/paths";
import { useStore } from "@/store";
import type { CustomerProduct, Product, Sku } from "@prisma/client";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OrderProductModal from "./order-product-modal";
import { Chip } from "@nextui-org/react";
import OrderConfirmButtonArea from "./order-confirm-button-area";
import TitleReturn from "../common/title-return";

export type Inputs = {
  customer: string;
  items: {
    skuId: string;
    quantity: number;
  }[];
};

interface OrderProductListProps {
  customerId: string;
  customerName: string | undefined;
  customerProducts:
    | (CustomerProduct & {
        product: Product & {
          color: { name: string };
          skus: (Sku & {
            size: { name: string };
            product: {
              id: string;
              productNumber: string;
              productName: string;
            };
          })[];
        };
      })[]
    | undefined;
}

export default function OrderProductList({
  customerId,
  customerName,
  customerProducts,
}: OrderProductListProps) {
  const cart = useStore((state) => state.cart);

  const cartArea = (productId: string) => {
    const newCart = cart
      .filter((item) => item.productId === productId)
      .sort((a: { displayOrder: number }, b: { displayOrder: number }) => {
        return a.displayOrder - b.displayOrder;
      });

    return newCart.map((item) => (
      <Chip key={item.skuId} variant="bordered">
        {item.size}/{item.quantity}
      </Chip>
    ));
  };

  return (
    <>
      <TitleReturn title="数量入力" path={paths.orderCreate()} />
      <div className="mt-6 text-2xl">{customerName}</div>
      <form className="grid grid-cols-2 gap-6 mt-3">
        {customerProducts?.map((cp) => (
          <div key={cp.id} className="p-3 rounded-xl bg-white shadow-md">
            <div className="flex flex-col">
              <div className="flex justify-between items-start gap-5">
                <div>
                  <div>{cp.product.productNumber}</div>
                  <div className="flex gap-3">
                    <div>{cp.product.productName}</div>
                    <span>{cp.product.color.name}</span>
                  </div>
                </div>
                <OrderProductModal skus={cp.product.skus} />
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {cartArea(cp.product.id)}
              </div>
            </div>
          </div>
        ))}
      </form>
      <OrderConfirmButtonArea
        customer={{
          customerId,
          customerName,
        }}
      />
    </>
  );
}
