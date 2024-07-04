import type { Metadata } from "next";
import React from "react";
import { Providers } from "@/app/ui/all/providers";

export const metadata: Metadata = {
  title: "Login page",
  description: "Login to your climat-guardian account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  );
}