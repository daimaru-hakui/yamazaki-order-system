'use client';
import { SkuWithProduct } from "@/app/order-csv/page";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

interface OrderCsvListProps {
  data: (SkuWithProduct & { quantity: number; })[];
}
export default function OrderCsvList({ data }: OrderCsvListProps) {
  return (
    <div>
      <Table className="mt-3" aria-label="order cart table">
        <TableHeader>
          <TableColumn className="text-center">品番</TableColumn>
          <TableColumn className="text-center">品名</TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center">価格</TableColumn>
          <TableColumn className="text-center">数量</TableColumn>
          <TableColumn className="text-center">合計</TableColumn>
          {/* <TableColumn className="text-center">削除</TableColumn> */}
        </TableHeader>
        <TableBody>
          {data.map((sku) => (
            <TableRow key={sku.id}>
              <TableCell>{sku.product.productNumber}</TableCell>
              <TableCell>{sku.product.productName}</TableCell>
              <TableCell className="text-center">{sku.size.name}</TableCell>
              <TableCell className="text-right">
                {sku.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                d
              </TableCell>
              <TableCell className="text-right">
                {(sku.quantity * sku.price).toLocaleString()}円
              </TableCell>
              {/* <TableCell className="text-center">
                <AiFillDelete className="mx-auto text-lg cursor-pointer"
                  onClick={() => handleClickDelete(item.skuId)} />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}