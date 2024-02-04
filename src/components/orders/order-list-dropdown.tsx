import paths from "@/paths";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import { AiOutlineMore } from "react-icons/ai";

interface OrderListDropdownProps {
  orderId: string;
}
export default function OrderListDropdown({ orderId }: OrderListDropdownProps) {

  const items = [
    {
      key: "action",
      label: "出荷",
      path: paths.orderAction(orderId)
    },
    {
      key: "edit",
      label: "編集",
    },
    {
      key: "delete",
      label: "削除",
    }
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <AiOutlineMore size={24} className="cursor-pointer" />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            textValue={item.label}
            className={`${item.key === "delete" ? "text-danger" : ""} p-0`}
          >
            {item.path ?
              <Link href={item.path} className="block w-full h-full p-2">
                {item.label}
              </Link> :
              <div className="block p-2">{item.label}</div>
            }
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}