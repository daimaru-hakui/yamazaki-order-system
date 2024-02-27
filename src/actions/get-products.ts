"use server";
import { db } from "@/db";

export const getProducts = async (id: string) => {
  const customerProducts = await db.customerProduct.findMany({
    where: {
      customerId: id,
    },
    include: {
      product: {
        select: {
          id: true,
          productNumber: true,
          productName: true,
          color: {
            select: {
              name: true,
            },
          },
          skus: {
            select: {
              janCode: true,
              productCode: true,
              size: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  console.log(customerProducts);
  return customerProducts;
};
