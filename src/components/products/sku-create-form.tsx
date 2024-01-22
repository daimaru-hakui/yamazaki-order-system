"use client";
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
import * as actions from "@/actions/create-sku";
import FormButton from "../common/form-button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SkuCreateFormProps {
  productId: number;
  sizes: Size[];
}

export const CreateSkuSchema = z.object({
  janCode: z.string(),
  productCode: z.string(),
  sizeId: z.string().nullable(),
  price: z.number().min(1, { message: "金額を入力してください" }).nullable(),
});

export interface CreateSkuFormState {
  janCode: string;
  productCode: string;
  sizeId: string;
  price: number;
}

export default function SkuCreateForm({
  productId,
  sizes,
}: SkuCreateFormProps) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateSkuFormState>({
    mode: "onSubmit",
    resolver: zodResolver(CreateSkuSchema),
    defaultValues: {},
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const focusHandle = (e: any) => {
    e.target.select();
  };

  const onSubmit: SubmitHandler<CreateSkuFormState> = (data) => {
    console.log(data)
    // actions.createSku(productId);
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
                <ModalBody className="flex flex-row items-start gap-3">
                  <Input
                    type="text"
                    label="JANコード"
                    labelPlacement={"outside"}
                    // placeholder="JANコード"
                    isInvalid={!!errors.janCode}
                    errorMessage={errors.janCode?.message}
                    {...register("janCode")}
                  />
                  <Input
                    type="text"
                    label="商品コード"
                    labelPlacement={"outside"}
                    // placeholder="JANコード"
                    defaultValue=""
                    isInvalid={!!errors.productCode}
                    errorMessage={errors.productCode?.message}
                    {...register("productCode")}
                  />
                  <Select
                    isRequired
                    labelPlacement={"outside"}
                    label="サイズ"
                    // placeholder="サイズ"
                    isInvalid={!!errors.sizeId}
                    errorMessage={errors.sizeId?.message}
                    {...register("sizeId", {
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
                    // placeholder="価格"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                    onFocus={(e) => focusHandle(e)}
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </ModalBody>

                {/* {formState?.errors._form && (
                  <div className="mx-6 p-1 rounded bg-red-200 border border-red-500">
                    {formState?.errors._form.join(", ")}
                  </div>
                )} */}
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    閉じる
                  </Button>
                  <FormButton>追加</FormButton>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
