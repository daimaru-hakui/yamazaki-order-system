"use client";
import { useSession } from "next-auth/react";
import NavDropdown from "./nav-dropdown";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <header className="w-full sticky top-0 z-50 bg-white lg:bg-inherit">
      <div className="flex items-center h-12 p-3">
        <div className="w-full flex items-center justify-between">
          <div>
            {currentPath !== "/" && (
              <button
                onClick={() => {
                  router.back();
                }}
              >
                <AiOutlineLeft />
              </button>
            )}
          </div>
          <div className="flex items-center h-12 lg:hidden">山﨑製パン APP</div>
          {session.data?.user && (
            <>
              <NavDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
