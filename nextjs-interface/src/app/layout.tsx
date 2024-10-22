import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/ui/all/providers";

export const metadata: Metadata = {
  title: "Climat guardian",
  description: "connect to our site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
