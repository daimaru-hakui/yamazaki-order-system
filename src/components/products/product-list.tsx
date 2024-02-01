"use client";
import { deleteProduct } from "@/actions/delete-product";
import paths from "@/paths";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Category, Color, Product } from "@prisma/client";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlinePlus,
} from "react-icons/ai";
import TitleReturn from "../common/title-return";

interface ProductListProps {
  products: (Product & {
    category: Category;
    color: Color;
  })[];
}
export default function ProductList({ products }: ProductListProps) {
  return (
    <>
      <TitleReturn title="商品一覧" path={paths.home()}>
        <Button color="primary" size="sm" className="p-0">
          <Link
            href={paths.productCreate()}
            className="flex w-full h-full items-center justify-center gap-1"
          >
            <AiOutlinePlus /> 追加
          </Link>
        </Button>
      </TitleReturn>
      <Table aria-label="product list table" className="mt-3">
        <TableHeader>
          <TableColumn>品番</TableColumn>
          <TableColumn>品名</TableColumn>
          <TableColumn>カラー</TableColumn>
          <TableColumn>カテゴリー</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productNumber}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.color.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex justify-around">
                <Link href={paths.productShow(product.id)}>
                  <AiOutlineEye className="text-xl cursor-pointer" />
                </Link>
                <Link href={paths.productEdit(product.id)}>
                  <AiOutlineEdit className="text-xl cursor-pointer" />
                </Link>
                <AiOutlineDelete
                  className="text-xl cursor-pointer text-red-600"
                  onClick={() => deleteProduct(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
