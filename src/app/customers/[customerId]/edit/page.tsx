import CustomerEditProductList from "@/components/customers/customer-edit-product-list";
import { db } from "@/db";
import paths from "@/paths";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface CustomerEditPageProps {
  params: {
    customerId: string;
  };
}

export default async function CustomerEditPage({
  params,
}: CustomerEditPageProps) {
  const customerId = params.customerId;
  const products = await db.product.findMany({
    include: {
      color: {
        select: {
          name: true,
        },
      },
      customerProduct: {
        where: {
          customerId: customerId,
        },
      },
    },
  });
  const filterProducts = products.map((product) => {
    const isProduct = product.customerProduct.find((cp) => cp.productId === product.id);
    return { ...product, isProduct };
  });

  return (
    <div className="mx-auto max-w-[calc(600px)]">
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.customerAll()}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft className="text-xl" />
          戻る
        </Link>
        <div className="font-bold">顧客情報 編集画面</div>
      </div>
      <CustomerEditProductList
        products={filterProducts}
        customerId={customerId}
      />
    </div>
  );
}
