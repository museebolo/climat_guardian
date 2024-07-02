import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
