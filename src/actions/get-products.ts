"use server";
import { db } from "@/db";

export const getProducts = async (customer: { id: string; name: string }) => {
  const customerProducts = await db.customerProduct.findMany({
    where: {
      customerId: customer.id,
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
              id: true,
              productId: true,
              productCode: true,
              janCode: true,
              price: true,
              size: {
                select: {
                  name: true,
                },
              },
              displayOrder: true,
            },
          },
        },
      },
    },
  });
  console.log(customerProducts);
  return customerProducts;
};
