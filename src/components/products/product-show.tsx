import paths from "@/paths";
import { Product, Size } from "@prisma/client";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import TitleReturn from "../common/title-return";

interface ProductShowProps {
  product:
    | (Product & {
        color: {
          name: string;
        };
        category: {
          name: string;
        };
      })
    | null;
}

export default function ProductShow({ product }: ProductShowProps) {
  return (
    <>
      <h2>商品詳細</h2>
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
    </>
  );
}
