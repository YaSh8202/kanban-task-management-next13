import { unstable_getServerSession } from "next-auth";
import "../styles/globals.css";
import Providers from "./(providers)/providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />
      <body className="bg-light-main dark:bg-dark-main">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
