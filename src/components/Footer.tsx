import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/photo/logo.png';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <Image
                                src={logo}
                                alt="RI Service Logo"
                                width={40}
                                height={40}
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-[18px] font-medium tracking-tighter text-primary drop-shadow-sm transition-all duration-300 ml-1.5">
                                RI Service
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Ihr Partner für erstklassige Unternehmensdienstleistungen. Wir verbinden Qualität mit Innovation.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a className="text-gray-400 hover:text-primary transition-colors flex items-center justify-center h-8 w-8" href="#">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors flex items-center justify-center h-8 w-8" href="#">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors flex items-center justify-center h-8 w-8" href="mailto:info@ri-service.de">
                                <span className="sr-only">Email</span>
                                <span className="material-symbols-outlined !text-[24px]">mail</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-secondary mb-4">Unternehmen</h4>
                        <ul className="space-y-3 text-sm">

                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="#">Startseite</a></li>
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="/about">Über uns</a></li>
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="/contact">Kontakt</a></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-secondary mb-4">Leistungen</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="#">Baustellen & Bauendreinigung</a></li>
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="#">Gebäudereinigung</a></li>
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="#">Fahrzeugüberführung</a></li>
                            <li><a className="text-gray-500 hover:text-primary transition-colors" href="#">Hausmeisterservice</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-secondary mb-4">Kontakt</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                                <span className="text-gray-500">Weidigweg 2<br />64297 Darmstadt <br />Deutschland</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                                <a className="text-gray-500 hover:text-primary" href="mailto:info@ri-service.de">[EMAIL_ADDRESS]</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                                <a className="text-gray-500 hover:text-primary" href="tel:+493012345678">+49 15563 322378</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2026 RI Service . Alle Rechte vorbehalten.</p>
                    <div className="flex gap-6 text-sm">
                        <Link className="text-gray-400 hover:text-primary transition-colors" href="/impressum">Impressum</Link>
                        <Link className="text-gray-400 hover:text-primary transition-colors" href="/datenschutz">Datenschutz</Link>

                    </div>
                </div>
            </div>
        </footer>
    );
}
