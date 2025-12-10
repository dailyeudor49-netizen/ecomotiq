import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAdsPixel from "./components/GoogleAdsPixel";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: { default: "Ecomotiq | Tech Wholesale Spain", template: "%s | Ecomotiq" },
  description: "Spanish wholesale electronics distributor. Premium tech products, fast delivery across Europe, competitive B2B pricing.",
  keywords: ["wholesale electronics spain", "tech distributor", "spanish wholesale", "electronics b2b"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <FacebookPixel />
        <GoogleAdsPixel />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
