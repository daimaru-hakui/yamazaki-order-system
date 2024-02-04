'use client';
import { Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Category, Color, Order, OrderDetail, Product, Sku, User } from "@prisma/client";
import { format } from "date-fns";
import { sumCalc } from "./order-list";
import { useForm, SubmitHandler } from "react-hook-form";
import OrderActionButtonArea from "./order-action-button-area";
import * as actions from "@/actions";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";

interface OrderActionProps {
  order: Order & {
    user: {
      name: string;
    };
    orderDetail: (OrderDetail & {
      sku: Sku & {
        product: Product & {
          color: Color,
          category: Category;
        },
      };
    })[];
  };
}

type Inputs = {
  orderId: number,
  userId: string;
  orderDetails: {
    skuId: string;
    quantity: number;
    price: number;
  }[];
};

export default function OrderAction({ order }: OrderActionProps) {
  const [isPending, startTransition] = useTransition();
  const session = useSession();

  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      orderId: order.id,
    }
  });


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
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
                <dd className="text-sm">{format(order?.createdAt, "yyyy-MM-dd")}</dd>
              </dl>
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs text-gray-400">担当者</dt>
                <dd className="text-sm">{order.uers?.name || "不明"}</dd>
              </dl>
            </div>
            <div className="">
              <dl className="grid grid-cols-2 items-center gap-6">
                <dt className="text-xs sm:text-md text-gray-400 sm:text-right">合　計</dt>
                <dd className="text-sm sm:text-3xl">￥{sumCalc(order.orderDetail).toLocaleString()}</dd>
              </dl>
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
              <TableBody
                loadingContent={<Spinner color="white" />}
              >
                {order.orderDetail.map((item: OrderDetail, idx: number) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        defaultValue={item.sku.id}
                        className="hidden"
                        {...register(`orderDetails.${idx}.skuId`)}
                      />
                      {item.sku.product.productNumber}
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      {item.sku.product.productName}
                    </TableCell>
                    <TableCell className="text-right w-[150px]">
                      <div className="flex justify-end">
                        <Input
                          type="number"
                          size="sm"
                          className="w-20"
                          defaultValue={item.sku.price}
                          {...register(`orderDetails.${idx}.price`, { valueAsNumber: true })}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right w-[150px]">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right w-[150px]">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell className="w-[150px] py-1 px-0">
                      <div className="flex justify-end">
                        <Input
                          type="number"
                          size="sm"
                          color={
                            getValues(`orderDetails.${idx}.quantity`) > item.quantity || getValues(`orderDetails.${idx}.quantity`) < 0 ? "danger" : "default"}
                          className="w-20"
                          classNames={{
                            input: "text-center"

                          }}
                          defaultValue={item.quantity}
                          {...register(`orderDetails.${idx}.quantity`,
                            {
                              valueAsNumber: true,
                              max: item.quantity,
                              required: true
                            }
                          )}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.sku.price * item.quantity).toLocaleString()}
                    </TableCell>
                    <TableCell>{item.sku.productNumber}</TableCell>
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