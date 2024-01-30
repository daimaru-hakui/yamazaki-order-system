import paths from "@/paths";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface OrderCompleatePageProps {
  params: {
    orderId: string;
  };
}
export default function OrderCompleatePage({
  params,
}: OrderCompleatePageProps) {
  return (
    <div className="w-full max-w-[calc(600px)] mx-auto">
      <div className="p-6 text-center bg-white rounded-xl drop-shadow-md">
        <div className="text-xl text-center">登録完了</div>
        <div className="mt-6">No.{params.orderId}</div>
        <div className="mt-6">
          <Button color="primary" className="p-0">
            <Link href={paths.orderAll()} className="px-3 w-full">発注一覧へ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
