"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/components/product-masters/product-form";

export const createProduct = async (data: ProductSchema) => {
  const productNumber = data.productNumber;
  const productName = data.productName;
  const categoryId = data.categoryId;
  const colorId = data.colorId;
  const items = data.items;

  const result = await db
    .$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: {
          productNumber,
          productName,
          categoryId: categoryId,
          colorId: colorId,
        },
      });
      if (!items) return;
      for await (const item of items) {
        const sku = await prisma.sku.findUnique({
          where: {
            skuIdentifier: {
              sizeId: item.sizeId,
              productId: product.id,
            },
          },
        });
        if (!sku) {
          await prisma.sku.create({
            data: {
              sizeId: item.sizeId,
              price: item.price,
              productId: product.id,
              janCode: item.janCode,
            },
          });
        }
      }
      return { message: "OK" };
    })
    .catch((err) => {
      console.error(err);
      return { message: "失敗" };
    });
  await db.$disconnect();
  console.log(result);
  revalidatePath(`/product-masters`);
  redirect(`/product-masters`);
};

export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: { id },
  });
  revalidatePath(`/product-masters`);
  redirect(`/product-masters`);
};
