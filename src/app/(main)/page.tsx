"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getApprovedTestimonials, getPublicServices } from "@/app/actions/public";

const testimonials = [
    {
        quote: "Die Zusammenarbeit mit RI Service hat unsere Erwartungen übertroffen. Die Professionalität und das Engagement des Teams sind einzigartig in der Branche.",
        name: "Thomas Weber",
        title: "CEO, TechVision GmbH",
        rating: 5
    },
    {
        quote: "Zuverlässige und gründliche Gebäudereinigung. Seit wir mit RI Service zusammenarbeiten, glänzen unsere Büros wieder. Absolut empfehlenswert!",
        name: "Sabine Müller",
        title: "Facility Managerin, BuildPro",
        rating: 5
    },
    {
        quote: "Unsere Fahrzeugüberführungen laufen dank RI Service immer reibungslos, pünktlich und extrem sicher ab. Ein echter Premium-Partner.",
        name: "Klaus Wagner",
        title: "Fuhrparkleiter, AutoLogistics",
        rating: 5
    }
];

export default function HomePage() {
    const [testimonialsList, setTestimonialsList] = useState(testimonials);
    const [servicesList, setServicesList] = useState<any[]>([]);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        getApprovedTestimonials().then(data => {
            if (data && data.length > 0) {
                setTestimonialsList(data);
            }
        });
        getPublicServices().then(data => {
            if (data && data.length > 0) {
                setServicesList(data);
            }
        });
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonialsList.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
    };

    useEffect(() => {
        const timer = setInterval(nextTestimonial, 8000); // Auto-scroll every 8 seconds
        return () => clearInterval(timer);
    }, [testimonialsList.length]);

    return (
        <main className="flex flex-col min-h-screen">
            <section className="px-4 py-6 md:px-8 max-w-7xl mx-auto w-full">
                <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden min-h-[560px] flex items-center bg-cover bg-center group" data-alt="Modern corporate office interior with glass walls" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBfV4nhyA87S_iqxD1sjG-l1xZyDzlRsi3sFRHlPz79NODLC0muCh9tVEigZqkhjsTy9kSV6YOO4TcU7jLmMHC0t_-DZ3-VQ9MsnN_Ts2XhHLQv41K-No4ZRldpFFXCrc5IT9qF49Qs7CKj_Hr8bkRfhux9sFmroZvB_6Y2SReR_QZBNS2h7Gs2UjfJQC4PC4CSvJtL_V6r4V8F1rEGo-lXMdF6Wu9HzXvPrwYvPCYLW9qOmyx3Mem1VQoouvDie7MTzfnvBdXKYu0')" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 px-6 md:px-12 py-12 max-w-6xl mx-auto flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[24px] font-bold mb-6">
                            RI Service
                        </div>


                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-wide">
                            Ihr Partner für professionelle Dienstleistungen in ganz Deutschland
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-[640px] mb-8">
                            Wir bieten professionelle Gebäudereinigung, Hausmeisterservice und sichere Fahrzeugüberführungen zuverlässig, flexibel und termingerecht.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/services" className="bg-white flex items-center justify-center text-primary hover:bg-gray-100 font-bold py-3.5 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-0.5">
                                Unsere Leistungen </Link>
                            <Link href="/contat" className="bg-transparent flex items-center justify-center border border-white text-white hover:bg-white/10 font-bold py-3.5 px-8 rounded-full transition-colors duration-200">
                                Kontaktieren Sie uns </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="uber-uns"
                className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2 text-[22px]">Über RI Service</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-secondary leading-tight mb-4">

                                RI Service ist ein zuverlässiges Dienstleistungsunternehmen mit Sitz in Darmstadt und deutschlandweitem Einsatzgebiet.
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Wir stehen für professionelle Gebäudereinigung, Hausmeisterservice und Fahrzeugüberführungen – sauber, termingerecht und kundenorientiert.
                                Qualität, Zuverlässigkeit und langfristige Zusammenarbeit stehen bei uns im Mittelpunkt. Unser Ziel ist es, unseren Kunden einen starken und vertrauensvollen Servicepartner an die Seite zu stellen.

                            </p>
                        </div>
                        {/*<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
 <span className="material-symbols-outlined">verified</span>
 </div>
 <h4 className="font-bold text-lg text-secondary">Qualitätsgarantie</h4>
 <p className="text-sm text-gray-500">Höchste Standards in jedem Projektschritt.</p>
 </div>
 <div className="flex flex-col gap-2">
 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
 <span className="material-symbols-outlined">group</span>
 </div>
 <h4 className="font-bold text-lg text-secondary">Erfahrenes Team</h4>
 <p className="text-sm text-gray-500">Experten, die Ihre Sprache sprechen.</p>
 </div>
 </div>
 <Link href="/contact" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all w-fit group">
 Über uns lesen
 <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
 </Link>*/}
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative z-10" data-alt="Team meeting in a modern conference room">
                            <img alt="Team meeting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA437DXG6z2pqWzkCit5ofLvZLcD7DAOpc3gJIhbgRtzAbBHj8EStYsjpbtuT7zf6SK1dJ0axXmCILFhoXm9s6Hh-bcU7zqIGgZFKlVKEFu3I_BiTKumWROxP3OKMuOE19QThiJPMXkXuomjI3AunRAYjtib8Td51TqZrgfxK4a2tkBoH6w23wzSf64qJb2L369r0kkeqK23JD4SxQrmx2-miCJSV0_SRxD6zK-uhNPyMl3T-4FugsVrrtMpGyC20g2joHID3oW69Y" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/5 rounded-xl -z-0"></div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Warum RI Service?</h2>
                        <p className="text-gray-600 text-lg">Weil wir auf langfristige Zusammenarbeit setzen.
                            Unser Ziel ist Vertrauen durch kontinuierlich zuverlässige Leistung.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">psychology</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Strukturierte Organisation
                            </h3>
                            <p className="text-gray-600 leading-relaxed">Definierte Prozesse schaffen Planbarkeit und professionelle Umsetzung in Transport, Reinigungs und Objektservices.</p>
                        </div>
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">verified_user</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Partnerschaft auf Augenhöhe</h3>
                            <p className="text-gray-600 leading-relaxed">Wir setzen auf stabile, vertrauensvolle Zusammenarbeit mit Unternehmen in ganz Deutschland.</p>
                        </div>
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">support_agent</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Klare Kommunikation</h3>
                            <p className="text-gray-600 leading-relaxed">Direkte Ansprechpartner und transparente Abstimmungen gewährleisten effiziente Zusammenarbeit.</p>
                        </div>
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">rocket_launch</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Transparente Kalkulation</h3>
                            <p className="text-gray-600 leading-relaxed">Nachvollziehbare Preisgestaltung bildet die Grundlage für langfristige Geschäftsbeziehungen.</p>
                        </div>
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">handshake</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Partnerschaft</h3>
                            <p className="text-gray-600 leading-relaxed">Wir sehen uns nicht nur als Dienstleister, sondern als langfristiger Partner an Ihrer Seite.</p>
                        </div>
                        <div className="bg-background-light p-8 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-3xl">schedule</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Pünktlichkeit</h3>
                            <p className="text-gray-600 leading-relaxed">Zeit ist Geld. Wir garantieren die Einhaltung vereinbarter Fristen und Meilensteine.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Unsere Dienstleistungen</h2>
                        <p className="text-gray-600 max-w-xl">Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um Reinigung, Betreuung und Fahrzeugüberführung zuverlässig, flexibel und kundenorientiert.</p>
                    </div>
                    <Link className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors" href="/services">
                        Alle Leistungen ansehen
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {servicesList.length > 0 ? servicesList.map((service: any) => (
                        <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                            <div className="h-64 overflow-hidden" data-alt={service.title}>
                                {service.image_url ? (
                                    <img alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={service.image_url} />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined text-4xl">image</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <ul className="flex flex-col gap-2 text-gray-700 mb-6 flex-grow text-sm">
                                    {(() => {
                                        let features = [];
                                        try {
                                            features = typeof service.features === 'string' ? JSON.parse(service.features) : service.features;
                                        } catch (e) { }
                                        return Array.isArray(features) ? features.slice(0, 3).map((feature: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="flex-shrink-0 flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary mt-0.5">
                                                    <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                                                </span>
                                                <span className="leading-snug">{feature}</span>
                                            </li>
                                        )) : null;
                                    })()}
                                </ul>
                                <Link className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all relative z-20 w-fit" href={`/services/request?service=${service.slug}`}>
                                    Mehr erfahren
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500 italic col-span-2 text-center py-12">Lade Dienstleistungen...</p>
                    )}
                </div>
            </section>

            <section className="py-24 bg-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                <div className="max-w-4xl mx-auto px-4 md:px-16 text-center relative z-10 min-h-[300px] flex flex-col justify-center">

                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Das sagen unsere Kunden</h2>
                        <p className="text-white/80 text-lg">Erfahren Sie, warum Unternehmen in ganz Deutschland auf RI Service vertrauen.</p>
                    </div>

                    {testimonialsList.length > 0 ? (
                        <>
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-20"
                            >
                                <span className="material-symbols-outlined !text-3xl">chevron_left</span>
                            </button>

                            <div className="transition-all duration-700 ease-in-out opacity-100 transform translate-x-0 max-w-2xl mx-auto w-full px-4" key={currentTestimonial}>
                                <div className="bg-white text-secondary p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center text-center relative hover:-translate-y-1 transition-transform duration-300">
                                    <span className="material-symbols-outlined absolute top-6 right-6 text-5xl text-primary/10 rotate-180">format_quote</span>

                                    <div className="flex gap-1 text-yellow-500 mb-6 drop-shadow-sm">
                                        {[...Array(Math.max(1, testimonialsList[currentTestimonial]?.rating || 5))].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                    </div>

                                    <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-10 w-full italic text-gray-700">
                                        "{testimonialsList[currentTestimonial]?.quote}"
                                    </blockquote>

                                    <div className="flex items-center gap-4 mt-auto bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-inner">
                                            {testimonialsList[currentTestimonial]?.name?.charAt(0) || 'C'}
                                        </div>
                                        <div className="text-left flex flex-col">
                                            <cite className="not-italic font-bold text-sm leading-tight text-secondary">{testimonialsList[currentTestimonial]?.name}</cite>
                                            <span className="text-gray-500 text-xs leading-tight">{testimonialsList[currentTestimonial]?.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={nextTestimonial}
                                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-20"
                            >
                                <span className="material-symbols-outlined !text-3xl">chevron_right</span>
                            </button>
                        </>
                    ) : (
                        <div className="text-center mt-8">
                            <span className="material-symbols-outlined !text-6xl text-primary/50 mb-8">format_quote</span>
                            <p className="text-xl md:text-2xl font-medium text-white/70">Noch keine Bewertungen verfügbar.</p>
                        </div>
                    )}
                </div>

                {testimonialsList.length > 0 && (
                    <div className="flex justify-center gap-2 mt-8 relative z-10 w-full">
                        {testimonialsList.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonial(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'bg-primary scale-110 md:w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                aria-label={`Gehe zu Testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                <div className="flex justify-center mt-12 relative z-10">
                    <Link href="/contact#feedback" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5">
                        Feedback hinterlassen
                        <span className="material-symbols-outlined text-sm">edit</span>
                    </Link>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto bg-primary rounded-2xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für den nächsten Schritt?</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Kostenlose Besichtigung möglich.
                            Individuelles Angebot innerhalb von 24 Stunden.</p>
                        <Link href="/services/request" className="bg-white flex items-center justify-center w-fit mx-auto text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors shadow-lg">
                            Kontaktieren Sie uns </Link>
                    </div>
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </section>
        </main>
    );
}
