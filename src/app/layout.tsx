import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { Inter as FontSans } from "next/font/google"
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/sonner"
import UserHeader from "~/components/userAccountHeader";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Kanban",
  description: "Manage Tasks with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )} suppressHydrationWarning={true}>
        <TRPCReactProvider>
          <main>
            <UserHeader />
            <div className="p-5 w-full min-h-[calc(100vh-200px)]">
              {children}
            </div>
          </main>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
