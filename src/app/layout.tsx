import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";
import SwRegister from "@/components/sw-register/SwRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Budgetify",
  description: "A simple budgeting app",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SwRegister />
        <div className="flex flex-col min-h-screen w-full">
          <NavBar />
          <div className="flex-grow max-w-7xl mx-auto py-6">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
