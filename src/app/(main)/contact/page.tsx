"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { submitContactRequest, submitFeedback } from '@/app/actions/contact';
import { getPublicServices } from '@/app/actions/public';

export default function ContactPage() {
    const [rating, setRating] = useState(0);
    const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const [contactCaptcha, setContactCaptcha] = useState({ num1: 0, num2: 0 });
    const [feedbackCaptcha, setFeedbackCaptcha] = useState({ num1: 0, num2: 0 });
    const [servicesList, setServicesList] = useState<any[]>([]);

    useEffect(() => {
        setContactCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
        setFeedbackCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
        getPublicServices().then(data => {
            if (data) setServicesList(data);
        });
    }, []);

    async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (formData.get('bot_field_honey')) return;

        if (false) {
            alert('Bitte berechnen Sie die Sicherheitsaufgabe korrekt.');
            setContactCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
            return;
        }

        setContactStatus('submitting');
        try {
            await submitContactRequest(formData);
            setContactStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setContactStatus('error');
        }
    }

    async function handleFeedbackSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (formData.get('bot_field_honey')) return;

        if (false) {
            alert('Bitte berechnen Sie die Sicherheitsaufgabe korrekt.');
            setFeedbackCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
            return;
        }

        if (rating === 0) {
            alert('Bitte wählen Sie eine Bewertung aus.');
            return;
        }
        setFeedbackStatus('submitting');
        try {
            await submitFeedback(formData, rating);
            setFeedbackStatus('success');
            setRating(0);
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setFeedbackStatus('error');
        }
    }
    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-10 py-10 lg:py-16">
            <div className="mb-12 max-w-[800px]">
                <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4 tracking-tight">Kontakt & Anfragen</h1>
                <p className="text-lg text-gray-600">Wir sind für Sie da. Kontaktieren Sie uns direkt für ein individuelles Angebot oder teilen Sie uns Ihr Anliegen mit.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start gap-5">
                        <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">location_on</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-secondary mb-1">Besuchen Sie uns</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Weidigweg 2
                                <br />64293 Darmstadt
                                <br />Deutschland
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start gap-5">
                        <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">call</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-secondary mb-1">Rufen Sie uns an</h3>
                            <p className="text-gray-600 leading-relaxed">Mo-Fr von 08:00 bis 18:00 Uhr</p>
                            <a className="text-primary font-semibold hover:underline mt-1 block text-lg" href="#">+49 15563 322378</a>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start gap-5">
                        <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">mail</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-secondary mb-1">Schreiben Sie uns</h3>
                            <p className="text-gray-600 leading-relaxed">Für allgemeine Anfragen und Support</p>
                            <a className="text-primary font-semibold hover:underline mt-1 block text-lg" href="mailto:info@ri-service24.de">info@ri-service24.de</a>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex items-start gap-5">
                        <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">schedule</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-secondary mb-1">Öffnungszeiten</h3>
                            <ul className="text-gray-600 leading-relaxed space-y-1">
                                <li className="flex justify-between w-full min-w-[200px]"><span>Mo. - Fr.</span> <span className="font-medium text-secondary">08:00 - 18:00</span></li>
                                <li className="flex justify-between w-full min-w-[200px]"><span>Samstag</span> <span className="font-medium text-secondary">Nach Vereinbarung</span></li>
                                <li className="flex justify-between w-full min-w-[200px]"><span>Sonntag</span> <span className="font-medium text-secondary">Geschlossen</span></li>
                            </ul>
                        </div>
                    </div>


                </div>

                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                            <span className="bg-primary/10 text-primary p-2 rounded-lg material-symbols-outlined">chat_bubble</span>
                            Nachricht senden
                        </h2>
                        {contactStatus === 'success' ? (
                            <div className="bg-green-50 text-green-700 p-8 rounded-xl text-center border border-green-100">
                                <span className="material-symbols-outlined text-5xl mb-4">check_circle</span>
                                <h3 className="text-xl font-bold mb-2">Vielen Dank für Ihre Nachricht!</h3>
                                <p>Wir haben Ihr Anliegen erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
                                <button onClick={() => setContactStatus('idle')} className="mt-6 px-6 py-2 bg-green-100 rounded-full font-medium hover:bg-green-200 transition-colors">Weitere Nachricht senden</button>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                                <input type="text" name="bot_field_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-secondary">Ihr Name <span className="text-red-500">*</span></span>
                                        <input name="first_name" required className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="Max Mustermann" type="text" />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-secondary">Firmenname (optional)</span>
                                        <input name="company_name" className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="Firma GmbH" type="text" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-secondary">E-Mail-Adresse <span className="text-red-500">*</span></span>
                                        <input name="email" required className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="max@beispiel.de" type="email" />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-secondary">Telefonnummer</span>
                                        <input name="phone" className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="+49 ..." type="tel" />
                                    </label>
                                </div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-secondary">Interessenbereich</span>
                                    <div className="relative">
                                        <select name="service_interest" className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-secondary appearance-none cursor-pointer outline-none transition-all" defaultValue="">
                                            <option disabled value="">Bitte wählen Sie eine Leistung</option>
                                            <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                                            {servicesList.map(s => (
                                                <option key={s.id} value={s.title}>{s.title}</option>
                                            ))}
                                            <option value="Sonstiges">Sonstiges</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">expand_more</span>
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-secondary">Ihre Nachricht <span className="text-red-500">*</span></span>
                                    <textarea name="message" required className="w-full h-32 px-4 py-3 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 resize-none outline-none text-secondary transition-all" placeholder="Wie können wir Ihnen helfen?"></textarea>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer mt-2">
                                    <input required className="mt-1.5 rounded border-gray-300 text-primary focus:ring-primary bg-background-light outline-none" type="checkbox" />
                                    <span className="text-sm text-gray-600 leading-normal">
                                        Ich habe die <Link className="text-primary hover:underline" href="/datenschutz">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
                                    </span>
                                </label>

                                {/* Math Captcha */}
                                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mt-2 flex flex-col md:flex-row gap-4 items-center justify-between">
                                    <span className="text-sm font-bold text-secondary flex items-center gap-2 w-full md:w-auto">
                                        <span className="material-symbols-outlined text-primary">security</span>
                                        Spamschutz: Was ist {contactCaptcha.num1} + {contactCaptcha.num2}?
                                    </span>
                                    <input name="captcha_answer" required type="number" placeholder="Ergebnis..." className="w-full md:w-32 h-10 px-4 rounded-lg bg-white border border-gray-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-secondary transition-all text-center font-bold" />
                                </div>
                                {contactStatus === 'error' && <p className="text-red-500 text-sm">Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.</p>}
                                <button disabled={contactStatus === 'submitting'} className="mt-4 w-full md:w-auto bg-primary text-white font-bold h-12 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2 self-start transform hover:-translate-y-0.5 disabled:opacity-50" type="submit">
                                    <span>{contactStatus === 'submitting' ? 'Sende...' : 'Nachricht senden'}</span>
                                    <span className="material-symbols-outlined text-sm font-bold">send</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div id="feedback" className="mt-12 bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 ">
                <div className="mb-8 text-center">
                    <span className="bg-primary/10 text-primary p-3 rounded-full mb-4 inline-block material-symbols-outlined !text-4xl text-center">star_rate</span>
                    <h2 className="text-2xl font-bold text-secondary mb-2">Feedback zum Service</h2>
                    <p className="text-gray-600">Ihre Meinung ist uns wichtig! Bitte teilen Sie uns Ihre Erfahrungen mit.</p>
                </div>

                {feedbackStatus === 'success' ? (
                    <div className="bg-green-50 text-green-700 p-8 rounded-xl text-center">
                        <span className="material-symbols-outlined text-5xl mb-4">check_circle</span>
                        <h3 className="text-xl font-bold mb-2">Vielen Dank für Ihr Feedback!</h3>
                        <p>Ihre Bewertung hilft uns, unseren Service stetig zu verbessern.</p>
                        <button onClick={() => setFeedbackStatus('idle')} className="mt-4 px-6 py-2 bg-green-100 rounded-full font-medium hover:bg-green-200 transition-colors">Weiteres Feedback abgeben</button>
                    </div>
                ) : (
                    <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-6">
                        <input type="text" name="bot_field_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-sm font-medium text-secondary">Wie bewerten Sie unseren Service? <span className="text-red-500">*</span></span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`material-symbols-outlined text-4xl transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                                    >
                                        star
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">Vorname <span className="text-red-500">*</span></span>
                                <input name="first_name" required className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="Max" type="text" />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-secondary">Nachname <span className="text-red-500">*</span></span>
                                <input name="last_name" required className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="Mustermann" type="text" />
                            </label>
                        </div>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-secondary">Firmenname (optional)</span>
                            <input name="company_name" className="w-full h-12 px-4 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 outline-none text-secondary transition-all" placeholder="Ihre Firma GmbH" type="text" />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-secondary">Ihr Feedback <span className="text-red-500">*</span></span>
                            <textarea name="feedback_text" required className="w-full h-32 px-4 py-3 rounded-lg bg-background-light border border-transparent focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400 resize-none outline-none text-secondary transition-all" placeholder="Ihre ausführliche Bewertung..."></textarea>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer mt-2 mb-2">
                            <input required className="mt-1.5 rounded border-gray-300 text-primary focus:ring-primary bg-background-light outline-none" type="checkbox" />
                            <span className="text-sm text-gray-600 leading-normal">
                                Ich willige ein, dass mein Name, mein Firmenname und meine Bewertung auf der Website veröffentlicht werden dürfen.<br />
                                Ich habe die <Link className="text-primary hover:underline" href="/datenschutz">Datenschutzerklärung</Link> gelesen.
                            </span>
                        </label>

                        {/* Math Captcha */}
                        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <span className="text-sm font-bold text-secondary flex items-center gap-2 w-full md:w-auto">
                                <span className="material-symbols-outlined text-primary">security</span>
                                Spamschutz: {feedbackCaptcha.num1} + {feedbackCaptcha.num2} = ?
                            </span>
                            <input name="captcha_answer" required type="number" placeholder="Ergebnis..." className="w-full md:w-32 h-10 px-4 rounded-lg bg-white border border-gray-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none text-secondary transition-all text-center font-bold" />
                        </div>
                        {feedbackStatus === 'error' && <p className="text-red-500 text-sm text-center">Fehler beim Senden des Feedbacks. Bitte versuchen Sie es später erneut.</p>}
                        <button disabled={feedbackStatus === 'submitting'} className="mt-2 w-full md:w-auto bg-secondary text-white font-bold h-12 px-10 rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 self-center transform hover:-translate-y-0.5 disabled:opacity-50" type="submit">
                            <span>{feedbackStatus === 'submitting' ? 'Sende...' : 'Feedback abschicken'}</span>
                            <span className="material-symbols-outlined text-sm font-bold">rate_review</span>
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
