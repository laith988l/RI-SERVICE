import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 display: "swap",
 weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
 title: "RI Service - Auth",
 description: "Professionelle Dienstleistungen für Ihr Unternehmen",
};

export default function LoginLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="de">
 <head>
 <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
 </head>
 <body className={`${inter.variable} bg-background-light font-display antialiased min-h-screen`}>
 {children}
 </body>
 </html>
 );
}
