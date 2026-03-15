import { Zap, Snowflake, Infinity, Sliders } from "lucide-react";

export default function USPSection() {
  const usps = [
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Salon rezultati kod kuće",
      description: "Ista IPL tehnologija koju koriste saloni, ali bez zakazivanja termina i čekanja u redu.",
      bgColor: "bg-amber-100/50"
    },
    {
      icon: <Snowflake className="w-8 h-8 text-blue-500" />,
      title: "Bezbolno — zaista",
      description: "Ugrađeno hlađenje štiti kožu dok uređaj radi. Većina korisnica kaže: 'Jedva nešto osjetim'.",
      bgColor: "bg-blue-100/50"
    },
    {
      icon: <Infinity className="w-8 h-8 text-purple-500" />,
      title: "Kupiš jednom, koristiš 10+ godina",
      description: "999.999 bljeskova znači da ne trebaš kupovati zamjene, dopune ili rezervne dijelove. Nikad.",
      bgColor: "bg-purple-100/50"
    },
    {
      icon: <Sliders className="w-8 h-8 text-emerald-500" />,
      title: "Prilagodiš ga svom tijelu",
      description: "5 nivoa intenziteta — blaži za lice i bikini, jači za noge. Ti kontrolišeš sve.",
      bgColor: "bg-emerald-100/50"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Zašto baš Ice Cool PRO™?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Četiri razloga zašto hiljade žena u BiH biraju upravo ovaj uređaj.
          </p>
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
