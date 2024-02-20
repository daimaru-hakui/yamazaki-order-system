import { ReactNode } from "react";

export default function OrdersLayout({ children }: { children: ReactNode; }) {
  return <div className="my-6">{children}</div>;
}
