"use server";
import { db } from "@/db";

interface CsvCreateCustomerProps {
  ediCode: string;
  code: string;
  name: string;
  address: string;
  tel: string;
}

export async function csvCreateCustomer(
  data: CsvCreateCustomerProps[],
  formData: any
) {
  try {
    for await (const item of data) {
      await db.customer.upsert({
        where: {
          code: item.code,
        },
        update: {
          ...item,
        },
        create: {
          ...item,
          ediCode: ("000" + item.ediCode).slice(-8),
        },
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("失敗しました");
    }
  }
}
