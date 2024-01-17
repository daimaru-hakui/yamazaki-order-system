"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Schema } from "@/components/product-masters/product-form";

export const createProduct = async (data: Schema) => {
  const productNumber = data.productNumber;
  const productName = data.productName;
  const categoryId = data.categoryId;
  const items = data.items;

  const result = await db.$transaction(async (prisma) => {
    const product = await prisma.product.create({
      data: {
        productNumber,
        productName,
        categoryId: categoryId,
      },
    });
    for await (const item of items) {
      const sku = await prisma.sku.findUnique({
        where: {
          skuIdentifier: {
            colorId: item.colorId,
            sizeId: item.sizeId,
            productId: product.id,
          },
        },
      });
      if (!sku) {
        await prisma.sku.create({
          data: {
            colorId: item.colorId,
            sizeId: item.sizeId,
            price: item.price,
            productId: product.id,
          },
        });
      }
    }
    return { message: "OK" };
  });
  await db.$disconnect();
  console.log(result);
  revalidatePath(`/product-masters`);
  redirect(`/product-masters`);
};
