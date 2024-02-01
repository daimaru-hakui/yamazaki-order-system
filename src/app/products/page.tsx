import ProductList from "@/components/products/product-list";
import { db } from "@/db";

export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
      color: true,
    },
    orderBy: {
      productName: "asc",
    },
  });

  if (!products) {
  }

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <ProductList products={products} />
    </div>
  );
}
