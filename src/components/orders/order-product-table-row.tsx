"use client";
import { useStore } from "@/store";
import { Input, TableCell, TableRow } from "@nextui-org/react";
import { Product, Size, Sku } from "@prisma/client";
import { ChangeEvent, useState } from "react";

interface SkuWithSize extends Sku {
  size: Size;
  product: Product;
}

interface OrderProductTableRowInputProps {
  sku: SkuWithSize;
}

export default function OrderProductTableRowInput({
  sku,
}: OrderProductTableRowInputProps) {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const [quantity, setQuantiy] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!sku) return
    const result = cart?.items.find((item) => item.skuId === sku.id);
    if (!result) {
      setCart({
        ...cart,
        items: [
          ...cart.items,
          {
            skuId: sku.id,
            productName: sku.product?.productName,
            productNumber: sku.product?.productNumber,
            quantity: Number(value),
            price: sku?.price,
          },
        ],
      });
    }
    console.log(cart);
  };
  return (
    <Input
      type="number"
      size="sm"
      className="w-[calc(80px)]"
      onChange={(e) => handleChange(e)}
    />
  );
}
