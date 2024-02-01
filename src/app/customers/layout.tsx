import { ReactNode } from "react";

export default function CustomersPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full m-6">{children}</div>;
}