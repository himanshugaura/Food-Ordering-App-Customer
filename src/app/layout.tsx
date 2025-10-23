import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/store/providers";
import AuthGuard from "@/components/common/AuthGaurd";

export const metadata: Metadata = {
  title: "Foody",
   description: "Order delicious food with ease directly from your table at Foody. Browse our menu, customize your meal, and enjoy a seamless dining experience with our in-restaurant ordering app.",
  keywords: [
    "Foody",
    "restaurant",
    "in-restaurant ordering",
    "food ordering app",
    "table ordering",
    "digital menu",
    "order food online",
    "restaurant technology",
    "contactless dining",
    "Foody menu"
  ],
};

import { Abel } from "next/font/google";

const abel = Abel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abel",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={abel.className}
      >
        <Providers><AuthGuard>{children}</AuthGuard></Providers>
      </body>
    </html>
  );
}
