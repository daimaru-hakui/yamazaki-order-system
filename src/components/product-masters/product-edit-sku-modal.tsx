"use client";
import { AiFillEdit } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { SkuProductSize } from "./product-edit-sku-table";
import { Sku } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateSku } from "@/actions";

interface ProductEditSkuModalProps {
  sku: SkuProductSize;
}

export default function ProductEditSkuModal({ sku }: ProductEditSkuModalProps) {
  const { register, handleSubmit } = useForm<Sku>({
    defaultValues: {
      id: sku.id,
      janCode: sku.janCode,
      productCode: sku.productCode,
      sizeId: sku.sizeId,
      price: sku.price,
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit: SubmitHandler<Sku> = async (data: Sku) => {
    console.log(data);
    await updateSku(data);
  };

  const focusHandle = (e: any) => {
    e.target.select();
  };

  return (
    <>
      <AiFillEdit className="text-xl cursor-pointer" onClick={onOpen} />
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
                    defaultValue={sku.janCode || ""}
                    {...register("janCode")}
                  />
                  <Input
                    type="text"
                    label="商品コード"
                    labelPlacement={"outside"}
                    placeholder="商品コード"
                    defaultValue={sku.productCode || ""}
                    {...register("productCode")}
                  />
                  <Input
                    isDisabled
                    labelPlacement={"outside"}
                    label="サイズ"
                    placeholder="サイズ"
                    className="max-w-xs"
                    defaultValue={String(sku?.size?.name)}
                  ></Input>
                  <Input
                    type="number"
                    label="価格"
                    labelPlacement={"outside"}
                    placeholder="価格"
                    defaultValue={String(sku.price)}
                    onFocus={(e) => focusHandle(e)}
                    {...register("price", { valueAsNumber: true })}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    閉じる
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    更新
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
