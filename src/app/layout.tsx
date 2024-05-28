import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/Context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Court Monitor",
  description: "Organize Your Sport Programs!",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>{
      <AppWrapper>{children}</AppWrapper>}</body>
    </html>
  );
}
