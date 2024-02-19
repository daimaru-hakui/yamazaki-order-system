import { ReactNode } from "react";

export default function OrdersLayout({ children }: { children: ReactNode; }) {
  return <div className="mt-6">{children}</div>;
}
