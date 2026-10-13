import type { Metadata } from "next";
import { OffersProvider } from "@/context/OffersContext";

export const metadata: Metadata = {
  title: "Admin Panel · Shankar Travels",
  description: "Shankar Travels Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <OffersProvider>
      {children}
    </OffersProvider>
  );
}
