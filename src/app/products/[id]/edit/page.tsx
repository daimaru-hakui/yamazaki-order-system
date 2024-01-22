import EditProductForm from "@/components/products/product-edit-form";
import SkuCreateModal from "@/components/products/sku-create-form";
import ProductEditTable from "@/components/products/product-edit-sku-table";
import { db } from "@/db";
import paths from "@/paths";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SkuCreateForm from "@/components/products/sku-create-form";

interface ProductMasterShowPage {
  params: { id: string };
}

export default async function ProductMasterEditPage({
  params,
}: ProductMasterShowPage) {
  const id = parseInt(params.id);

  const product = await db.product.findFirst({
    where: { id: id },
  });
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
      <div className="flex flex-col gap-6 p-6 rounded-lg bg-white shadow-md">
        <div className="flex justify-center gap-6 relative">
          <Link
            href={paths.productAll()}
            className="flex items-center gap-3 absolute left-0"
          >
            <AiOutlineArrowLeft className="text-xl" />
            戻る
          </Link>
          <div>編集画面</div>
        </div>
        <EditProductForm
          id={id}
          product={product}
          colors={colors}
          categories={categories}
        />
      </div>
      <ProductEditTable skus={skus} sizes={sizes} />
      <SkuCreateForm productId={id} sizes={sizes} />
    </div>
  );
}
