"use client";
import { updateProduct } from "@/actions";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Category, Color, Product } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  productNumber: z.string().min(1, { message: "品番を入力してください" }),
  productName: z.string(),
  categoryId: z.string({ required_error: "カテゴリーを選択してください" }),
  colorId: z.string({ required_error: "カラーを選択してください" }),
  description: z.string(),
});

export type ProductEditSchema = z.infer<typeof schema>;

interface ProductEditFormProps {
  id: string,
  product: Product;
  colors: Color[];
  categories: Category[];
}

export default function ProductEditForm({
  id,
  product,
  colors,
  categories,
}: ProductEditFormProps) {
  const defaultValues = {
    productNumber: product?.productNumber,
    productName: product?.productName,
    categoryId: product?.categoryId,
    colorId: product?.colorId,
    description: product?.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const result = await updateProduct(id, data);
    console.log(result);
  };
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
        isDisabled={true}
        value={product?.colorId}
        defaultSelectedKeys={[product.colorId]}
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
        defaultSelectedKeys={[product.categoryId]}
        value={product?.categoryId}
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
        defaultValue={product?.description || ""}
        {...register("description")}
      ></Textarea>
      <div className="text-center">
        <Button
          type="submit"
          size="md"
          color="primary"
          aria-labelledby="update-button"
        >
          更新
        </Button>
      </div>
    </form>
  );
}
