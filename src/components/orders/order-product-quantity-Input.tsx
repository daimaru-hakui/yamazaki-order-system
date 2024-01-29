"use client";
import { useStore } from "@/store";
import { Input } from "@nextui-org/react";
import { Sku } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

interface OrderProductTableInputProps {
  sku: Sku & {
    size: { name: string; };
    product: {
      id: string,
      productNumber: string,
      productName: string;
    };
  };
}

export default function OrderProductQuantityInput({
  sku,
}: OrderProductTableInputProps) {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const initQuantiry = cart.find((item) => item.skuId === sku.id);
  const [quantity, setQuantity] = useState(initQuantiry?.quantity);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value);
  };

  const focusHandle = (e: any) => {
    e.target.select();
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;
    console.log(key);
  };

  useEffect(() => {
    const cartExists = cart?.find((item) => item.skuId === sku.id);

    if (Number(quantity) <= 0 || !quantity) {
      const newCart = cart.filter((item) => item.skuId !== sku.id);
      setCart(newCart);
      return;
    }

    if (!cartExists) {
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
      className="w-20"
      value={String(quantity)}
      onKeyDown={keyDownHandler}
      onFocus={focusHandle}
      onChange={handleChange}
    />
  );
}
