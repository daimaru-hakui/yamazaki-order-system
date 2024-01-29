"use server";

import { db } from "@/db";
import { Sku } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateSku = async (data: Sku) => {
  await db.sku.update({
    where: {
      id: data.id,
    },
    data: {
      janCode: data.janCode,
      productCode: data.productCode,
      price: data.price,
      displayOrder: data.displayOrder,
    },
  });
  revalidatePath(`/products/${data.productId}/edit`);
};
