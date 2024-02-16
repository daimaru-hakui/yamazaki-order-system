'use server';
import { db } from '@/db';
import paths from '@/paths';
import { Customer } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreateCustomerSchema = z.object({
  ediCode: z.string().nullable(),
  code: z.string(),
  name: z
    .string({ required_error: "名前は必須です" })
    .min(3, { message: "3文字以上の入力をお願いします" }),
  address: z.string().nullish(),
  tel: z.string().nullish()
});

interface CreateCustomerFormState {
  errors: {
    ediCode?: string[];
    code?: string[];
    name?: string[];
    address?: string[];
    tel?: string[];
    _form?: string[];
  };
}
export async function createCustomer(
  formState: CreateCustomerFormState,
  formData: FormData
): Promise<CreateCustomerFormState> {

  const result = CreateCustomerSchema.safeParse({
    ediCode: formData.get("ediCode"),
    code: formData.get('code'),
    name: formData.get('name'),
    address: formData.get('address'),
    tel: formData.get('tel')
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
        ediCode: result.data.ediCode
          && (new Array(8).join("0") + result.data.ediCode?.trim()).slice(-8),
        code: result.data.code.trim(),
        name: result.data.name.trim(),
        address: result.data.address?.trim(),
        tel: result.data.tel?.trim()
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