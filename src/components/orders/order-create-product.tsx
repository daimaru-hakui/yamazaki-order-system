import { Button } from "@nextui-org/react";

interface OrderCreateProductProps {
  customerProducts: ({
    product: {
      id: string;
      productNumber: string;
      productName: string;
      color: {
        name: string;
      };
      skus: {
        productCode: string | null;
        janCode: string | null;
        size: {
          name: string;
        };
      }[];
    };
  } & {
    id: string;
    customerId: string;
    productId: string;
  })[];
}

export default function OrderCreateProduct({
  customerProducts,
}: OrderCreateProductProps) {
  return (
    <div className="overflow-auto h-[calc(100vh-200px)] px-3">
      <div className="grid gap-3">
        {customerProducts.map(({ id, product }) => (
          <Button key={id} className="text-sm cursor-pointer">
            {product.productName}
          </Button>
        ))}
      </div>
    </div>
  );
}
