"use client";
import { useStore } from "@/store";
import { Input } from "@nextui-org/react";
import { Product, Size, Sku } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

interface SkuWithSize extends Sku {
  size: Size;
  product: Product;
}

interface OrderProductTableRowInputProps {
  sku: SkuWithSize;
  idx: number;
}

export default function OrderProductTableRowInput({
  sku,
  idx,
}: OrderProductTableRowInputProps) {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const initQuantiry = cart.find((item) => item.skuId === sku.id);
  const [quantity, setQuantity] = useState(initQuantiry?.quantity);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  useEffect(() => {
    const cartExsist = cart?.find((item) => item.skuId === sku.id);

    if (Number(quantity) <= 0 || !quantity) {
      const newCart = cart.filter((item) => item.skuId !== sku.id);
      setCart(newCart);
      return;
    }

    if (!cartExsist) {
      const newCart = [
        ...cart,
        {
          skuId: sku.id,
          productId: sku.productId,
          productName: sku.product?.productName,
          productNumber: sku.product?.productNumber,
          quantity: Number(quantity),
          price: sku?.price,
          size: sku.size.name,
          displayOrder: sku.displayOrder,
        },
      ];
      setCart(newCart);
    } else {
      const newCart = cart.map((item) => {
        if (item.skuId == sku.id) {
          return {
            skuId: sku.id,
            productId: sku.productId,
            productName: sku.product?.productName,
            productNumber: sku.product?.productNumber,
            quantity: Number(quantity),
            price: sku?.price,
            size: sku.size.name,
            displayOrder: sku.displayOrder,
          };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  console.log(cart);

  return (
    <Input
      type="number"
      size="sm"
      className="w-[calc(80px)]"
      value={String(quantity)}
      onChange={handleChange}
    />
  );
}
