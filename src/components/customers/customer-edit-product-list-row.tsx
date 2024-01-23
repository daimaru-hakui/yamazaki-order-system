"use client";
import { Button, TableCell, TableRow } from "@nextui-org/react";
import { useTransition } from "react";
import * as actions from "@/actions";
import { CustomerProduct, Product } from "@prisma/client";

interface ProductWithColor extends Product {
  color: { name: string };
  customerProduct: CustomerProduct[];
  isProduct: any;
}

interface CustomerEditProductListRowProps {
  product: ProductWithColor;
  customerId: string;
}

export default function CustomerEditProductListRow({
  product,
  customerId,
}: CustomerEditProductListRowProps) {
  const [isPending, startTransion] = useTransition();

  const handleClick = async (customerId: number, productId: number) => {
    startTransion(async () => {
      await actions.updateCustomerProduct(customerId, productId);
    });
  };

  return (
    <TableRow key={product.id}>
      <TableCell>{product.productNumber}</TableCell>
      <TableCell>{product.productName}</TableCell>
      <TableCell>{product.color.name}</TableCell>
      <TableCell>
        <Button
        //   isLoading={isPending}
        //   color={product.isProduct ? "primary" : "default"}
        //   onClick={() => handleClick(Number(customerId), product.id)}
        >
          {product.isProduct ? "登録済" : "未登録"}
        </Button>
        ;
      </TableCell>
    </TableRow>
  );
}
