import ProductEditForm from "@/components/product-masters/product-edit-form";
import ProductShowTable from "@/components/product-masters/product-show-table";
import { db } from "@/db";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface ProductMasterShowPage {
  params: { id: string };
}

export default async function ProductMasterEditPage({
  params,
}: ProductMasterShowPage) {
  const id = parseInt(params.id);

  const product = await db.product.findUnique({
    where: { id: id },
  });
  const colors = await db.color.findMany();
  const categories = await db.category.findMany();
  const defaultValues = {
    productNumber: product?.productNumber,
    productName: product?.productName,
    colorId: product?.colorId,
    categoryId: product?.categoryId,
  };

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
  });

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <div className="flex flex-col gap-6 p-6 rounded-lg bg-white shadow-md">
        <div className="flex flex-start">
          <Link href={`/product-masters`} className="flex items-center gap-3">
            <AiOutlineArrowLeft className="text-xl" />
            戻る
          </Link>
        </div>
        <ProductEditForm
          product={product}
          colors={colors}
          categories={categories}
          defaultValues={defaultValues}
        />
      </div>
      <ProductShowTable skus={skus} />
    </div>
  );
}
