import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-[#563435] to-[#7a484a] rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-white/10">
          
          {/* Inner Light Effect */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Za 8 sedmica možeš zaboraviti <br className="hidden md:block" /> da žileti uopšte postoje.
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto">
              Svaki dan koji odgađaš je još jedno jutro sa brijačem u ruci. Počni danas — rezultati za 8 sedmica.
            </p>
            <p className="text-sm text-white/60 mb-10 max-w-xl mx-auto">
              Ako imaš pitanje prije narudžbe, piši nam direktno. Dobijaš jasne informacije, besplatnu dostavu i plaćanje pouzećem.
            </p>

            <Link 
              href="/naruci"
              className="group relative inline-flex items-center gap-3 bg-white text-[#563435] px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Želim glatku kožu
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Micro Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-white/80" />
                <span className="text-sm font-medium text-white/90">Dostava u BiH 1-3 dana</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-white/80" />
                <span className="text-sm font-medium text-white/90">Plaćanje pouzećem</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-white/80" />
                <span className="text-sm font-medium text-white/90">plaćanje pouzećem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
