import ProductForm from "@/components/products/product-create-form";
import { db } from "@/db";

export default async function ProductMasterCreatePage() {
  const categories = await db.category.findMany();
  const colors = await db.color.findMany();
  const sizes = await db.size.findMany();
  return (
    <div className="p-6 border rounded bg-white">
      <div className="text-xl font-bold">商品マスター登録</div>
      <ProductForm categories={categories} colors={colors} sizes={sizes}/>
    </div>
  );
}