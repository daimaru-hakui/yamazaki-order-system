import OfficeCard from "./office-card";

export default function OfficeList() {
  const officeArray = [
    {
      id: 0,
      title: "大阪第一工場",
    },
    {
      id: 1,
      title: "大阪第二工場",
    },
    {
      id: 2,
      title: "京都工場",
    },
    {
      id: 3,
      title: "阪南工場",
    },
    {
      id: 4,
      title: "名古屋工場",
    },
  ];
  return (
    <div className="flex flex-row gap-3">
      {officeArray.map((office) => (
        <OfficeCard key={office.id} title={office.title} />
      ))}
    </div>
  );
}
