"use client";
import { useStore } from "@/store";
import { Button } from "@nextui-org/react";

interface OrderCartButtonAreaProps {
  customer: {
    customerId: string;
    customerName: string | undefined;
  };
}

export default function OrderConfButtonArea() {
  const setCart = useStore((state) => state.setCart);
  const handleCartClear = () => {
    const result = confirm("カートを空にして宜しいでしょうか");
    if (!result) return;
    setCart([]);
  };
  return (
    <div className="fixed left-0 bottom-0 flex justify-center items-center p-3 w-full h-[calc(70px)] bg-white shadow-2xl">
      <div className="flex justify-center items-center gap-3 w-full mx-auto px-3">
        <Button color="primary" className="w-full max-w-96 p-0">
          登録
        </Button>
      </div>
    </div>
  );
}
