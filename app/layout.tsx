import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Context Menu Demo",
  description: "Zustand를 사용한 Context Menu 데모",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

