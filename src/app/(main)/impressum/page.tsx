import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impressum | RI Service',
    description: 'Rechtliche Informationen und Anbieterkennzeichnung der RI Service GmbH.',
};

export default function ImpressumPage() {
    return (
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-10 py-10 lg:py-16">
            <div className="mb-12 max-w-[800px] mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <span className="bg-primary/10 text-primary p-3 rounded-2xl material-symbols-outlined !text-4xl flex items-center justify-center">gavel</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary tracking-tight">Impressum</h1>
                </div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Rechtliche Informationen und Anbieterkennzeichnung der RI Service GmbH.
                </p>
            </div>

            <div className="max-w-[800px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16 hover:shadow-md transition-shadow duration-300">
                <div className="prose prose-slate prose-lg max-w-none text-gray-600 prose-headings:text-secondary prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-p:leading-relaxed">

                    <h2 className="text-2xl mt-0 mb-4">Angaben gemäß § 5 TMG</h2>
                    <p>

                        <strong>Company name:</strong><br />
                        RI Service
                    </p>
                    <p>
                        <strong>Inhaber:</strong><br />
                        Rami Alali
                    </p>
                    <p>
                        <strong>Address:</strong><br />
                        Weidigweg 2<br />
                        64297 Darmstadt<br />
                        Deutschland
                    </p>

                    <h2 className="text-2xl mt-8 mb-4">Contact</h2>
                    <p>
                        <strong>E-Mail:</strong> <a href="mailto:info@ri-service24.de">info@ri-service24.de</a><br />
                        <strong>Telefon:</strong> +49 15563 322378
                    </p>




                    <h2 className="text-2xl mt-8 mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                    <p>
                        Rami Alali<br />
                        Weidigweg 2<br />
                        64297 Darmstadt<br />
                        Deutschland
                    </p>

                    <h2 className="text-2xl mt-8 mb-4">Haftung für Inhalte</h2>
                    <p>
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p>
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>

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
