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
    <div className="w-full max-w-[calc(600px)] mx-auto">
      <OrderCompleate orderId={params.orderId} />
    </div>
  );
}
