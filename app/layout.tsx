
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";
import CartDrawer from "@/components/CartDrawer";
import CartToastWrapper from "@/components/CartToastWrapper";
import FloatingCartButton from "@/components/FloatingCartButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Choudhary Perfumes | Premium Attars & Designer Perfumes",
  description: "Discover luxury fragrances in Hubli with Choudhary Perfumes. Authentic traditional attars and high-quality designer perfume master copies.",
  icons: {
    icon: '/images/favicon/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <SettingsProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CartToastWrapper />
            <FloatingCartButton />
          </CartProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
