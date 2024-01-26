"use client";
import paths from "@/paths";
import { useStore } from "@/store";
import {
  Color,
  Customer,
  CustomerProduct,
  Product,
  Size,
  Sku,
} from "@prisma/client";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import OrderProductTable from "./order-product-table";
import { Chip } from "@nextui-org/react";

export type Inputs = {
  customerId: number;
  items: {
    skuId: number;
    quantity: number;
  }[];
};

interface SkuWithSize extends Sku {
  size: Size;
  product: Product;
}

interface ProductWithColorAndSku extends Product {
  color: Color;
  skus: SkuWithSize[];
}

interface CustomerProductWithColor extends CustomerProduct {
  product: ProductWithColorAndSku;
}

interface OrderProductListProps {
  customers:
    | ({
        customerProduct: CustomerProductWithColor[];
      } & Customer)
    | null;
}

export default function OrderProductList({ customers }: OrderProductListProps) {
  const cart = useStore((state) => state.cart);

  const cartArea = (productId: number) => {
    const newCart = cart
      .filter((item) => item.productId === productId)
      .sort((a: { displayOrder: number }, b: { displayOrder: number }) => {
        return a.displayOrder - b.displayOrder;
      });

    return newCart.map((item) => (
      <Chip key={item.skuId} variant="bordered">
        {item.size}/{item.quantity}
      </Chip>
    ));
  };

  return (
    <>
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.orderCreate()}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft />
          <div className="text-sm">戻る</div>
        </Link>
        <div className="font-bold">数量入力</div>
      </div>
      <div className="mt-6 text-2xl">{customers?.name}</div>
      <form className="grid grid-cols-2 gap-6 mt-3">
        {customers?.customerProduct.map((cp) => (
          <div key={cp.id} className="p-3 rounded-xl bg-white shadow-md">
            <div className="flex flex-col">
              <div className="flex justify-between items-start gap-5">
                <div>
                  <div>{cp.product.productNumber}</div>
                  <div className="flex gap-3">
                    <div>{cp.product.productName}</div>
                    <span>{cp.product.color.name}</span>
                  </div>
                </div>
                <OrderProductTable skus={cp.product.skus} />
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {cartArea(cp.product.id)}
              </div>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}
