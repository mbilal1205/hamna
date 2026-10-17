import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const inter    = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const vibes    = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-vibes", display: "swap" });

export const metadata: Metadata = {
  title: "For Jannat 🧸",
  description: "A little something made with love",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${vibes.variable}`}>
      <body className="font-[var(--font-inter)] text-[#F5F5F7] bg-[#0B0B0F] selection:bg-pink-500/40 overflow-hidden">
        {children}
      </body>
    </html>
  );
}