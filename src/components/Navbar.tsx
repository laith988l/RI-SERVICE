"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/photo/logo.png";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src={logo}
                            alt="RI Service Logo"
                            width={25}
                            height={25}
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="text-[18px] font-medium tracking-tighter text-primary drop-shadow-sm transition-all duration-300 ml-1.5">
                            RI Service
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link className={`font-medium text-sm transition-colors ${pathname === "/" ? "text-primary" : "text-gray-600 hover:text-primary"}`} href="/">Startseite</Link>
                        <Link className={`font-medium text-sm transition-colors ${pathname.startsWith("/about") ? "text-primary" : "text-gray-600 hover:text-primary"}`} href="/about">Über uns</Link>
                        <Link className={`font-medium text-sm transition-colors ${pathname.startsWith("/services") ? "text-primary" : "text-gray-600 hover:text-primary"}`} href="/services">Leistungen</Link>
                        <Link className={`font-medium text-sm transition-colors ${pathname.startsWith("/contact") ? "text-primary" : "text-gray-600 hover:text-primary"}`} href="/contact">Kontakt</Link>
                    </div>
                    <div className="hidden md:flex">
                        <Link href="/services/request"
                            className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2.5 px-6 rounded-full transition-colors duration-200 flex items-center gap-2">
                            <span >Mehr erfahren</span>
                            <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                            <span className="material-symbols-outlined">{isMobileMenuOpen ? "close" : "menu"}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 shadow-lg absolute w-full left-0">
                    <Link onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/" ? "text-primary bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`} href="/">Startseite</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith("/about") ? "text-primary bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`} href="/about">Über uns</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith("/services") ? "text-primary bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`} href="/services">Leistungen</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith("/contact") ? "text-primary bg-primary/5" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`} href="/contact">Kontakt</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/services/request" className="mt-4 flex justify-center items-center w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-full transition-colors duration-200">
                        Mehr erfahren
                    </Link>
                </div>
            )}
        </nav>
    );
}
