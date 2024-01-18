"use client";
import { signOut, useSession } from "next-auth/react";
import { navbarLinks } from "@/utils/links";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Navbar() {
  const session = useSession();
  const logout = async () => {
    await signOut();
  };

  return (
    <header className="(w-full shadow-sm sticky top-0 bg-white">
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
              <Button color="primary" size="sm" onClick={logout}>logout</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
