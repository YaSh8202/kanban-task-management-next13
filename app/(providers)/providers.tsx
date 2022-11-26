"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AppContextProvider } from "./contextProvider";

type P = PropsWithChildren & {
  session: Session | null;
};

export default function Providers({ children, session }: P) {
  return (
    // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <SessionProvider session={session}>
        <ThemeProvider enableSystem={true} attribute="class">
          <AppContextProvider>{children}</AppContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
