"use client";
import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { CustomerProduct, Product } from "@prisma/client";
import { useTransition } from "react";
import * as actions from "@/actions";
import TitleReturn from "../common/title-return";
import paths from "@/paths";

interface CustomerEditProductListProps {
  products: (Product & {
    color: { name: string };
    customerProduct: CustomerProduct[];
    isProduct: any;
  })[];
  customerId: string;
}

export default function CustomerEditProductList({
  products,
  customerId,
}: CustomerEditProductListProps) {
  const [isPending, startTransion] = useTransition();

  const handleClick = async (customerId: string, productId: string) => {
    startTransion(async () => {
      await actions.updateCustomerProduct(customerId, productId);
    });
  };

  return (
    <>
      <TitleReturn title="工場編集画面" path={paths.customerAll()} />
      <Table aria-label="cutomer table" className="mt-3">
        <TableHeader>
          <TableColumn>品番</TableColumn>
          <TableColumn>品名</TableColumn>
          <TableColumn>カラー</TableColumn>
          <TableColumn>登録状況</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productNumber}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.color.name}</TableCell>
              <TableCell>
                <Button
                  // isLoading={isPending}
                  color={product.isProduct ? "primary" : "default"}
                  onClick={() => handleClick(customerId, product.id)}
                >
                  {product.isProduct ? "登録済" : "未登録"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
