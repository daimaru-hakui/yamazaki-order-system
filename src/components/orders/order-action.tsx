"use client";
import {
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import { sumCalc } from "./order-list";
import { useForm, SubmitHandler } from "react-hook-form";
import OrderActionButtonArea from "./order-action-button-area";
import * as actions from "@/actions";
import { useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";

interface OrderDetail {
  id: number;
  janCode: string | null;
  productCode: string | null;
  productNumber: string | null;
  productName: string | null;
  size: string | null;
  price: number;
  quantity: number;
  skuId: string;
  orderQuantity: number;
  memo: string | null;
  shippingDetail: {
    quantity: number;
  }[];
}

interface OrderActionProps {
  order: Order & {
    user: {
      name: string | null;
    };
    customer: {
      name: string;
    };
    orderDetail: OrderDetail[];
  };
}

interface Inputs {
  orderId: number;
  userId: string;
  shippingDate: Date;
  orderDetails: {
    id: number;
    skuId: string;
    quantity: number;
    currentQuantity: number;
    price: number;
  }[];
};

export default function OrderAction({ order }: OrderActionProps) {
  const [isPending, startTransition] = useTransition();
  const session = useSession();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      orderId: order.id,
      orderDetails: [...order.orderDetail],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    startTransition(async () => {
      const error = await actions.createShipping(data);
      console.log(error);
    });
  };

  useEffect(() => {
    setValue("userId", session.data?.user.uid || "");
  }, [session.data?.user.uid, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl font-bold">出荷処理</div>
        <div className="mt-3 p-3 rounded-xl shadow-sm bg-white">
          <div className="font-bold">受付No.{order.id}</div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6 px-5">
            <div className="w-full sm:w-[calc(200px)] grid gap-2">
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs text-gray-400">工場名</dt>
                <dd className="text-sm">{order.customer?.name}</dd>
              </dl>
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs text-gray-400">受注日</dt>
                <dd className="text-sm">
                  {format(order?.createdAt, "yyyy-MM-dd")}
                </dd>
              </dl>
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs text-gray-400">担当者</dt>
                <dd className="text-sm">{order.user?.name || "不明"}</dd>
              </dl>
            </div>
            <div className="">
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs sm:text-md text-gray-400 sm:text-right">
                  合　計
                </dt>
                <dd className="text-sm sm:text-3xl">
                  ￥{sumCalc(order.orderDetail).toLocaleString()}
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-3 p-5">
            <div className="text-sm text-gray-400">出荷日</div>
            <div className="mt-2">
              <Input
                type="date"
                size="sm"
                className="md:max-w-[200px]"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                {...register("shippingDate", { required: true })}
              />
            </div>
          </div>

          <div className="mt-3 overflow-auto">
            <Table
              isHeaderSticky
              fullWidth
              aria-label="order table"
              shadow="none"
              classNames={{
                base: "overflow-auto",
              }}
            >
              <TableHeader>
                <TableColumn>品番</TableColumn>
                <TableColumn>品名</TableColumn>
                <TableColumn className="text-center">単価</TableColumn>
                <TableColumn className="text-center">受注数量</TableColumn>
                <TableColumn className="text-center">未出荷数量</TableColumn>
                <TableColumn className="text-center">出荷数量</TableColumn>
                <TableColumn className="text-center">合計金額</TableColumn>
                <TableColumn>コメント</TableColumn>
              </TableHeader>
              <TableBody loadingContent={<Spinner color="white" />}>
                {order.orderDetail.map((item, idx: number) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        defaultValue={item.quantity}
                        className="hidden"
                        {...register(`orderDetails.${idx}.currentQuantity`, {
                          valueAsNumber: true,
                        })}
                      />
                      <input
                        defaultValue={item.skuId}
                        className="hidden"
                        {...register(`orderDetails.${idx}.skuId`)}
                      />
                      {item.productNumber}
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-right w-[150px]">
                      <div className="flex justify-end">
                        <Input
                          type="number"
                          size="sm"
                          className="w-20"
                          defaultValue={String(item.price)}
                          {...register(`orderDetails.${idx}.price`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right w-[150px]">
                      {item.orderQuantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right w-[150px]">
                      {item.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="w-[150px] py-1 px-0">
                      <div className="flex justify-end">
                        <Input
                          type="number"
                          size="sm"
                          color={
                            watch(`orderDetails.${idx}.quantity`) >
                              item.quantity ||
                              getValues(`orderDetails.${idx}.quantity`) < 0
                              ? "danger"
                              : "default"
                          }
                          className="w-20"
                          classNames={{
                            input: "text-center",
                          }}
                          defaultValue={String(item.quantity)}
                          {...register(`orderDetails.${idx}.quantity`, {
                            valueAsNumber: true,
                            max: item.quantity,
                            required: true,
                          })}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        watch(`orderDetails.${idx}.price`) *
                        watch(`orderDetails.${idx}.quantity`)
                      ).toLocaleString() || item.price * item.quantity}
                    </TableCell>
                    <TableCell>{item.memo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <OrderActionButtonArea isPending={isPending} />
      </form>
    </>
  );
}
