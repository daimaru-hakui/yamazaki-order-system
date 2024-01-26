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
import { Product, Size, Sku } from "@prisma/client";
import OrderProductTableRow from "./order-product-table-row";
import { AiFillExclamationCircle } from "react-icons/ai";

interface SkuWithSize extends Sku {
  size: Size;
  product: Product;
}

interface OrderProductTableProps {
  skus: SkuWithSize[];
}

export default function OrderProductTable({
  skus,
}: OrderProductTableProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <AiFillExclamationCircle
        onClick={onOpen}
        className="text-blue-500 cursor-pointer"
        style={{fontSize:"30px"}}
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
                    {skus.map((sku, idx) => (
                      <TableRow key={sku.id}>
                        <TableCell className="text-center">
                          <div>{sku.size.name}</div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <OrderProductTableRow sku={sku} idx={idx} />
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
