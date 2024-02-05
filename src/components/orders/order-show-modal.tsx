import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue
} from "@nextui-org/react";
import { Order, OrderDetail, Sku } from "@prisma/client";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";

interface OrderShowModal {
  sum: string;
  order: Order & {
    orderDetail: (OrderDetail & Sku)[];
  };
}
export default function OrderShowModal({ sum, order }: OrderShowModal) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <AiOutlineEye onClick={onOpen} className="cursor-pointer" size="25px" />
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-6">
                <div>No.{order.id}</div>
                <div>{order.orderNumber}</div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col sm:flex-row justify-between gap-2 px-5">
                  <div className="w-full sm:w-[calc(200px)] grid gap-2">
                    <dl className="grid grid-cols-2 items-center gap-6">
                      <dt className="text-xs text-gray-400">工場名</dt>
                      <dd className="text-sm">{order.customer.name}</dd>
                    </dl>
                    <dl className="grid grid-cols-2 items-center gap-6">
                      <dt className="text-xs text-gray-400">受注日</dt>
                      <dd className="text-sm">{format(order.createdAt, "yyyy-MM-dd")}</dd>
                    </dl>
                    <dl className="grid grid-cols-2 items-center gap-6">
                      <dt className="text-xs text-gray-400">担当者</dt>
                      <dd className="text-sm">{order.uers?.name || "不明"}</dd>
                    </dl>
                  </div>
                  <div className="">
                    <dl className="grid grid-cols-2 items-center gap-6">
                      <dt className="text-xs sm:text-md text-gray-400 sm:text-right">合　計</dt>
                      <dd className="text-sm sm:text-3xl">￥{sum}</dd>
                    </dl>
                  </div>
                </div>
                <Table
                  isHeaderSticky
                  aria-label="Example table with infinite pagination"
                  shadow="none"
                  classNames={{
                    base: "max-h-[520px] overflow-auto",
                  }}
                >
                  <TableHeader>
                    <TableColumn >品番</TableColumn>
                    <TableColumn >品名</TableColumn>
                    <TableColumn className="text-center">単価</TableColumn>
                    <TableColumn className="text-center">数量</TableColumn>
                    <TableColumn className="text-center">合計</TableColumn>
                    <TableColumn >コメント</TableColumn>
                  </TableHeader>
                  <TableBody
                    loadingContent={<Spinner color="white" />}
                  >
                    {order.orderDetail.map((detail: any) => (
                      <TableRow key={detail.id}>
                        <TableCell>{detail.sku.product.productNumber}</TableCell>
                        <TableCell>{detail.sku.product.productName}</TableCell>
                        <TableCell className="text-right">{detail.sku.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{detail.quantity.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{(detail.sku.price * detail.quantity).toLocaleString()}</TableCell>
                        <TableCell>{detail.sku.productNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  閉じる
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent >
      </Modal >
    </>
  );
}