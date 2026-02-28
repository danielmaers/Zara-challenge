import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Zara | Smartphones",
  description: "Zara smartphone catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
