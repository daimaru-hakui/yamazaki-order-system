"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  className?:string
}

export default function FormButton({ children,className }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="primary" isLoading={pending} className={className}>
      {children}
    </Button>
  );
}
