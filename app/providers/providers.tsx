"use client";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

type P = PropsWithChildren;

export default function Providers({ children }: P) {
  
  return ( // you can have multiple client side providers wrapped, in this case I am also using NextUIProvider
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        {children}
      </ThemeProvider>
    </>
  );
}