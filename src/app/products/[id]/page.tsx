import ProductShow from "@/components/products/product-show";
import SkuList from "@/components/products/sku-list";
import { db } from "@/db";

interface ProductShowPageProps {
  params: { id: string; };
}

export default async function ProductShowPage({
  params,
}: ProductShowPageProps) {
  const id = params.id;

  const product = await db.product.findFirst({
    where: {
      id,
    },
    include: {
      color: {
        select:{
          name:true
        }
      },
      category: {
        select:{
          name:true
        }
      }
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

  await db.$disconnect();

  return (
    <div className="mx-auto max-w-[calc(600px)]">
     <ProductShow product={product}/>
      <SkuList skus={skus} />
    </div>
  );
}
