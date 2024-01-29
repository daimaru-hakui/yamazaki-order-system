"use server";

import { db } from "@/db";
import paths from "@/paths";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateProduct = async (id: string, data: Product) => {
  const productNumber = data.productNumber;
  const productName = data.productName;
  const categoryId = data.categoryId;
  const colorId = data.colorId;
  const description = data.description;

  let product: Product;
  try {
    product = await db.product.update({
      where: {
        id,
      },
      data: {
        productNumber,
        productName,
        categoryId,
        colorId,
        description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message
      // return {
      //   errors: {
      //     _form: [err],
      //   },
      // };
    } else {
      return "更新に失敗しました"
      // return {
      //   errors: {
      //     _form: ["更新が失敗しました"],
      //   },
      // };
    }
  }

  revalidatePath(paths.productEdit(product.id));
  redirect(paths.productEdit(product.id));
};
