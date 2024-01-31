"use client";
import { useSession } from "next-auth/react";
import { navbarLinks } from "@/utils/links";
import Link from "next/link";
import NavDropdown from "./nav-dropdown";
import paths from "@/paths";
import { Button } from "@nextui-org/react";

export default function Navbar() {
  const session = useSession();

  return (
    <header className="(w-full shadow-sm sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between h-[calc(50px)] p-3">
        <Link href="/">
          <div>山崎製パン オーダーシステム</div>
        </Link>
        <div className="flex gap-3 items-center">
          {session.data?.user && (
            <>
              <Button
                color="primary"
                variant="solid"
                size="sm"
                className="p-0"
              >
                <Link
                  href={paths.orderAll()}
                  className="w-full h-full grid place-items-center"
                >
                  受注一覧
                </Link>
              </Button>
              <Button
                color="primary"
                variant="bordered"
                size="sm"
                className="p-0"
              >
                <Link
                  href={paths.orderCreate()}
                  className="w-full h-full grid place-items-center"
                >
                  発注
                </Link>
              </Button>
              <Button
                color="primary"
                variant="bordered"
                size="sm"
                className="p-0"
              >
                <Link
                  href={paths.csvCreate()}
                  className="w-full h-full grid place-items-center"
                >
                  CSV発注
                </Link>
              </Button>
              <NavDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
