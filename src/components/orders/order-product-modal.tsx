import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import type { Sku } from "@prisma/client";
import OrderProductQuantityInput from "./order-product-quantity-Input";
import { AiFillExclamationCircle } from "react-icons/ai";

interface OrderProductModalProps {
  skus: (Sku & {
    size: { name: string; };
    product: {
      id: string,
      productNumber: string,
      productName: string;
    };
  })[];
}

export default function OrderProductTable({
  skus,
}: OrderProductModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <AiFillExclamationCircle
        onClick={onOpen}
        className="text-blue-500 cursor-pointer"
        style={{ fontSize: "30px" }}
      />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                発注入力
              </ModalHeader>
              <ModalBody>
                <Table shadow="none" aria-label="order product table">
                  <TableHeader>
                    <TableColumn className="text-center">サイズ</TableColumn>
                    <TableColumn className="text-center">数量入力</TableColumn>
                    <TableColumn className="text-center">価格</TableColumn>
                    <TableColumn className="text-center">在庫数</TableColumn>
                    <TableColumn className="text-center">
                      入荷予定数
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {skus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="text-center">
                          <div>{sku.size.name}</div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <OrderProductQuantityInput sku={sku} />
                        </TableCell>
                        <TableCell className="text-right">{sku.price}</TableCell>
                        <TableCell className="text-right">1</TableCell>
                        <TableCell className="text-right">1</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
