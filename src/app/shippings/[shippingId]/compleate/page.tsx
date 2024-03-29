import ShippingCompleate from "@/components/shippings/shipping-compleate";
import { db } from "@/db";
import React from "react";

interface ShippingCompleatePageProps {
  params: {
    shippingId: number;
  };
}

export default async function ShippingCompleatePage({
  params,
}: ShippingCompleatePageProps) {
  const shippingId = Number(params.shippingId);

  const shipping = await db.shipping.findFirst({
    where: {
      id: shippingId,
    },
    select: {
      id: true,
      orderId: true,
      shippingDate: true,
      shippingDetail: {
        select: {
          price: true,
          quantity: true,
          orderDetail: {
            select: {
              productCode: true,
              productNumber: true,
              productName: true,
              size: true,
              color: true,
            },
          },
        },
      },
    },
  });

  if (!shipping) {
    return (
      <div className="w-full max-w-[calc(600px)] mx-auto p-6">
        見つかりません
      </div>
    );
  }

  return (
    <div className="w-full max-w-[calc(600px)] mx-auto p-6">
      <ShippingCompleate shipping={shipping} />
    </div>
  );
}
