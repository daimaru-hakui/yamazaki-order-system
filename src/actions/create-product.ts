"use server"
import { db } from "@/db";
import paths from "@/paths";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string(),
  categoryId: z.number().min(1, { message: "カテゴリーを選択してください" }),
  colorId: z.number().min(1, { message: "カラーを選択してください" }),
  description: z.string(),
  items: z.array(
    z.object({
      janCode: z.string(),
      productCode: z.string(),
      sizeId: z.number().min(1),
      price: z.number(),
    })
  ),
});

export type CreateProductSchema = z.infer<typeof schema>;

export async function createProduct(data: CreateProductSchema) {
  const productNumber = data.productNumber;
  const productName = data.productName;
  const categoryId = data.categoryId;
  const colorId = data.colorId;
  const items = data.items;

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
        return product;
      }
    })
    .catch((err) => {
      console.error(err);
      return { message: "失敗" };
    }).finally(()=>{
        revalidatePath(paths.productShow(product?.id));
        redirect(paths.productShow(product.id));
      }
    )
}

  

