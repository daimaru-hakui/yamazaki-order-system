"use client";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Category, Color, Product } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";

interface ProductEditFormProps {
  product: Product | null;
  colors: Color[];
  categories: Category[];
  defaultValues: {
    productNumber: string | undefined;
    productName: string | undefined;
    colorId: number | undefined;
    categoryId: number | undefined;
  };
}

export default function ProductEditForm({
  product,
  colors,
  categories,
  defaultValues,
}: ProductEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    console.log(data);
  };

  console.log(product);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        type="text"
        label="品番"
        labelPlacement={"outside"}
        placeholder="品番"
        defaultValue={product?.productNumber}
        {...register("productNumber")}
      />
      <Input
        type="text"
        label="品名"
        labelPlacement={"outside"}
        placeholder="品名"
        defaultValue={product?.productName}
        {...register("productName")}
      />
      <Select
        labelPlacement={"outside"}
        label="カラー"
        placeholder="カラー"
        className="max-w-xs"
        defaultSelectedKeys={String(product?.colorId)}
        {...register("colorId")}
      >
        {colors.map((color) => (
          <SelectItem key={color.id} value={color.id}>
            {color.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        labelPlacement={"outside"}
        label="カテゴリー"
        placeholder="カテゴリー"
        className="max-w-xs"
        defaultSelectedKeys={String(product?.categoryId)}
        {...register("categoryId")}
      >
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        label="備考"
        labelPlacement="outside"
        placeholder=""
        className="w-full"
      ></Textarea>
    </form>
  );
}
