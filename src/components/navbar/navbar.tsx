"use client";
import { useSession } from "next-auth/react";
import { navbarLinks } from "@/utils/links";
import Link from "next/link";
import NavDropdown from "./nav-dropdown";

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
              {navbarLinks.map(({ name, path }) => (
                <Link href={path} key={name} className="text-sm">
                  <button>{name}</button>
                </Link>
              ))}
              <NavDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
