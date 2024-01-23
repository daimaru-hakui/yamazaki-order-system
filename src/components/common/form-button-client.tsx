"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  isPending?:boolean
}

export default function FormButtonClient({ children,isPending }: FormButtonProps) {

  return (
    <Button type="submit" color="primary" isLoading={isPending}>
      {children}
    </Button>
  );
}