"use client";
import * as actions from "@/actions";
import { Category, Color, Size } from "@prisma/client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import ProductFormItemTable from "./sku-create-form";
import { CreateProductSchema } from "@/actions/create-product";
import TitleReturn from "../common/title-return";
import paths from "@/paths";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

interface ProductCreateFormProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string(),
  categoryId: z.string({ required_error: "カテゴリーを選択してください" }),
  colorId: z.string({ required_error: "カラーを選択してください" }),
  description: z.string(),
  items: z.array(
    z.object({
      janCode: z.string(),
      productCode: z.string(),
      sizeId: z.string({ required_error: "サイズを選択してください" }),
      price: z.number(),
    })
  ),
});

const defaultValues = {
  productNumber: "",
  productName: "",
  categoryId: "",
  colorId: "",
  description: "",
  items: [
    {
      janCode: "",
      productCode: "",
      sizeId: "",
      price: 0,
    },
  ],
};

export default function ProductCreatetForm({
  categories,
  colors,
  sizes,
}: ProductCreateFormProps) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    defaultValues: defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const methods = useFieldArray<CreateProductSchema>({
    control,
    name: "items",
  });

  const addItem = () => {
    methods.append({
      janCode: "",
      productCode: "",
      sizeId: "",
      price: 0,
    });
  };

  const onSubmit: SubmitHandler<CreateProductSchema> = (
    data: CreateProductSchema
  ) => {
    console.log(data);
    actions.createProduct(data);
  };

  console.log(errors);

  return (
    <>
      <TitleReturn title="商品登録" path={paths.productAll()} />
      <div className="mt-3 p-6 border rounded-xl bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 mt-12">
            <Input
              labelPlacement="outside"
              label="品番"
              placeholder=" "
              isRequired
              errorMessage={
                errors.productNumber && errors.productNumber.message
              }
              {...register("productNumber", { required: true })}
            />
            <Input
              labelPlacement="outside"
              label="品名"
              placeholder=" "
              isRequired
              errorMessage={errors.productName && errors.productName.message}
              {...register("productName")}
            />
            <Select
              label="カラー"
              labelPlacement="outside"
              placeholder=" "
              isRequired
              errorMessage={errors.categoryId && errors.categoryId.message}
              {...register("colorId", {
                required: true,
                valueAsNumber: true,
              })}
            >
              {colors.map((color) => (
                <SelectItem key={color.id} value={color.id}>
                  {color.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="カテゴリー"
              labelPlacement="outside"
              placeholder=" "
              isRequired
              errorMessage={errors.categoryId && errors.categoryId.message}
              {...register("categoryId", {
                required: true,
                valueAsNumber: true,
              })}
            >
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              labelPlacement="outside"
              label="備考"
              placeholder=" "
              {...register("description")}
            />
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
            <Button
              className="px-3 py-1 text-white rounded bg-blue-500"
              onClick={addItem}
            >
              追加
            </Button>
          </div>
          <div className="mt-6 text-center">
            <Button type="submit" size="sm" color="primary" className="w-full">
              登録
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
