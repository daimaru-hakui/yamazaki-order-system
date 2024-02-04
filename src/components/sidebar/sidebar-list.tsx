"use client";
import { sidebarLinks } from "@/utils/links";
import { Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { commonColors, semanticColors } from "@nextui-org/theme";

export default function SidebarList() {
  const url = usePathname();

  console.log(url);
  return (
    <div>
      <Listbox aria-label="Actions" color="primary">
        {sidebarLinks.map(({ path, name }) => (
          <ListboxItem
            textValue={name}
            key={path}
            className={`${path === url ? "bg-gray-100" : ""}`}
          >
            <Link href={path} className="flex h-full">
              {name}
            </Link>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
