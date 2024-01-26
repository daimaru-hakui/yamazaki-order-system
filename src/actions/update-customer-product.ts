"use server";

import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCustomerProduct(
  customerId: number,
  productId: number
) {
  const customerProduct = await db.customerProduct.findFirst({
    where: {
      customerId: customerId,
      productId: productId,
    },
  });
  try {
    if (!customerProduct) {
      await db.customerProduct.create({
        data: {
          customerId: customerId,
          productId: productId,
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
      console.log(err);
      return;
    } else {
      console.log(err);
      return;
    }
  }
  revalidatePath(paths.customerEdit(customerId));
  redirect(paths.customerEdit(customerId));
}
