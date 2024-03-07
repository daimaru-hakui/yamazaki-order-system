import OrderCreateProductModal from "./order-create-product-modal";

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
        id:string
        productId:string,
        productCode: string | null;
        janCode: string | null;
        price:number;
        size: {
          name: string;
        };
        displayOrder:number
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
    <div className="col-span-4 border-l">
      <div className="p-3 bg-gray-100">商品を選択</div>
      <div className="overflow-auto h-[calc(100vh-220px)]">
        {customerProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div>データがありません。</div>
          </div>
        ) : (
          <div className="grid">
            {customerProducts.map(({ id, product }) => (
              <OrderCreateProductModal key={id} product={product}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
