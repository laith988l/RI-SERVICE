import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Datenschutzerklärung | RI Service',
    description: 'Datenschutzerklärung und Informationen zum Umgang mit Ihren Daten bei der RI Service GmbH.',
};

export default function DatenschutzPage() {
    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-10 py-10 lg:py-16">
            <div className="mb-12 max-w-[800px] mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-primary/10 text-primary p-3 rounded-2xl material-symbols-outlined !text-4xl flex items-center justify-center">policy</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary tracking-tight">Datenschutz</h1>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Willkommen auf unserer Datenschutzseite. Hier erfahren Sie, wie die RI Service GmbH mit Ihren personenbezogenen Daten umgeht, wenn Sie unsere Website besuchen.
                </p>
            </div>

            <div className="max-w-[800px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16 hover:shadow-md transition-shadow duration-300">
                <div className="prose prose-slate prose-lg max-w-none text-gray-600 prose-headings:text-secondary prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-p:leading-relaxed">

                    <h2 className="text-2xl mt-0 mb-4">1. Verantwortliche Stelle</h2>
                    <p>Die Datenverarbeitung auf dieser Website erfolgt durch:</p>
                    <p>

                        <strong>Firmenname (falls vorhanden):</strong> RI Service<br />
                        <strong>Name des Inhabers:</strong> Rami Alali<br />
                        <strong>Adresse:</strong> Weidigweg 2<br />
                        64297 Darmstadt<br />
                        Deutschland

                    </p>
                    <p>
                        <strong>E-Mail:</strong> <a href="mailto:info@ri-service24.de">info@ri-service24.de</a><br />
                        <strong>Telefon:</strong> +49 15563 322378
                    </p>

                    <h2 className="text-2xl mt-8 mb-4">2. Datenerfassung auf dieser Website (Server-Log-Dateien)</h2>
                    <p>Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien. Dazu gehören:</p>
                    <ul>
                        <li>Browsertyp</li>
                        <li>Betriebssystem</li>
                        <li>Uhrzeit der Anfrage</li>
                        <li>IP-Adresse</li>
                    </ul>
                    <p>Diese Daten dienen ausschließlich der technischen Sicherheit und Funktionsfähigkeit der Website.<br />
                        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>

                    <h2 className="text-2xl mt-8 mb-4">3. Kontaktformular</h2>
                    <p>Wenn Sie uns über das Kontaktformular kontaktieren, werden folgende Daten verarbeitet:</p>
                    <ul>
                        <li>Name</li>
                        <li>E-Mail-Adresse</li>
                        <li>Firmenname (freiwillig)</li>
                        <li>Telefonnummer (freiwillig, nicht verpflichtend)</li>
                        <li>Nachricht</li>
                    </ul>
                    <p>Die Angabe der Telefonnummer ist freiwillig und dient ausschließlich einer schnelleren Kontaktaufnahme, sofern gewünscht.</p>
                    <p>Die Verarbeitung erfolgt zum Zweck der Bearbeitung Ihrer Anfrage gemäß <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>.</p>
                    <p>Die Daten werden gespeichert, bis Ihre Anfrage vollständig bearbeitet wurde oder Sie die Löschung verlangen, sofern keine gesetzlichen Aufbewahrungspflichten bestehen. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche Einwilligung.</p>

                    <h2 className="text-2xl mt-8 mb-4">4. Feedback- und Bewertungsformular</h2>
                    <p>Wenn Sie eine Bewertung abgeben, werden folgende Daten verarbeitet:</p>
                    <ul>
                        <li>Name</li>
                        <li>Firmenname</li>
                        <li>Bewertung</li>
                        <li>Beschreibung</li>
                    </ul>
                    <p>Eine Veröffentlichung erfolgt nur nach Ihrer ausdrücklichen Einwilligung.<br />
                        Rechtsgrundlage ist <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>.</p>
                    <p>Sie können die Löschung Ihrer Bewertung jederzeit per E-Mail an <a href="mailto:info@ri-service24.de">info@ri-service24.de</a> beantragen.</p>

                    <h2 className="text-2xl mt-8 mb-4">5. Cookies</h2>
                    <p>Unsere Website verwendet ausschließlich technisch notwendige Cookies zur Sicherstellung der Funktionalität (z. B. Administrator-Login). Es erfolgt keine Nutzung von Analyse- oder Marketing-Tools.</p>

                    <h2 className="text-2xl mt-8 mb-4">6. Soziale Medien</h2>
                    <p>Auf unserer Website befinden sich externe Links zu sozialen Netzwerken (z. B. Facebook und Instagram). Beim Anklicken eines solchen Links werden Sie auf die jeweilige Plattform weitergeleitet. Wir haben keinen Einfluss auf die Datenverarbeitung durch diese Anbieter.</p>

                    <h2 className="text-2xl mt-8 mb-4">7. Ihre Rechte</h2>
                    <p>Sie haben jederzeit das Recht auf:</p>
                    <ul>
                        <li>Auskunft</li>
                        <li>Berichtigung</li>
                        <li>Löschung</li>
                        <li>Einschränkung der Verarbeitung</li>
                        <li>Widerspruch</li>
                    </ul>
                    <p>Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter <a href="mailto:info@ri-service24.de">info@ri-service24.de</a>.</p>

                    <h2 className="text-2xl mt-8 mb-4">8. Datensicherheit</h2>
                    <p>Wir treffen angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer personenbezogenen Daten.</p>

                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Zurück zur Startseite
                    </Link>
                </div>
            </div>
        </main>
    );
}
