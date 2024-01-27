'use client';
import { useStore } from "@/store";
import { Input } from "@nextui-org/react";
import { useState } from "react";

interface OrderCartQuantityInputProps {
  skuId: number;
  quantity: number;
  updateQuantity: (skuId: number, defaultValue: number) => void;
}

export default function OrderCartQuantityInput({
  skuId,
  quantity,
  updateQuantity
}: OrderCartQuantityInputProps) {

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateQuantity(skuId, value);
  };

  return (
    <Input
      type="number"
      size="sm"
      className="w-20"
      onKeyDown={() => (0)}
      defaultValue={String(quantity)}
      onChange={handleChangeQuantity}
    />
  );
}