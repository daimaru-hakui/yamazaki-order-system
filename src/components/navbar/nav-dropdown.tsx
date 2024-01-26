"use client";
import { navbarLinks } from "@/utils/links";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

export default function NavDropdown() {
  const logout = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="flex justify-center items-center p-2 bg-blue-500 rounded cursor-pointer">
            <AiOutlineMenu color="white"/>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownSection>
            <DropdownItem key="商品一覧">
              <Link href={"/products"} className="text-sm">
                <button>商品一覧</button>
              </Link>
            </DropdownItem>
            <DropdownItem key="商品登録">
              <Link href={"/products/new"} className="text-sm">
                <button>商品登録</button>
              </Link>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem key="顧客一覧">
              <Link href={"/customers"} className="text-sm">
                <button>顧客一覧</button>
              </Link>
            </DropdownItem>
            <DropdownItem key="顧客登録">
              <Link href={"/customers/new"} className="text-sm">
                <button>顧客登録</button>
              </Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownItem showDivider key="発注登録">
            <Link href={"/orders/new"} className="text-sm">
              <button>発注登録</button>
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logout}>
            ログアウト
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
