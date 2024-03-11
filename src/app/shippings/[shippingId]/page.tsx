import ShippingShow from "@/components/shippings/shipping-show";
import { db } from "@/db";
import React from "react";

interface ShippingShowPageProps {
  params: {
    shippingId: number;
  };
}

export default async function ShippingShowPage({
  params,
}: ShippingShowPageProps) {
  const shippingId = params.shippingId;
  const shipping = await db.shipping.findFirst({
    where: {
      id: Number(shippingId),
    },
    select: {
      id: true,
      orderId: true,
      shippingDate: true,
      user: {
        select: {
          name: true,
        },
      },
      order: {
        select: {
          id: true,
          customer: {
            select: {
              name: true,
            },
          },
        },
      },
      shippingDetail: {
        select: {
          id: true,
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
        記事がありません。
      </div>
    );
  }

  return (
    <div className="w-full max-w-[calc(900px)] mx-auto p-6">
      <ShippingShow shipping={shipping} />
    </div>
  );
}
