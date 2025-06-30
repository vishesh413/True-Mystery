"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster as Sonner } from "sonner";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Sonner richColors position="top-center" />
    </SessionProvider>
  );
}
