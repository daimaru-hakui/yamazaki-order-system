import ProductShowTable from "@/components/products/product-show-table";
import { db } from "@/db";
import paths from "@/paths";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface ProductMasterShowPage {
  params: { id: string };
}

export default async function ProductShowPage({
  params,
}: ProductMasterShowPage) {
  const id = parseInt(params.id);

  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      color: true,
      category: true,
    },
  });

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
        <div className="font-bold">詳細画面</div>
      </div>
      <div className="flex flex-col gap-6 mt-3 p-6 rounded-xl bg-white shadow-md">
        <dl>
          <dt className="text-xs">品番/品名</dt>
          <dd className="text-xl">
            {product?.productNumber}
            <span className="ml-3">{product?.productName}</span>
          </dd>
        </dl>
        <dl>
          <dt className="text-xs">カラー</dt>
          <dd className="text-xl">{product?.color.name}</dd>
        </dl>
        <dl>
          <dt className="text-xs">カテゴリー</dt>
          <dd className="text-xl">{product?.category.name}</dd>
        </dl>
        <dl>
          <dt className="text-xs">備考</dt>
          <dd className="text-xl">{product?.description || "未記入"}</dd>
        </dl>
      </div>
      <ProductShowTable skus={skus} />
    </div>
  );
}
