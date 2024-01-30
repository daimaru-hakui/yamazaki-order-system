'use server';
import { db } from '@/db';
import paths from '@/paths';
import { Customer } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreateCustomerSchema = z.object({
  code: z.number(),
  name: z
    .string({ required_error: "名前は必須です" })
    .min(3, { message: "3文字以上の入力をお願いします" }),
  address: z.string().nullish(),
  tel: z.string().nullish()
});

interface CreateCustomerFormState {
  errors: {
    code?: string[];
    name?: string[];
    _form?: string[];
  };
}
export async function createCustomer(
  formState: CreateCustomerFormState,
  formData: FormData
): Promise<CreateCustomerFormState> {

  const result = CreateCustomerSchema.safeParse({
    name: formData.get('name')
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

  let customer: Customer;
  try {
    customer = await db.customer.create({
      data: {
        code: result.data.code,
        name: result.data.name,
        address: result.data.address,
        tel: result.data.tel
      }
    });
  } catch (err) {
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
    }
  }

  revalidatePath(paths.customerAll());
  redirect(paths.customerAll());
}