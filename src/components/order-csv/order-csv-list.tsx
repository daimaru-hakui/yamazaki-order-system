interface OrderCsvListProps {
  data: any;
}
export default function OrderCsvList({ data }: OrderCsvListProps) {
  return (
    <div>
      {data.map((item: any, idx: number) => (
        <div key={idx}>{item.productId}</div>
      ))}
    </div>
  );
}