"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
export interface SessionProviderProos {
  children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProos) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
