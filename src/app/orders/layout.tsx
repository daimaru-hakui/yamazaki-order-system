import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="mt-6">{children}</div>;
}
