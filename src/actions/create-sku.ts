"use server";
import { db } from "@/db";
import paths from "@/paths";
import { Sku } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateSkuSchema = z.object({
  janCode: z.string(),
  productCode: z.string(),
  sizeId: z.string(),
  price: z
    .number({
      required_error: "数値を入力してください",
      invalid_type_error: "数値を入力してください",
    })
    .min(1, { message: "金額を入力してください" }),
});

type CreateSkuFormState = z.infer<typeof CreateSkuSchema>;

export async function createSku(productId: string, data: CreateSkuFormState) {
  const result = CreateSkuSchema.safeParse({
    janCode: data.janCode,
    productCode: data.productCode,
    sizeId: data.sizeId,
    price: data.price,
  });

  if (!result.success) {
    return {
      errors: { _form: [result.error.flatten().fieldErrors] },
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
      sizeId: result.data.sizeId,
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
        sizeId: result.data.sizeId,
        price: result.data.price,
        displayOrder: 0,
      },
    });
  } catch {
    (err: unknown) => {
      console.log("error");
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
