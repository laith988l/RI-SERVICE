"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-primary text-white">
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className={`inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wider mb-6 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        LERNEN SIE UNS KENNEN
                    </span>
                    <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight drop-shadow-sm transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Über RI Service
                    </h1>
                    <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Ihr zuverlässiger Partner für erstklassige Unternehmens- und Privatdienstleistungen in Darmstadt und ganz Deutschland.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 md:py-32 flex-grow bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary">Wer wir sind</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                RI Service ist ein inhabergeführtes Dienstleistungsunternehmen mit Sitz in Darmstadt. Wir haben es uns zur Aufgabe gemacht, Unternehmen und Privatpersonen durch höchste Qualität und absolute Zuverlässigkeit zu entlasten.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Unser Leistungsspektrum reicht von der professionellen Gebäudereinigung über den umfassenden Hausmeisterservice bis hin zu sicheren europaweiten Fahrzeugüberführungen. Ein kompetentes und engagiertes Team ist das Fundament unseres Erfolges.
                            </p>
                        </div>
                        <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 hover:bg-transparent transition-colors duration-500"></div>
                            <img alt="RI Service Team" className="w-full h-full object-cover" src="/about.png" />
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Unsere Werte</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Darauf können Sie sich bei jeder Zusammenarbeit mit RI Service verlassen.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">verified</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Maximale Qualität</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Wir verwenden modernstes Equipment und setzen auf geschultes Personal, um Ergebnisse zu liefern, die nicht nur oberflächlich glänzen.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">handshake</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Absolute Zuverlässigkeit</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Pünktlichkeit und Diskretion sind für uns selbstverständlich. Absprachen und Termine werden strikt eingehalten.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-3xl">support_agent</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Kundennähe</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Jedes Projekt ist individuell. Wir hören Ihnen genau zu und passen unsere Dienstleistungen exakt an Ihre spezifischen Anforderungen an.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Bereit für eine Zusammenarbeit?</h2>
                    <p className="text-gray-300 mb-10 text-lg">Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen oder Ihren Alltag entlasten können.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
                        Kontakt Aufnehmen
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
