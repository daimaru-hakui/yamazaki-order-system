import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface TitleReturnProps {
  title: string;
  path: string;
  children?: ReactNode;
}

export default function TitleReturn({
  title,
  path,
  children,
}: TitleReturnProps) {
  return (
    <div className="flex justify-center gap-6 relative">
      <Link
        href={path}
        className="flex items-center gap-3 absolute inset-y-1/2 left-0"
      >
        <AiOutlineArrowLeft />
        <div className="text-sm">戻る</div>
      </Link>
      <div className="font-bold text-2xl">{title}</div>
      <div className="absolute top-0 right-0">{children}</div>
    </div>
  );
}
