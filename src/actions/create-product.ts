"use server";
import { db } from "@/db";
import paths from "@/paths";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string(),
  categoryId: z.string({ required_error: "カテゴリーを選択してください" }),
  colorId: z.string({ required_error: "カラーを選択してください" }),
  description: z.string(),
  items: z
    .array(
      z.object({
        janCode: z.string(),
        productCode: z.string(),
        sizeId: z.string({ required_error: "サイズを選択してください" }),
        price: z.number(),
      })
    )
    .optional(),
});

export type CreateProductSchema = z.infer<typeof schema>;

export async function createProduct(data: CreateProductSchema) {
  const productNumber = data.productNumber;
  const productName = data.productName;
  const categoryId = data.categoryId;
  const colorId = data.colorId;
  const items = data.items;

  console.log(data)

  const isExists = await db.product.findFirst({
    where: {
      productNumber: data.productNumber,
      colorId: colorId,
    },
  });
  if (isExists) {
    return {
      errors: {
        _form: ["すでに登録済みです。"],
      },
    };
  }

  let product: Product;
  await db
    .$transaction(async (prisma) => {
      product = await prisma.product.create({
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
        console.log(sku)
        if (!sku) {
          await prisma.sku.create({
            data: {
              sizeId: item.sizeId,
              productId: product.id,
              price: item.price,
              janCode: item.janCode,
              productCode:item.productCode,
              displayOrder: 0,
            },
          });
        }
      }
      return product;
    })
    .catch((err) => {
      console.error(err);
      return { message: "失敗" };
    })
    .finally(() => {
      revalidatePath(paths.productShow(product?.id));
      redirect(paths.productShow(product?.id));
    });
}
