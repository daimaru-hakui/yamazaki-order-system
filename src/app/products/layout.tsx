import { ReactNode } from "react";

export default function ProductsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}