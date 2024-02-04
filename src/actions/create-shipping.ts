"use server";

import { db } from "@/db";
import paths from "@/paths";
import { Shipping } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateShippingSchema = z.object({
  orderId: z.number({ required_error: "IDは必須です。" }),
  userId: z.string(),
  orderDetails: z.array(z.object({
    skuId: z.string(),
    quantity: z.number(),
    price: z.number()
  }))
});

type CreateShippingProps = z.infer<typeof CreateShippingSchema>;

interface CreateShippingFormState {
  errors: {
    orderId?: string[];
    userId?: string[];
    orderDetails?: string[];
    _form?: string[];
  };
}

export async function createShipping(data: CreateShippingProps): Promise<CreateShippingFormState> {
  const result = CreateShippingSchema.safeParse({
    orderId: data.orderId,
    userId: data.userId,
    orderDetails: data.orderDetails
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }

  const session = await getServerSession();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["ログインしてください"]
      }
    };
  }

  let shipping: Shipping;
  try {
    shipping = await db.shipping.create({
      data: {
        orderId: result.data.orderId,
        userId: result.data.userId,
        shippingDetail: {
          create: [...result.data.orderDetails]
        }
      }
    });
    if (!shipping) {
      throw new Error;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      return {
        errors: {
          _form: [err.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ["登録に失敗しました"]
        }
      };
    }
  }

  revalidatePath(paths.orderAll());
  redirect(paths.orderAll());

}