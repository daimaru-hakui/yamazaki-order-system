"use client"
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";
export default function NextUIProviders({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
