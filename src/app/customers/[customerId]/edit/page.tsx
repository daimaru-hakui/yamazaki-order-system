import CustomerEditProductList from "@/components/customers/customer-edit-product-list";
import { db } from "@/db";
import { CustomerProduct, Product } from "@prisma/client";

interface CustomerEditPageProps {
  params: {
    customerId: string;
  };
}

export default async function CustomerEditPage({
  params,
}: CustomerEditPageProps) {
  const customerId = params.customerId;
  const products = await db.product.findMany({
    include: {
      color: {
        select: {
          name: true,
        },
      },
      customerProduct: {
        where: {
          customerId: customerId,
        },
      },
    },
  });
  const filterProducts = products.map((product) => {
    const isProduct = product.customerProduct.find(
      (cp: CustomerProduct) => cp.productId === product.id
    );
    return { ...product, isProduct };
  });

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <CustomerEditProductList
        products={filterProducts}
        customerId={customerId}
      />
    </div>
  );
}
