import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import paths from "@/paths";

interface ShippingCompleateProps {
  shipping: {
    id: number;
    orderId: number;
    shippingDate: Date;
    shippingDetail: {
      price: number;
      quantity: number;
      orderDetail: {
        productCode: string | null;
        productNumber: string | null;
        productName: string | null;
        color: string | null;
        size: string | null;
      };
    }[];
  };
}

export default function ShippingCompleate({
  shipping,
}: ShippingCompleateProps) {
  return (
    <div className="p-6 text-center bg-white rounded-xl drop-shadow-md">
      <div className="text-xl text-center">出荷完了</div>
      <div className="mt-6">No.{shipping.id}</div>
      <div className="mt-6">
        <Button color="primary" className="p-0">
          <Link href={paths.shippingAll()} className="px-3 w-full">
            出荷一覧へ
          </Link>
        </Button>
      </div>
    </div>
  );
}
