import { ReactNode } from "react";

export default function ProductMasterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
