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
import { Color, Product, Size, Sku } from "@prisma/client";
import { ReactNode, useState } from "react";

interface SkuWithSize extends Sku {
  size: Size;
}

interface OrderProductTableProps {
  children: ReactNode;
  skus: SkuWithSize[];
}

export default function OrderProductTable({
  children,
  skus,
}: OrderProductTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                <Table shadow="none">
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
                    {skus.map((sku) => (
                      <TableRow key={sku.id}>
                        <TableCell className="text-center">
                          <div>{sku.size.name}</div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <Input
                            type="number"
                            size="sm"
                            className="w-[calc(80px)]"
                          />
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
                  登録
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
