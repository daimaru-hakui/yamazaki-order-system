'use server';
import { db } from "@/db";
import paths from "@/paths";
import { Cart, OrderOption } from "@/store";
import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateOrderSchema = z.object({
  orderNumber: z.string().optional(),
  customerId: z.string(),
  userId: z.string(),
  comment: z.string().optional(),
  items: z.array(
    z.object({
      skuId: z.string(),
      price: z.number().min(1),
      quantity: z.number().min(1),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      memo: z.string().optional()
    })
  )
});

type CreateOrderSchemaState = z.infer<typeof CreateOrderSchema>;

interface CreateOrderFormState {
  errors?: {
    orderNumber?: string[],
    customerId?: string[];
    useId?: string[];
    comment?: string[];
    items?: string[];
    _form?: string[];
  };
};


export async function createOrder(
  data: {
    cart: Cart[],
    orderOption: OrderOption;
  },
  formState: CreateOrderFormState
): Promise<CreateOrderFormState> {

  const result = CreateOrderSchema.safeParse({
    orderNumber: data.orderOption.orderNumber,
    customerId: data.orderOption.customerId,
    userId: data.orderOption.userId,
    comment: data.orderOption.comment,
    items: data.cart
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
  let order: Order;
  await db.$transaction(async (prisma) => {
    order = await prisma.order.create({
      data: {
        orderNumber: result.data.orderNumber,
        customerId: result.data.customerId,
        userId: result.data.userId,
        comment: result.data.comment
      }
    });
    const details = result.data.items;
    await Promise.all(
      details.map(async (detail) => (
        await prisma.orderDetail.create({
          data: {
            orderId: order.id,
            skuId: detail.skuId,
            price: detail.price,
            quantity: detail.quantity,
            firstName: detail.firstName,
            lastName: detail.lastName,
            memo: detail.memo
          },
        })
      ))
    );
  }).catch((err) => {
    if (err instanceof Error) {
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
    };
  }).finally(() => {

  });
  revalidatePath(paths.orderAll());
  redirect(paths.orderAll());

}