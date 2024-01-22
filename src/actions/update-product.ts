"use server"

import { db } from "@/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateProduct = async (id: number, data: Product) => {
    const productNumber = data.productNumber;
    const productName = data.productName;
    const categoryId = Number(data.categoryId);
    const colorId = Number(data.colorId);
    const description = data.description;
    const product = await db.product.update({
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
    revalidatePath(`/product-masters`);
    return product;
  };
  