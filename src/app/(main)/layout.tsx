import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 display: "swap",
 weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
 title: "RI Service",
 description: "Professionelle Dienstleistungen für Ihr Unternehmen",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="de">
 <head>
 <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
 </head>
 <body className={`${inter.variable} min-h-screen flex flex-col font-display`}>
 <Navbar />
 {children}
 <Footer />
 </body>
 </html>
 );
}
