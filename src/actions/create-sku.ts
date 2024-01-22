"use server";
import {
  CreateSkuFormState,
  CreateSkuSchema,
} from "@/components/products/sku-create-form";
import { db } from "@/db";
import paths from "@/paths";
import { Sku } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSku(productId: number, data: CreateSkuFormState) {
  const result = CreateSkuSchema.safeParse({
    janCode: data.janCode,
    productCode: data.productCode,
    sizeId: data.sizeId,
    price: data.price,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await getServerSession();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["ログインが必要です"],
      },
    };
  }

  const registered = await db.sku.findFirst({
    where: {
      productId: productId,
      sizeId: Number(result.data.sizeId),
    },
  });

  if (registered) {
    return {
      errors: {
        _form: ["すでに登録済みです"],
      },
    };
  }
  let sku: Sku;
  try {
    sku = await db.sku.create({
      data: {
        productId: productId,
        janCode: result.data.janCode,
        productCode: result.data.productCode,
        sizeId: Number(result.data.sizeId),
        price: Number(result.data.price),
        displayOrder: Number(result.data.sizeId),
      },
    });
  } catch {
    (err: unknown) => {
      if (err instanceof Error) {
        return {
          errors: {
            _form: [err.message],
          },
        };
      } else {
        return {
          errors: {
            _form: ["登録に失敗しました"],
          },
        };
      }
    };
  }

  revalidatePath(paths.productEdit(productId));
  redirect(paths.productEdit(productId));
}