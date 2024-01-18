import ProductShowTable from "@/components/product-masters/product-show-table";
import { db } from "@/db";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface ProductMasterShowPage {
  params: { id: string };
}

export default async function ProductShowPage({
  params,
}: ProductMasterShowPage) {
  const id = parseInt(params.id);

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
        <dl>
          <dt className="text-xs">品番/品名</dt>
          <dd className="text-xl">
            {skus[0].product.productNumber}
            <span className="ml-3">{skus[0].product?.productName}</span>
          </dd>
        </dl>
        <dl>
          <dt className="text-xs">カラー</dt>
          <dd className="text-xl">{skus[0].product?.color.name}</dd>
        </dl>
        <dl>
          <dt className="text-xs">カテゴリー</dt>
          <dd className="text-xl">{skus[0].product?.category.name}</dd>
        </dl>
      </div>
      <ProductShowTable skus={skus} />
    </div>
  );
}
