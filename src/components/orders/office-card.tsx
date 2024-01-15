interface OfficeCardProps {
  title: string;
}

export default function OfficeCard({ title }: OfficeCardProps) {
  return (
    <div className="p-6 border rounded cursor-pointer">
      <div>{title}</div>
    </div>
  );
}
