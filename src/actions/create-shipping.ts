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
  shippingDate: z.date(),
  orderDetails: z.array(
    z.object({
      id: z.number(),
      skuId: z.string(),
      quantity: z.number(),
      currentQuantity: z.number(),
      price: z.number(),
    })
  ),
});

type CreateShippingProps = z.infer<typeof CreateShippingSchema>;

interface CreateShippingFormState {
  errors: {
    orderId?: string[];
    userId?: string[];
    shippingDate?: string[];
    orderDetails?: string[];
    _form?: string[];
  };
}

export async function createShipping(
  data: CreateShippingProps
): Promise<CreateShippingFormState | undefined> {
  const result = CreateShippingSchema.safeParse({
    orderId: data.orderId,
    userId: data.userId,
    shippingDate: new Date(data.shippingDate),
    orderDetails: data.orderDetails,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let sum = 0;
  result.data.orderDetails.forEach((detail) => {
    sum += detail.quantity;
  });

  if (sum === 0 || !sum) {
    return {
      errors: {
        _form: ["数値を入力してください"],
      },
    };
  }

  const session = await getServerSession();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["ログインしてください"],
      },
    };
  }

  const orderDetails = result.data.orderDetails.map((detail) => ({
    orderDetailId: detail.id,
    skuId: detail.skuId,
    quantity: detail.quantity,
    price: detail.price,
  }));

  let shipping: Shipping;
  await db
    .$transaction(async (prisma) => {
      shipping = await prisma.shipping.create({
        data: {
          orderId: result.data.orderId,
          userId: result.data.userId,
          shippingDate: result.data.shippingDate,
          shippingDetail: {
            create: [...orderDetails],
          },
        },
      });
      if (!shipping) {
        throw new Error();
      }

      for await (const order of result.data.orderDetails) {
        await prisma.orderDetail.update({
          where: {
            id: order.id,
          },
          data: {
            quantity: order.currentQuantity - order.quantity,
          },
        });
      }
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(err);
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
    })
    .finally(() => {
      revalidatePath(paths.orderAll());
      console.log(shipping);
      redirect(paths.shippingCompleate(String(shipping.id)));
    });
}
