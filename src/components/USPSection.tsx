import { Zap, Snowflake, Infinity, Sliders } from "lucide-react";

export default function USPSection() {
  const usps = [
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "IPL Tehnologija",
      description: "Napredna tehnologija svjetlosnih impulsa koja klinički dokazano zaustavlja rast dlačica.",
      bgColor: "bg-amber-100/50"
    },
    {
      icon: <Snowflake className="w-8 h-8 text-blue-500" />,
      title: "Sistem Hlađenja",
      description: "Ice Cool™ tehnologija hladi kožu tokom tretmana, sprječavajući crvenilo i bol.",
      bgColor: "bg-blue-100/50"
    },
    {
      icon: <Infinity className="w-8 h-8 text-purple-500" />,
      title: "999.999 Impulsa",
      description: "Gotovo neograničen vijek trajanja lampe. Dovoljno za preko 10 godina redovne upotrebe.",
      bgColor: "bg-purple-100/50"
    },
    {
      icon: <Sliders className="w-8 h-8 text-emerald-500" />,
      title: "Više Nivoa Intenziteta",
      description: "Prilagodljiva jačina bljeska za sve tipove kože, čak i za najosjetljivija područja.",
      bgColor: "bg-emerald-100/50"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Vrhunska tehnologija u vašim rukama
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, index) => (
            <div 
              key={index} 
              className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-8 hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl ${usp.bgColor} flex items-center justify-center mb-6`}>
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{usp.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
