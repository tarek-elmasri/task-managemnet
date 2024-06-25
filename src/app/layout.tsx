import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import AuthProvider from "@/providers/auth-provider";
import { getServerAuthSession } from "@/server/auth";
import { ThemeProvider } from "@/providers/theme-provider";

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
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
