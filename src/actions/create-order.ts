"use server";
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
      memo: z.string().optional(),
    })
  ),
});

type CreateOrderSchemaState = z.infer<typeof CreateOrderSchema>;

interface CreateOrderFormState {
  errors?: {
    orderNumber?: string[];
    customerId?: string[];
    useId?: string[];
    comment?: string[];
    items?: string[];
    _form?: string[];
  };
}

export async function createOrder(
  data: {
    cart: Cart[];
    orderOption: OrderOption;
  },
  formState: CreateOrderFormState
): Promise<CreateOrderFormState> {
  const result = CreateOrderSchema.safeParse({
    orderNumber: data.orderOption.orderNumber,
    customerId: data.orderOption.customerId,
    userId: data.orderOption.userId,
    comment: data.orderOption.comment,
    items: data.cart,
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
        _form: ["ログインしてください"],
      },
    };
  }

  let order: Order;
  try {
    order = await db.order.create({
      data: {
        orderNumber: result.data.orderNumber,
        customerId: result.data.customerId,
        userId: result.data.userId,
        comment: result.data.comment,
        orderDetail: {
          create: [...result.data.items],
        },
      },
    });
    if (!order) {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
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
  }

  revalidatePath(paths.orderAll());
  redirect(paths.orderCompleate(String(order.id)));
}
