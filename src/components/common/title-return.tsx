import { ReactNode } from "react";

interface TitleWithButtonProps {
  title: string;
  path?: string;
  children?: ReactNode;
}

export default function TitleWithButton({
  title,
  path,
  children,
}: TitleWithButtonProps) {
  return (
    <div className="flex justify-between gap-6 relative">
      <div className="font-bold text-2xl">{title}</div>
      <div className="absolute top-0 right-0">{children}</div>
    </div>
  );
}
