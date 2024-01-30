'use client';
import { Input } from "@nextui-org/react";

interface OrderConfirmQuantityInputProps {
  skuId: string;
  quantity: number;
  updateQuantity: (skuId: string, defaultValue: number) => void;
}

export default function OrderCartQuantityInput({
  skuId,
  quantity,
  updateQuantity
}: OrderConfirmQuantityInputProps) {

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