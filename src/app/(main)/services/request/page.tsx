"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { submitContactRequest } from "@/app/actions/contact";
import { getPublicServices } from "@/app/actions/public";

function RequestFormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const serviceParam = searchParams.get("service") || "default";

    const [servicesList, setServicesList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

    useEffect(() => {
        getPublicServices().then(data => {
            if (data) setServicesList(data);
            setIsLoading(false);
        });
    }, []);

    const defaultService = {
        title: 'Individuelle Anfrage',
        category: 'Allgemein',
        description: 'Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um Reinigung, Betreuung und Fahrzeugüberführung. Lassen Sie uns wissen, wie wir Ihnen helfen können.',
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCNr5vnQGbosMHVhnXVLaANinBZdqa7CY0gLTLVxMAn3NZLpgrGdHukc6UtzUyPa4lj8807pYhMYGNuxtDqIaCQ-2GSBoReCLwhc9bdMj53vBDS4nEM89gycm12bmynQci4uhn8Ksb-sHAsj7gx_Br_AK9zdXrOEa5NwCABw6TnnukKV4dUId-_h9oz_yw4084v_zZkCbfiicXGfJ4RMF7dsGylFJNkYsBDvoVIPpj6__kYM54E9Z8vD9Rg6sa9tyOpAqmHnnx9ZY',
        features: ['Maßgeschneiderte Lösungen', 'Schnelle Rückmeldung', 'Kompetente Beratung'],
        slug: 'default'
    };

    const targetService = servicesList.find(s => s.slug === serviceParam) || defaultService;
    const activeService = isLoading ? defaultService : targetService;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');
        const formData = new FormData(e.currentTarget);
        try {
            await submitContactRequest(formData);
            router.push('/services/success');
        } catch (error) {
            setStatus('error');
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-[60vh]"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>;
    }

    return (
        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
            <nav className="flex items-center gap-2 mb-10 text-sm">
                <Link className="text-gray-500 hover:text-primary transition-colors font-medium" href="/">Startseite</Link>
                <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                <Link className="text-gray-500 hover:text-primary transition-colors font-medium" href="/services">Leistungen</Link>
                <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                <span className="text-primary font-medium">{activeService.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-6 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <span className="text-primary font-bold tracking-wide uppercase text-sm">{activeService.category}</span>
                        <h1 className="text-4xl md:text-5xl font-black text-secondary leading-[1.1] tracking-tight">
                            {activeService.title}
                        </h1>
                        <p className="text-xl text-gray-800 font-medium leading-relaxed max-w-[540px]">
                            {activeService.description}
                        </p>
                        {activeService.long_description && activeService.long_description !== activeService.description && (
                            <p className="text-lg text-gray-600 leading-relaxed max-w-[540px]">
                                {activeService.long_description}
                            </p>
                        )}
                    </div>

                    <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg relative bg-gray-100 flex items-center justify-center">
                        {activeService.image_url ? (
                            <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700" style={{ backgroundImage: `url('${activeService.image_url}')` }}></div>
                        ) : (
                            <span className="material-symbols-outlined text-6xl text-gray-300">image</span>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <h4 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified</span>
                            Ihre Vorteile bei uns
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {(() => {
                                let features = [];
                                try {
                                    features = typeof activeService.features === 'string' ? JSON.parse(activeService.features) : activeService.features;
                                } catch (e) { }
                                const benefits = (Array.isArray(features) ? features : activeService.benefits) || [];
                                return benefits.map((benefit: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-sm font-bold">check</span>
                                        </span>
                                        <span className="text-gray-700 font-medium">{benefit}</span>
                                    </li>
                                ));
                            })()}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 lg:sticky top-28">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-secondary mb-2">Unverbindliches Angebot anfordern</h3>
                            <p className="text-gray-600 text-sm">Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-secondary">Vorname <span className="text-red-500">*</span></span>
                                    <input name="first_name" required className="w-full h-12 rounded-lg bg-background-light border-transparent px-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 text-secondary" placeholder="Max" type="text" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-secondary">Nachname <span className="text-red-500">*</span></span>
                                    <input name="last_name" required className="w-full h-12 rounded-lg bg-background-light border-transparent px-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 text-secondary" placeholder="Mustermann" type="text" />
                                </label>
                            </div>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">E-Mail-Adresse <span className="text-red-500">*</span></span>
                                <input name="email" required className="w-full h-12 rounded-lg bg-background-light border-transparent px-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 text-secondary" placeholder="max@beispiel.de" type="email" />
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">Telefonnummer</span>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-[20px]">call</span>
                                    <input name="phone" className="w-full h-12 rounded-lg bg-background-light border-transparent pl-11 pr-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 text-secondary" placeholder="+49 (0) 123 ..." type="tel" />
                                </div>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">Gewünschte Leistung</span>
                                <div className="relative">
                                    <select
                                        name="service_interest"
                                        className="w-full h-12 rounded-lg bg-background-light border-transparent px-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all text-secondary appearance-none cursor-pointer"
                                        defaultValue={activeService.title}
                                    >
                                        <option value="Individuelle Anfrage">Individuelle Anfrage</option>
                                        {servicesList.map(s => (
                                            <option key={s.id} value={s.title}>{s.title}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                                </div>
                            </label>

                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">Zusätzliche Informationen <span className="text-red-500">*</span></span>
                                <textarea name="message" required className="w-full rounded-lg bg-background-light border-transparent p-4 focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/50 outline-none transition-all placeholder-gray-400 text-secondary resize-none" placeholder="Teilen Sie uns weitere Details zu Ihrem Anliegen mit..." rows={4}></textarea>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer mt-2">
                                <input required className="mt-1.5 rounded border-gray-300 text-primary focus:ring-primary bg-background-light outline-none" type="checkbox" />
                                <span className="text-sm text-gray-600 leading-normal">
                                    Ich habe die <Link className="text-primary hover:underline" href="/datenschutz">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
                                </span>
                            </label>

                            {status === 'error' && <p className="text-red-500 text-sm">Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.</p>}

                            <button disabled={status === 'submitting'} className="mt-4 flex h-[56px] w-full items-center justify-center gap-2 rounded-full bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50" type="submit">
                                <span>{status === 'submitting' ? 'Wird Gesendet...' : 'Angebot anfragen'}</span>
                                <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ServiceRequestPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span></div>}>
            <RequestFormContent />
        </Suspense>
    );
}
