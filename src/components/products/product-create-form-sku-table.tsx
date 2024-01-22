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

interface ProductFormItemTableProps {
  methods: UseFieldArrayReturn<CreateProductSchema>;
  register: UseFormRegister<CreateProductSchema>;
  getValues: UseFormGetValues<CreateProductSchema>;
  setValue: UseFormSetValue<CreateProductSchema>;
  sizes: Size[];
}

export default function ProductCreateFormSkuTable({
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
    const obj = items[idx];
    items.splice(idx, 0, obj);
    setValue("items", items);
  };

  const focusHandle = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.target.select();
  };

  const inputStyle =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const selectStyle =
    "shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const thStyle = "p-2 text-sm";

  return (
    <table aria-label="product show table" className="table-auto border-collapse min-w-[calc(600px)]">
      <thead>
        <tr className="text-left">
          <th className={`${thStyle}`}></th>
          <th className={`${thStyle}`}>JANコード</th>
          <th className={`${thStyle}`}>商品コード</th>
          <th className={`${thStyle}`}>
            サイズ<span className="text-red-500">*</span>
          </th>
          <th className={`${thStyle}`}>
            価格<span className="text-red-500">*</span>
          </th>
          <th className={`${thStyle}`}></th>
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
              <input
                className={`${inputStyle}`}
                {...register(`items.${index}.janCode`)}
              />
            </td>
            <td className="p-1">
              <input
                className={`${inputStyle}`}
                {...register(`items.${index}.productCode`)}
              />
            </td>
            <td className="p-1 w-[calc(100px)]">
              <select
                className={`${selectStyle} `}
                {...register(`items.${index}.sizeId`, {
                  valueAsNumber: true,
                })}
              >
                <option value={0}></option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-1 w-[calc(100px)]">
              <input
                type="number"
                className={`${inputStyle}`}
                {...register(`items.${index}.price`, {
                  valueAsNumber: true,
                })}
                onFocus={(e) => focusHandle(e)}
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
