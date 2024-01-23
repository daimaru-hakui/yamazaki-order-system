"use server";

import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCustomerProduct(
  customerId: number,
  productId: number
) {
  try {
    const customerProduct = await db.customerProduct.findFirst({
      where: {
        customerId: Number(customerId),
        productId: Number(productId),
      },
    });
    if (!customerProduct) {
      await db.customerProduct.create({
        data: {
          customerId: Number(customerId),
          productId: Number(productId),
        },
      });
    } else {
      await db.customerProduct.delete({
        where: {
          id: customerProduct.id,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return;
    } else {
      return;
    }
  }
  revalidatePath(paths.customerEdit(customerId));
  redirect(paths.customerEdit(customerId));
}
