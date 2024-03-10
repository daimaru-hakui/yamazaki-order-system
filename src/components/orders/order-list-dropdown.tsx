import paths from "@/paths";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import { useTransition } from "react";
import { AiOutlineMore } from "react-icons/ai";
import * as actions from "@/actions";

interface OrderListDropdownProps {
  orderId: number;
  totalQuantity: number;
}
export default function OrderListDropdown({ orderId, totalQuantity }: OrderListDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const deleteOrder = async (id: number) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;
    startTransition(async () => {
      const error = await actions.deleteOrder(id);
      console.log(error);
    });
  };

  const links = [
    {
      key: "action",
      label: "出荷",
      path: paths.orderAction(String(orderId)),
      isExist: totalQuantity === 0 ? false : true
    },
    {
      key: "edit",
      label: "編集",
      isExist: true
    },
    {
      key: "delete",
      label: "削除",
      isExist: true,
      onClick: () => deleteOrder(orderId)
    }
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <AiOutlineMore size={24} className="cursor-pointer" />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={links}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            textValue={item.label}
            className={`${item.key === "delete" ? "text-danger" : ""} p-0`}
          >
            {item.path ?
              <Link href={item.path}
                className={`block w-full h-full p-2 ${!item.isExist && "hidden"}`}
              >
                {item.label}
              </Link> :
              <div className="block p-2" onClick={item.onClick}>{item.label}</div>
            }
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}