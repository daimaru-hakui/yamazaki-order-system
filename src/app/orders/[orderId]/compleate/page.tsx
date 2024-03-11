import OrderCompleate from "@/components/orders/order-complate";

interface OrderCompleatePageProps {
  params: {
    orderId: string;
  };
}
export default function OrderCompleatePage({
  params,
}: OrderCompleatePageProps) {
  return (
    <div className="w-full max-w-[calc(600px)] mx-auto p-6">
      <OrderCompleate orderId={params.orderId} />
    </div>
  );
}
