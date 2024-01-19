"use client";
import * as actions from "@/actions";
import { Category, Color, Size } from "@prisma/client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@nextui-org/react";
import ProductFormItemTable from "./product-form-item-table";

interface ProductFormProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string(),
  categoryId: z.number().min(1, { message: "カテゴリーを選択してください" }),
  colorId: z.number().min(1, { message: "カラーを選択してください" }),
  description: z.string(),
  items: z.array(
    z.object({
      janCode: z.string(),
      productCode: z.string(),
      sizeId: z.number().min(1),
      price: z.number(),
    })
  ),
});

export type ProductSchema = z.infer<typeof schema>;

const defaultValues = {
  productNumber: "",
  productName: "",
  categoryId: 0,
  colorId: 0,
  description:"",
  items: [
    {
      janCode: "",
      productCode: "",
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
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues,
  });

  const methods = useFieldArray<ProductSchema>({
    control,
    name: "items",
  });

  const addItem = () => {
    methods.append({
      janCode: "",
      productCode: "",
      sizeId: 0,
      price: 0,
    });
  };

  const onSubmit: SubmitHandler<ProductSchema> = (data: ProductSchema) => {
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

  const errorStyle = "mt-1 text-sm text-red-500";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>
              品番<span className="text-red-500">*</span>
            </dt>
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
            <dt className={`${dtStyle}`}>
              カラー<span className="text-red-500">*</span>
            </dt>
            <div className="w-full">
              <dd className={`${ddStyle}`}>
                <div>
                  <select
                    className={`${selectStyle}`}
                    {...register("colorId", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  >
                    <option value={0}>選択してください</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </dd>
              {errors.categoryId && (
                <div className={`${errorStyle}`}>カラーを選択してください</div>
              )}
            </div>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt className={`${dtStyle}`}>
              カテゴリー<span className="text-red-500">*</span>
            </dt>
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
          <ProductFormItemTable
            register={register}
            methods={methods}
            getValues={getValues}
            setValue={setValue}
            sizes={sizes}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-3 py-1 text-white rounded bg-blue-500"
            onClick={addItem}
          >
            追加
          </button>
        </div>
        <div className="mt-6 text-center">
          <Button type="submit" size="sm" color="primary" className="w-full">
            登録
          </Button>
        </div>
      </form>
    </>
  );
}
