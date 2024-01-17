"use client";
import * as actions from "@/actions";
import { Category, Color, Size } from "@prisma/client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getValue } from "firebase/remote-config";

interface ProductFormProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string().min(1, { message: "商品名を入力してください" }),
  categoryId: z.number().min(1, { message: "カテゴリーを選択してください" }),
  items: z.array(
    z.object({
      // jan: z.string(),
      colorId: z.number().min(1),
      sizeId: z.number().min(1),
      price: z.number(),
    })
  ),
});

export type Schema = z.infer<typeof schema>;

const defaultValues = {
  productNumber: "",
  productName: "",
  categoryId: 0,
  items: [
    {
      // jan: "",
      colorId: 0,
      sizeId: 0,
      price: 0,
    },
  ],
};

export default function ProductForm({
  categories,
  colors,
  sizes,
}: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { append, remove, fields } = useFieldArray<Schema>({
    control,
    name: "items",
  });

  const addItem = () => {
    append({
      // jan: "",
      colorId: 0,
      sizeId: 0,
      price: 0,
    });
  };

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
    e.target.select()
  };

  const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
    console.log(data);
    actions.createProduct(data);
  };

  const dlStyle = "flex items-start py-3 border-b";
  const dtStyle = "w-[calc(200px)] text-sm font-bold";
  const ddStyle = "w-full";
  const selectStyle =
    "shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const inputStyle =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const thStyle = "p-2 text-sm";
  const errorStyle = "mt-1 text-sm text-red-500";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>品番</dt>
            <div className="w-full">
              <dd className={`${ddStyle}`}>
                <div>
                  <input
                    className={`${inputStyle} w-full`}
                    {...register("productNumber", { required: true })}
                  />
                </div>
              </dd>
              {errors.productNumber && (
                <div className={`${errorStyle}`}>
                  {errors.productNumber.message}
                </div>
              )}
            </div>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>品名</dt>
            <div className="w-full">
              <dd className={`${ddStyle}`}>
                <div>
                  <input
                    className={`${inputStyle} w-full`}
                    {...register("productName", { required: true })}
                  />
                </div>
              </dd>
              {errors.productName && (
                <div className={`${errorStyle}`}>
                  {errors.productName.message}
                </div>
              )}
            </div>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>カテゴリー</dt>
            <div className="w-full">
              <dd className={`${ddStyle}`}>
                <div>
                  <select
                    className={`${selectStyle}`}
                    {...register("categoryId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  >
                    <option value={0}>選択してください</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </dd>
              {errors.categoryId && (
                <div className={`${errorStyle}`}>
                  カテゴリーを選択してください
                </div>
              )}
            </div>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>備考</dt>
            <dd className={`${ddStyle}`}>
              <div>
                <textarea className={`${inputStyle} w-full`}></textarea>
              </div>
            </dd>
          </dl>
        </div>
        <div className="mt-6 overflow-auto">
          <table className="table-auto border-collapse min-w-[calc(600px)]">
            <thead>
              <tr className="text-left">
                <th className={`${thStyle}`}>コピー</th>
                <th className={`${thStyle}`}>カラー</th>
                <th className={`${thStyle}`}>サイズ</th>
                <th className={`${thStyle}`}>価格</th>
                <th className={`${thStyle}`}>アクション</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="p-1 w-[calc(80px)]">
                    <button
                      className="px-3 py-1 rounded text-white bg-blue-500"
                      onClick={() => copyItem(index)}
                    >
                      コピー
                    </button>
                  </td>
                  <td className="p-1 w-[calc(250px)]">
                    <select
                      className={`${selectStyle}x`}
                      {...register(`items.${index}.colorId`, {
                        valueAsNumber: true,
                      })}
                    >
                      <option value={0}></option>
                      {colors.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      ))}
                    </select>
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
                  <td className="p-1 w-[calc(100px)]">
                    <button
                      className="px-3 py-1 text-white bg-red-500 rounded"
                      onClick={() => removeItem(index)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-3 py-1 text-white rounded bg-blue-500"
            onClick={addItem}
          >
            追加
          </button>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-3 py-1 text-white rounded bg-blue-500"
          >
            登録
          </button>
        </div>
      </form>
    </>
  );
}
