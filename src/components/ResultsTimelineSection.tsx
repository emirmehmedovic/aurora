import { Calendar, TrendingDown, Sparkles } from "lucide-react";

export default function ResultsTimelineSection() {
  const steps = [
    {
      icon: <Calendar className="w-8 h-8 text-[#563435]" />,
      week: "Sedmica 1-2",
      title: "Prvu razliku osjetiš prstima",
      description: "Dlačice rastu sporije i tanje. Prolaziš rukom po nozi i umjesto bockanja osjetiš glatkoću koja traje duže nego ikad."
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-[#563435]" />,
      week: "Sedmica 3-6",
      title: "Počinješ 'zaboravljati' na brijanje",
      description: "Na pazusima i rukama skoro da nema ništa. Noge briješ možda jednom sedmično. Počinješ razmišljati: 'Stvarno radi'."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#563435]" />,
      week: "Sedmica 8+",
      title: "Sloboda — bez brijanja, bez brige",
      description: "Obučeš šortice bez da razmisliš o nogama. Ideš na bazen bez stresa. Tretman održavanja jednom mjesečno je sve što trebaš."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">Vremenska Linija</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-800">
            Tvoje prvih 8 sedmica
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Evo šta ćeš primijetiti kad počneš koristiti Ice Cool PRO™. Svaka žena je drugačija, ali većina prati ovaj put.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#563435]/20 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/60 backdrop-blur-xl border-2 border-white rounded-full flex items-center justify-center shadow-xl mb-6 relative group hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50"></div>
                  <div className="relative z-10">
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#563435] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                
                <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-sm w-full hover:shadow-md transition-shadow">
                  <div className="text-[#563435] font-bold text-sm uppercase tracking-wider mb-2">
                    {step.week}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
