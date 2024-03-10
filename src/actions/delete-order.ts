"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { z } from "zod";

const DeleteOrderSchema = z.number({ required_error: "IDは必須です。" });
type DeleteOrderProps = z.infer<typeof DeleteOrderSchema>;

export async function deleteOrder(id: DeleteOrderProps): Promise<{ errors: { _form?: string[]; } | {}; } | undefined> {

  const result = DeleteOrderSchema.safeParse(id);

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

  try {
    await db.order.delete({
      where: {
        id
      }
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      };
    } else {
      return {
        errors: {
          _form: ["削除に失敗しました"]
        }
      };
    }
  }

  revalidatePath(paths.orderAll());
}