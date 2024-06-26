import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import AuthProvider from "@/providers/auth-provider";
import { getServerAuthSession } from "@/server/auth";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

export const metadata = {
  title: "Task Management",
  description: "Task Management",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AuthProvider session={session}>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <div className="mx-auto min-h-screen w-full max-w-7xl space-y-6">
                <Header />
                <main className="p-4 md:px-8">{children}</main>
              </div>
            </ThemeProvider>
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
