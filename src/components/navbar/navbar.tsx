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
    <header className="w-full sticky top-0 z-50">
      <div className="flex items-center h-12 p-3">
        <div className="w-full flex items-center justify-between md:justify-end">
          <div className="flex items-center h-12 md:hidden">山﨑製パン APP</div>
          {session.data?.user && (
            <>
              <div className="mr-3 gap-3 hidden md:flex">
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
              </div>
              <NavDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
