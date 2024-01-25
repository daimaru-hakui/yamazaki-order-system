import {
  Button,
  Input,
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
import { Product, Size, Sku } from "@prisma/client";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import OrderProductTableRow from "./order-product-table-row";

interface SkuWithSize extends Sku {
  size: Size;
  product: Product;
}

interface OrderProductTableProps {
  children: ReactNode;
  skus: SkuWithSize[];
  methods: UseFormReturn<FieldValues, any, undefined>;
}

export default function OrderProductTable({
  children,
  skus,
  methods,
}: OrderProductTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register } = methods;
  return (
    <>
      <Button color="primary" onPress={onOpen} className="mt-3">
        {children}
      </Button>
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
                    <TableColumn className="text-center">在庫数</TableColumn>
                    <TableColumn className="text-center">注文数</TableColumn>
                    <TableColumn className="text-center">
                      入荷予定数
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {skus.map((sku, idx) => (
                      <TableRow key={sku.id}>
                        <TableCell className="text-center">
                          <div>{sku.size.name}</div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <OrderProductTableRow sku={sku} idx={idx} />
                        </TableCell>
                        <TableCell className="text-right">1</TableCell>
                        <TableCell className="text-right">1</TableCell>
                        <TableCell className="text-right">1</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  カートに入れる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
