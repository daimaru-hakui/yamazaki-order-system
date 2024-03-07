"use client"
import paths from "@/paths";
import { useStore } from "@/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";

interface OrderCompleateProps {
  orderId: string;
}

export default function OrderCompleate({ orderId }: OrderCompleateProps) {
  const resetCart = useStore((state) => state.resetCart);
  const resetOrderOptions = useStore((state) => state.resetOrderOptions);

  useEffect(() => {
    resetCart();
    resetOrderOptions();
  }, [resetCart, resetOrderOptions]);
  console.log("cart")

  return (
    <div className="p-6 text-center bg-white rounded-xl drop-shadow-md">
      <div className="text-xl text-center">登録完了</div>
      <div className="mt-6">No.{orderId}</div>
      <div className="mt-6">
        <Button color="primary" className="p-0">
          <Link href={paths.orderAll()} className="px-3 w-full">
            発注一覧へ
          </Link>
        </Button>
      </div>
    </div>
  );
}
