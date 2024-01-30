"use client";

import {
  UseFieldArrayReturn,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Size } from "@prisma/client";
import { AiOutlineCopy, AiFillDelete } from "react-icons/ai";
import { CreateProductSchema } from "@/actions/create-product";
import {
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface ProductFormItemTableProps {
  methods: UseFieldArrayReturn<CreateProductSchema>;
  register: UseFormRegister<CreateProductSchema>;
  getValues: UseFormGetValues<CreateProductSchema>;
  setValue: UseFormSetValue<CreateProductSchema>;
  sizes: Size[];
}

export default function SkuCreateFormCopy({
  methods,
  register,
  getValues,
  setValue,
  sizes,
}: ProductFormItemTableProps) {
  const { remove, fields } = methods;

  const removeItem = (idx: number) => {
    remove(idx);
  };
  const copyItem = (idx: number) => {
    const items = getValues("items");
    if(!items) return
    const obj = items[idx];
    items.splice(idx, 0, obj);
    setValue("items", items);
  };

  const focusHandle = (
    e: React.FocusEvent<HTMLInputElement, Element> | any
  ) => {
    e.target.select();
  };

  return (
    <Table aria-label="product show table" className="min-w-[calc(600px)]">
      <TableHeader>
        <TableColumn>コピー</TableColumn>
        <TableColumn>JANコード</TableColumn>
        <TableColumn>商品コード</TableColumn>
        <TableColumn>
          サイズ<span className="text-red-500">*</span>
        </TableColumn>
        <TableColumn >
          価格<span className="text-red-500">*</span>
        </TableColumn>
        <TableColumn >削除</TableColumn>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <TableRow key={field.id}>
            <TableCell className="p-1 w-[calc(30px)]">
              <AiOutlineCopy
                className="flex justify-center w-full text-xl cursor-pointer"
                onClick={() => copyItem(index)}
              />
            </TableCell>
            <TableCell className="p-1">
              <Input size="sm" {...register(`items.${index}.janCode`)} />
            </TableCell>
            <TableCell className="p-1">
              <Input size="sm" {...register(`items.${index}.productCode`)} />
            </TableCell>
            <TableCell className="p-1 w-[calc(100px)]">
              <Select
                size="sm"
                {...register(`items.${index}.sizeId`)}
              >
                {sizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.name}
                  </SelectItem>
                ))}
              </Select>
            </TableCell>
            <TableCell className="p-1 w-[calc(100px)]">
              <Input
                size="sm"
                type="number"
                {...register(`items.${index}.price`, {
                  valueAsNumber: true,
                })}
                onFocus={focusHandle}
              />
            </TableCell>
            <TableCell className="p-1 w-[calc(30px)]">
              <AiFillDelete
                className="flex justify-center w-full text-xl cursor-pointer"
                onClick={() => removeItem(index)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
