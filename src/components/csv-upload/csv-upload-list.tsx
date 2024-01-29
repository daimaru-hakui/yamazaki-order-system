"use client";
import { SkuWithProduct } from "@/app/csv-upload/page";
import { useStore } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface CsvUploadListProps {
  data: (SkuWithProduct & {
    quantity: number;
    firstName: string;
    lastName: string;
    comment: string;
  })[];
}
export default function CsvUploadList({ data }: CsvUploadListProps) {
  const [sum, setSum] = useState(0);
 
  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSum(total);
  }, [data]);

  // useEffect(() => {
  //   const newCart = cart
  //     .sort(
  //       (a: { displayOrder: number }, b: { displayOrder: number }) =>
  //         a.displayOrder - b.displayOrder
  //     )
  //     .sort(
  //       (a: { productId: number }, b: { productId: number }) =>
  //         a.productId - b.productId
  //     );
  //   setSortCart(newCart);
  // }, [cart]);

  return (
    <div>
      <Table className="" aria-label="order cart table">
        <TableHeader>
          <TableColumn className="text-center">品番</TableColumn>
          <TableColumn className="text-center">品名</TableColumn>
          <TableColumn className="text-center">サイズ</TableColumn>
          <TableColumn className="text-center">価格</TableColumn>
          <TableColumn className="text-center">数量</TableColumn>
          <TableColumn className="text-center">合計</TableColumn>
          <TableColumn className="text-center">姓</TableColumn>
          <TableColumn className="text-center">名</TableColumn>
          <TableColumn className="text-center">備考</TableColumn>
          {/* <TableColumn className="text-center">削除</TableColumn> */}
        </TableHeader>
        <TableBody>
          {data.map((sku,idx) => (
            <TableRow key={idx}>
              <TableCell>{sku.product.productNumber}</TableCell>
              <TableCell>{sku.product.productName}</TableCell>
              <TableCell className="text-center">{sku.size.name}</TableCell>
              <TableCell className="text-right">
                {sku.price.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">{sku.quantity}</TableCell>
              <TableCell className="text-right">
                {(sku.quantity * sku.price).toLocaleString()}円
              </TableCell>
              <TableCell>{sku.lastName}</TableCell>
              <TableCell>{sku.firstName}</TableCell>
              <TableCell>{sku.comment}</TableCell>
              {/* <TableCell className="text-center">
                <AiFillDelete
                  className="mx-auto text-lg cursor-pointer"
                  // onClick={() => handleClickDelete(item.skuId)}
                />
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <div className="flex justify-end items-center p-3">
        注文金額合計（税抜）:
        <div className="text-2xl">{`￥${sum.toLocaleString()}`}</div>
      </div>
    </div>
  );
}
