import Link from "next/link";
import { getPublicServices } from "@/app/actions/public";

export default async function ServicesPage() {
 const services = await getPublicServices();
 return (
 <main className="flex-grow w-full">
 <section className="py-20 px-6 text-center">
 <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">

 <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-secondary">
 Unsere Dienstleistungen
 </h1>
 <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
 Wir bieten Ihnen ein umfassendes Leistungsspektrum rund um Reinigung, Betreuung und Fahrzeugüberführung zuverlässig, flexibel und kundenorientiert.
 </p>
 </div>
 </section>

 <section className="px-6 pb-24">
 <div className="max-w-[1280px] mx-auto flex flex-col gap-16 md:gap-24">

 {services.map((service, index) => {
 const isEven = index % 2 === 0;

 return (
 <div key={service.id} className="group relative grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
 <div className={`flex flex-col gap-6 order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
 <div className="flex flex-col gap-3">
 <span className="text-primary font-bold tracking-wide uppercase text-sm">{service.category}</span>
 <h2 className="text-3xl font-bold text-secondary">{service.title}</h2>
 <p className="text-gray-600 leading-relaxed">
 {service.description}
 </p>
 </div>
 <ul className="flex flex-col gap-3 text-gray-700">
 {Array.isArray(service.features) && service.features.map((feature: string, idx: number) => (
 <li key={idx} className="flex items-center gap-3">
 <span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary">
 <span className="material-symbols-outlined text-sm font-bold">check</span>
 </span>
 {feature}
 </li>
 ))}
 </ul>
 <Link href={`/services/request?service=${service.slug}`} className="mt-4 w-fit h-12 flex items-center justify-between px-8 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all gap-4 group-hover:pr-6 relative z-20">
 Mehr erfahren
 <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
 </Link>
 </div>
 <div className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
 {service.image_url ? (
 <img alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={service.image_url} />
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-300">
 <span className="material-symbols-outlined text-6xl">image</span>
 </div>
 )}
 </div>
 </div>
 );
 })}

 </div>
 </section>

 <section className="bg-primary py-20 px-6 mt-auto">
 <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
 <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
 Bereit für den nächsten Schritt?
 </h2>
 <p className="text-white/80 text-lg max-w-2xl">
 Kostenlose Besichtigung möglich. Individuelles Angebot innerhalb von 24 Stunden. Kontaktieren Sie uns noch heute.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <Link href="/services/request" className="h-12 flex items-center px-8 rounded-full bg-white text-primary font-bold hover:bg-slate-50 transition-colors shadow-lg">
 Kontaktieren Sie uns
 </Link>
 </div>
 </div>
 </section>
 </main>
 );
}
