import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function SolutionSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-violet-50/40 via-white/50 to-purple-50/30 backdrop-blur-xl border border-white/30 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12 lg:p-16">
            
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-bold w-fit mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Konačno rješenje</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Rješenje za glatku kožu bez svakodnevnog brijanja
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ice Cool PRO koristi naprednu IPL tehnologiju koja nježno djeluje na korijen dlačice i postepeno usporava njen rast. 
                Zaboravite na bolne depilacije i iritacije.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800">Napredna IPL Tehnologija</h4>
                    <p className="text-gray-600 text-sm mt-1">Svjetlosni impulsi uspavljuju folikul dlačice za dugotrajne rezultate.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-[#563435] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-800">Ice Cool™ Hlađenje</h4>
                    <p className="text-gray-600 text-sm mt-1">Ugrađeni sistem hlađenja čini tretman potpuno bezbolnim i ugodnim.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-white/40 shadow-inner flex items-center justify-center">
              {/* TODO: Replace with actual product/lifestyle image */}
              <div className="text-center text-gray-400">
                <Image 
                  src="/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp" 
                  alt="Ice Cool PRO Rješenje" 
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
