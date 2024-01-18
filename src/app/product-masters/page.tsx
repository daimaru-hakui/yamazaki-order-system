import ProductListTable from "@/components/product-masters/product-list-table";
import { db } from "@/db";

export default async function ProductMastersPage() {
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
      <ProductListTable products={products} />
    </div>
  );
}
