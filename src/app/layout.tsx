import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { LanguageProvider } from "@/context/LanguageContext";
import { OffersProvider } from "@/context/OffersContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shankar Travels Salem | Luxury Bus & Force Urbania Outstation Booking",
  description: "Book luxury 21-seater Traveller and 17-seater Force Urbania for family trips, corporate tours, and devotional journeys from Salem across Tamil Nadu, Karnataka & Kerala.",
  keywords: ["Shankar Travels", "Salem Travels", "Force Urbania Salem", "Luxury Bus Rental Salem", "Outstation Traveller Salem", "21 Seater Traveller Salem"],
  openGraph: {
    title: "Shankar Travels Salem | Luxury Bus & Urbania Rental",
    description: "Premium outstation vehicle hire in Salem. 17 & 21-seater luxury vehicles with pushback seats and ambient LED lighting.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-inter antialiased selection:bg-gold selection:text-black pb-20 md:pb-0 min-h-screen overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <OffersProvider>
            <LanguageProvider>
              <Navbar />
              {children}
              <FloatingWhatsApp />
              <MobileBottomBar />
            </LanguageProvider>
          </OffersProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
