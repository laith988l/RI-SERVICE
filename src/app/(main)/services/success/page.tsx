export default function SuccessPage() {
 return (
 <main className="flex-grow flex items-center justify-center px-6 py-20">
 <div className="max-w-[600px] w-full bg-white rounded-[24px] shadow-[0px_10px_25px_rgba(0,0,0,0.05)] p-10 text-center flex flex-col items-center">
 <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-8">
 <span className="material-symbols-outlined text-primary text-5xl font-bold">check</span>
 </div>
 <h1 className="text-[#111111] text-[48px] font-bold leading-tight mb-4">Vielen Dank!</h1>
 <p className="text-[#6B7280] text-lg leading-relaxed mb-10 max-w-[400px]">
 Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.
 </p>
 <button className="bg-primary hover:bg-primary/90 text-white text-base font-bold py-4 px-12 rounded-[28px] transition-all shadow-xl shadow-primary/25">
 Zur Startseite
 </button>
 <div className="mt-12 w-full h-48 rounded-2xl overflow-hidden">
 <img alt="Abstract purple gradient pattern" className="w-full h-full object-cover opacity-80 " data-alt="Abstract vibrant purple gradient wave pattern" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPoTxDvCOX8gPt1qfR2h2sFL-WX5kr4hpX9AtpKTqOx44qnq4gnqkZlHMm1E_6PzIPPenKm1GvlYHNcvj3YbFSV4vkEeSRzxiqnpoWfchegu8YFtye5u3TzVOCSADuigffHVQLzL_wdZEkgsyvlSB1WbUfOqfz5ziyrNPeh6bp-hWs6dudOSVjXdbGfPCu6IeqVEkjrJSgzjqnm_tIhQxMbRnKOBRcvaqzIRo1D1OLFnxyeXtx-cOa3fdk_bRNx8zXpXxwR3MubVM" />
 </div>
 </div>
 </main>
 );
}
