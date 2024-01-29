import ProductEditForm from "@/components/products/product-edit-form";
import ProductEditTable from "@/components/products/sku-edit-list";
import { db } from "@/db";
import paths from "@/paths";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SkuAddForm from "@/components/products/sku-add-form";

interface ProductEditPageProps {
  params: { id: string };
}

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const id = params.id;

  const product = await db.product.findFirst({
    where: { id: id },
  });
  if(!product) return
  const colors = await db.color.findMany();
  const categories = await db.category.findMany();
  const sizes = await db.size.findMany();

  const skus = await db.sku.findMany({
    where: {
      productId: id,
    },
    include: {
      product: {
        include: {
          category: true,
          color: true,
        },
      },
      size: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.productAll()}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft className="text-xl" />
          戻る
        </Link>
        <div className="font-bold">編集画面</div>
      </div>
      <div className="flex flex-col gap-6 mt-3 p-6 rounded-xl bg-white shadow-md">
        <ProductEditForm
          id={id}
          product={product}
          colors={colors}
          categories={categories}
        />
      </div>
      <ProductEditTable skus={skus} sizes={sizes} />
      <SkuAddForm productId={id} sizes={sizes} />
    </div>
  );
}
