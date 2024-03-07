'use client';
import { Input } from "@nextui-org/react";

interface OrderCreateQuantityInputProps {
  skuId: string;
  quantity: number;
  updateQuantity: (skuId: string, defaultValue: number) => void;
}

export default function OrderCreateQuantityInput({
  skuId,
  quantity,
  updateQuantity
}: OrderCreateQuantityInputProps) {

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
      value={String(quantity)}
      onChange={handleChangeQuantity}
    />
  );
}