"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  isPending?: boolean;
  className?: string;
}

export default function FormButtonClient({ children, isPending, className }: FormButtonProps) {

  return (
    <Button type="submit" color="primary" isLoading={isPending} className={className}>
      {children}
    </Button>
  );
}