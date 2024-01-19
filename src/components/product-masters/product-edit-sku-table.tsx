"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Category, Color, Product, Size, Sku } from "@prisma/client";
import ProductEditModal from "./product-edit-sku-modal";

interface ProductCategoryColor extends Product {
  category: Category | null;
  color: Color | null;
}

export interface SkuProductSize extends Sku {
  product: ProductCategoryColor;
  size: Size | null;
}

interface ProductShowTableProps {
  skus: SkuProductSize[];
  sizes: Size[];
}

export default function ProductEditSkuTable({
  skus,
  sizes,
}: ProductShowTableProps) {
  return (
    <>
      <Table aria-label="sku table" className="mt-6">
        <TableHeader>
          <TableColumn>JANコード</TableColumn>
          <TableColumn>商品コード</TableColumn>
          <TableColumn>サイズ</TableColumn>
          <TableColumn>価格</TableColumn>
          <TableColumn>編集</TableColumn>
        </TableHeader>
        <TableBody>
          {skus?.map((sku) => (
            <TableRow key={sku.id}>
              <TableCell>{sku.janCode}</TableCell>
              <TableCell>{sku.productCode}</TableCell>
              <TableCell>{sku.size?.name}</TableCell>
              <TableCell>{sku.price.toLocaleString()}</TableCell>
              <TableCell>
                <ProductEditModal sku={sku} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
