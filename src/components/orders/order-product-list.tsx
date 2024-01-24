import paths from "@/paths";
import { useStore } from "@/store";
import { Color, Customer, CustomerProduct, Product } from "@prisma/client";
import Link from "next/link";

// interface ProductWithColor extends Product {
//   color: Color;
// }

// interface CustomerProductWithColor extends CustomerProduct {
//   product: ProductWithColor;
// }

interface T extends Customer {
  customers: (CustomerProduct[] & Customer | null);
}

interface OrderProductListProps {
  customers: ({
    customerProduct: CustomerProduct[];
  } & Customer) | null;
}


export default function OrderProductList({ customers }: OrderProductListProps) {

  return (
    <div>
      <Link href={paths.orderCreate()}>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          工場選択へ戻る
        </button>
      </Link>
      <div className="mt-6">{ }</div>
      <div>
        {/* {customers.map((cp => (
          <div key={cp.id}>{cp.CustomerProduct.map}</div>
        )))} */}
      </div>
    </div>
  );
}
