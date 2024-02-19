"use server"

import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteProduct = async (id: string) => {
    await db.product.delete({
      where: { id },
    });
    revalidatePath(paths.productAll());
    redirect(paths.productAll());
  };