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
import { Input, Select, SelectItem } from "@nextui-org/react";

interface ProductFormItemTableProps {
  methods: UseFieldArrayReturn<CreateProductSchema>;
  register: UseFormRegister<CreateProductSchema>;
  getValues: UseFormGetValues<CreateProductSchema>;
  setValue: UseFormSetValue<CreateProductSchema>;
  sizes: Size[];
}

export default function SkuCreateForm({
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
    if (!items) return;
    const obj = items[idx];
    console.log(obj);
    items.splice(idx, 0, obj);
    console.log(items);
    setValue("items", [...items]);
  };

  const focusHandle = (
    e: React.FocusEvent<HTMLInputElement, Element> | any
  ) => {
    e.target.select();
  };

  return (
    <table aria-label="product show table" className="min-w-[calc(600px)]">
      <thead>
        <tr>
          <th></th>
          <th>JANコード</th>
          <th>商品コード</th>
          <th>
            サイズ<span className="text-red-500">*</span>
          </th>
          <th>
            価格<span className="text-red-500">*</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={field.id}>
            <td className="p-1 w-[calc(30px)]">
              <AiOutlineCopy
                className="flex justify-center w-full text-xl cursor-pointer"
                onClick={() => copyItem(index)}
              />
            </td>
            <td className="p-1">
              <Input
                size="sm"
                aria-label="janCode"
                defaultValue={getValues(`items.${index}.janCode`)}
                {...register(`items.${index}.janCode`)}
              />
            </td>
            <td className="p-1">
              <Input
                size="sm"
                aria-label="productCode"
                defaultValue={getValues(`items.${index}.productCode`)}
                {...register(`items.${index}.productCode`)}
              />
            </td>
            <td className="p-1 w-[calc(100px)]">
              <Select
                aria-label="size"
                placeholder=""
                size="sm"
                defaultSelectedKeys={[getValues(`items.${index}.sizeId`), ""]}
                {...register(`items.${index}.sizeId`)}
              >
                {sizes.map((size) => (
                  <SelectItem aria-label="sizeId" key={size.id} value={size.id}>
                    {size.name}
                  </SelectItem>
                ))}
              </Select>
            </td>
            <td className="p-1 w-[calc(100px)]">
              <Input
                size="sm"
                aria-label="price"
                type="number"
                defaultValue={String(getValues(`items.${index}.price`))}
                {...register(`items.${index}.price`, {
                  valueAsNumber: true,
                })}
                onFocus={focusHandle}
              />
            </td>
            <td className="p-1 w-[calc(30px)]">
              <AiFillDelete
                className="flex justify-center w-full text-xl cursor-pointer"
                onClick={() => removeItem(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
