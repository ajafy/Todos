import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "../Providers/QueryProvider";
import AuthProvider from "src/Providers/AuthProvider";
import { SessionProvider } from "next-auth/react";
import { GlobalProvider } from "src/Providers/GlobalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todos",
  description: "To Do List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-palette-background`}
      >
        <SessionProvider>
          <GlobalProvider>
            <AuthProvider>
              <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
          </GlobalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
