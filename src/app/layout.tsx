import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
