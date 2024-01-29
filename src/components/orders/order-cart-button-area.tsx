"use client";
import paths from "@/paths";
import { useStore } from "@/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface OrderCartButtonAreaProps {
  customer: {
    customerId: string;
    customerName: string | undefined;
  };
}

export default function OrderCartButtonArea({ customer }: OrderCartButtonAreaProps) {
  const setCart = useStore((state) => state.setCart);
  const handleCartClear = () => {
    const result = confirm("カートを空にして宜しいでしょうか");
    if (!result) return;
    setCart([]);
  };
  return (
    <div className="fixed left-0 bottom-0 flex grid place-items-center p-3 w-full h-16 bg-white drop-shadow-2xl">
      <div className="flex justify-center items-center gap-3 w-full mx-auto px-3">
        <Button color="danger" onClick={handleCartClear}>
          クリア
        </Button>
        <Button color="primary" className="w-full max-w-96 p-0">
          <Link
            href={{
              pathname: paths.cartShow(),
              query: {
                customerId: customer.customerId,
                customerName: customer.customerName,
              },
            }}
            className="grid place-items-center w-full h-full"
          >
            カート確認
          </Link>
        </Button>
      </div>
    </div>
  );
}
