import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar/NavBar";
import Footer from "@/components/footer/Footer";
import SwRegister from "@/components/sw-register/SwRegister";
import Provider from "@/components/provider/Provider";

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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SwRegister />
        <Provider>
          <div className="flex flex-col min-h-screen w-full">
            <NavBar />
            <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
