import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Premium Travels | Comfortable Journeys",
  description: "Premium vehicle portfolio, featuring our Luxury Traveller and Force Urbania.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-charcoal text-gray-200 font-inter antialiased pb-16 md:pb-0">
        <LanguageProvider>
          <Navbar />
          {children}
          <MobileBottomBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
