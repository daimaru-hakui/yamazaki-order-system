import { ReactNode } from "react";

export default function ProductMasterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="max-w-[calc(700px)] mx-auto">{children}</div>;
}
