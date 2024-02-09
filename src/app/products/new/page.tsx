import ProductForm from "@/components/products/product-create-form";
import { db } from "@/db";

export default async function ProductMasterCreatePage() {
  const categories = await db.category.findMany();
  const colors = await db.color.findMany();
  const sizes = await db.size.findMany();
  return (
    <div className="w-full max-w-[calc(600px)] mx-auto ">
      <ProductForm categories={categories} colors={colors} sizes={sizes}/>
    </div>
  );
}
