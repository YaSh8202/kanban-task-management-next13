"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

type P = PropsWithChildren;

export default function Providers({ children, session }: any) {
  return (
    // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <SessionProvider session={session}>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
