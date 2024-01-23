import { useStore } from "@/store";
import { Color, Customer, CustomerProduct, Product } from "@prisma/client";

interface ProductWithColor extends Product {
  color: Color;
}

interface OrderProductListProps {
  products: ProductWithColor[];
}

export default function OrderProductList({ products }: OrderProductListProps) {
  const cart = useStore((state) => state.cart);
  const setCart = useStore((state) => state.setCart);
  const setActivePage = useStore((state) => state.setActivePage);

  const prevPage = () => {
    setCart({ ...cart, customer: { id: undefined, name: "" } });
    setActivePage(1);
  };

  return (
    <div>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={prevPage}
      >
        工場選択へ戻る
      </button>
      <div className="mt-6">{cart.customer.name}</div>
      <div>
        {products.map((product => (
          <div key={product.id}>{product.productName}</div>
        )))}
      </div>
    </div>
  );
}
