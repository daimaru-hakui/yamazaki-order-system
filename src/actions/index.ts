"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/components/product-masters/product-form";
import { Product, Sku } from "@prisma/client";
import { ProductAddSkuSchema } from "@/components/product-masters/product-edit-sku-add-modal";

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

export const deleteProduct = async (id: number) => {
  await db.product.delete({
    where: { id },
  });
  revalidatePath(`/product-masters`);
  redirect(`/product-masters`);
};

export const createSku = async (id: number, data: ProductAddSkuSchema) => {
  db.$transaction(async (prisma) => {
    const sku = await prisma.sku.findFirst({
      where: {
        productId: Number(id),
        sizeId: Number(data.sizeId),
      },
    });

    if (!sku) {
      await prisma.sku.create({
        data: {
          productId: id,
          janCode: data.janCode,
          productCode: data.productCode,
          price: data.price,
          sizeId: Number(data.sizeId),
          displayOrder: Number(data.sizeId),
        },
      });
    }
  });

  revalidatePath(`/product-masters/${id}/edit`);
};

export const updateSku = async (data: Sku) => {
  await db.sku.update({
    where: {
      id: data.id,
    },
    data: {
      janCode: data.janCode,
      productCode: data.productCode,
      price: data.price,
    },
  });
  revalidatePath(`/product-masters/${data.productId}/edit`);
};
