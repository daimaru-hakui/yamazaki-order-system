"use client";
import { createSku } from "@/actions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Size } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  janCode: z.string(),
  productCode: z.string(),
  sizeId: z.number().min(1, { message: "サイズを選択してください" }),
  price: z.number().min(0, { message: "金額を入力してください" }),
});

export type ProductAddSkuSchema = z.infer<typeof schema>;

interface ProductEditSkuAddModalProps {
  id: number;
  sizes: Size[];
}

export default function ProductEditSkuAddModal({
  id,
  sizes,
}: ProductEditSkuAddModalProps) {
  const { register, handleSubmit } = useForm<ProductAddSkuSchema>({
    defaultValues: {
      janCode: "",
      productCode: "",
      sizeId: 0,
      price: 0,
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit: SubmitHandler<ProductAddSkuSchema> = async (
    data: ProductAddSkuSchema
  ) => {
    console.log(data);
    await createSku(id, data);
    onOpenChange();
  };

  const focusHandle = (e: any) => {
    e.target.select();
  };

  return (
    <>
      <div className="mt-6 text-center">
        <Button color="primary" className="shadow-md" onClick={onOpen}>
          追加
        </Button>
      </div>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">編集</ModalHeader>
                <ModalBody className="flex flex-row gap-3">
                  <Input
                    type="text"
                    label="JANコード"
                    labelPlacement={"outside"}
                    placeholder="JANコード"
                    {...register("janCode")}
                  />
                  <Input
                    type="text"
                    label="商品コード"
                    labelPlacement={"outside"}
                    placeholder="商品コード"
                    {...register("productCode")}
                  />
                  <Select
                    isRequired
                    labelPlacement={"outside"}
                    label="サイズ"
                    placeholder="サイズ"
                    className="max-w-xs"
                    {...register("sizeId", {
                      valueAsNumber: true,
                      required: true,
                    })}
                  >
                    {sizes.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    label="価格"
                    labelPlacement={"outside"}
                    placeholder="価格"
                    defaultValue={"0"}
                    onFocus={(e) => focusHandle(e)}
                    {...register("price", { valueAsNumber: true })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    閉じる
                  </Button>
                  <Button type="submit" color="primary">
                    追加
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
