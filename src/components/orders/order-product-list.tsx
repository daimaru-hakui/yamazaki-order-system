"use client";
import paths from "@/paths";
import { useStore } from "@/store";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
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

export type Inputs = {
  customerId: number;
  items: {
    skuId: number;
    quantity: number;
  }[];
}

interface SkuWithSize extends Sku {
  size: Size;
  product:Product
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
  const setCart = useStore((state) => state.setCart);
  const methods = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex justify-center gap-6 relative">
        <Link
          href={paths.orderCreate()}
          className="flex items-center gap-3 absolute left-0"
        >
          <AiOutlineArrowLeft className="text-xl" />
          戻る
        </Link>
        <div className="font-bold">発注入力</div>
      </div>
      <div className="mt-6 text-2xl">{customers?.name}</div>
      <form className="grid grid-cols-2 gap-6 mt-3">
        {customers?.customerProduct.map((cp) => (
          <div key={cp.id} className="p-3 rounded-xl bg-white shadow-md">
            <div className="flex flex-col">
              <div>{cp.product.productNumber}</div>
              <div>
                {cp.product.productName}
                <span className="ml-3">{cp.product.color.name}</span>
              </div>
              <div className="flex flex-col gap-3">
                <OrderProductTable skus={cp.product.skus} methods={methods}>
                  登録
                </OrderProductTable>
              </div>
            </div>
          </div>
        ))}
      </form>
    </>
  );
}
