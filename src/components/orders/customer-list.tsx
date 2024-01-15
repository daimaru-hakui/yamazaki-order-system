import OfficeCard from "./customer-card";

export default function CustomerList() {
  const data = [
    {
      id: 0,
      name: "大阪第一工場",
    },
    {
      id: 1,
      name: "大阪第二工場",
    },
    {
      id: 2,
      name: "京都工場",
    },
    {
      id: 3,
      name: "阪南工場",
    },
    {
      id: 4,
      name: "名古屋工場",
    },
  ];
  return (
    <div className="flex flex-row gap-3">
      {data.map((customer) => (
        <OfficeCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}
