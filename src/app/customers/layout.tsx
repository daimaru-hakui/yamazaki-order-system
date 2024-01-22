import { ReactNode } from "react";

export default function CustomersPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full p-6">{children}</div>;
}