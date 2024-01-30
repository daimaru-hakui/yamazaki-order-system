"use client";
import { deleteProduct } from "@/actions/delete-product";
import paths from "@/paths";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Category, Color, Product } from "@prisma/client";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface ProductCategory extends Product {
  category: Category;
  color: Color;
}

interface ProductListProps {
  products: ProductCategory[];
}
export default function ProductList({ products }: ProductListProps) {
  return (
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
  );
}