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
  Spinner,
} from "@nextui-org/react";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";

interface OrderShowModal {
  sum: string;
  order: {
    id: number;
    orderNumber: string | null;
    comment: string | null;
    createdAt: Date;
    user: {
      name: string | null;
    };
    customer: {
      name: string;
    };
    orderDetail: {
      id: number;
      janCode: string | null;
      productCode: string | null;
      productNumber: string | null;
      productName: string | null;
      size: string | null;
      price: number;
      quantity: number;
      orderQuantity: number;
      memo: string | null;
      shippingDetail: {
        quantity: number;
      }[];
    }[];
  };
}
export default function OrderShowModal({ sum, order }: OrderShowModal) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getShippingTotal = (shippingDetail: { quantity: number }[]) => {
    let sum = 0;
    shippingDetail.forEach((shipping) => (sum += shipping.quantity));
    return sum;
  };
  
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
                  <div className="w-full sm:w-[calc(400px)] grid gap-2">
                    <dl className="grid grid-cols-4 items-center gap-6">
                      <dt className="col-span-1 text-xs text-gray-400">
                        工場名
                      </dt>
                      <dd className="col-span-3 text-sm">
                        {order.customer.name}
                      </dd>
                    </dl>
                    <dl className="grid grid-cols-4 items-center gap-6">
                      <dt className="col-span-1 text-xs text-gray-400">
                        受注日
                      </dt>
                      <dd className="col-span-3 text-sm">
                        {format(order.createdAt, "yyyy-MM-dd")}
                      </dd>
                    </dl>
                    <dl className="grid grid-cols-4 items-center gap-6">
                      <dt className="col-span-1 text-xs text-gray-400">
                        担当者
                      </dt>
                      <dd className="col-span-3 text-sm">
                        {order.user?.name || "不明"}
                      </dd>
                    </dl>
                  </div>
                  <div className="">
                    <dl className="grid grid-cols-2 items-center gap-6">
                      <dt className="text-xs sm:text-md text-gray-400 sm:text-right">
                        合　計
                      </dt>
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
                    <TableColumn>品番</TableColumn>
                    <TableColumn>品名</TableColumn>
                    <TableColumn className="text-center">サイズ</TableColumn>
                    <TableColumn className="text-center">単価</TableColumn>
                    <TableColumn className="text-center">注文数</TableColumn>
                    <TableColumn className="text-center">未出荷数</TableColumn>
                    <TableColumn className="text-center">出荷数</TableColumn>
                    <TableColumn className="text-center">合計</TableColumn>
                    <TableColumn>コメント</TableColumn>
                  </TableHeader>
                  <TableBody loadingContent={<Spinner color="white" />}>
                    {order.orderDetail.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell>{detail.productNumber}</TableCell>
                        <TableCell>{detail.productName}</TableCell>
                        <TableCell className="text-center">
                          {detail.size}
                        </TableCell>
                        <TableCell className="text-right">
                          {detail.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {detail.orderQuantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {detail.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {getShippingTotal(detail.shippingDetail)}
                        </TableCell>
                        <TableCell className="text-right">
                          {(
                            detail.price * detail.orderQuantity
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>{detail.memo}</TableCell>
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
        </ModalContent>
      </Modal>
    </>
  );
}
