"use server"

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProduct = async (id: number) => {
    await db.product.delete({
      where: { id },
    });
    revalidatePath(`/product-masters`);
    redirect(`/product-masters`);
  };