import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baby Learn - 宝宝学英语和古诗",
  description: "Interactive English and Chinese poetry learning for toddlers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-gradient-to-b from-sky-100 via-pink-50 to-yellow-50">
        {children}
      </body>
    </html>
  );
}
