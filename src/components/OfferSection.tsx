"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ShieldCheck, Truck, Clock } from "lucide-react";

const offers = [
  {
    id: "ice-cool-pro",
    name: "ICE COOL PRO",
    description: "IPL uređaj za trajno uklanjanje dlačica",
    price: 175,
    compareAtPrice: 350,
    image: "/slike/PRO/cover-image.png",
    features: [
      "999,999 bljeskova (traje godinama)",
      "Ice Cool™ tehnologija hlađenja",
      "5 nivoa intenziteta",
      "Auto & Manual mod rada"
    ]
  },
  {
    id: "ice-cool-pro-max",
    name: "ICE COOL Max",
    description: "Profesionalni IPL epilator za najbrže rezultate",
    price: 190,
    compareAtPrice: 380,
    image: "/slike/ELITE/cover.png",
    features: [
      "Max Snaga i veća površina bljeska",
      "Ice Cool+™ napredno hlađenje",
      "999,999 bljeskova (traje godinama)",
      "Brže punjenje između impulsa"
    ]
  },
  {
    id: "ice-cool-lite",
    name: "ICE COOL LITE",
    description: "Kompaktni IPL uređaj za putovanja",
    price: 165,
    compareAtPrice: 330,
    image: "/slike/LITE/cover.png",
    features: [
      "Kompaktan i lagan dizajn",
      "Precizan nastavak za lice",
      "500,000 bljeskova",
      "Savršeno za manja područja"
    ]
  }
];

export default function OfferSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">Super Ponuda</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Odaberite svoj idealan uređaj
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Iskoristite 50% popusta na sve modele. Količine su ograničene!
          </p>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {offers.map((offer, index) => {
            const discount = Math.round(((offer.compareAtPrice - offer.price) / offer.compareAtPrice) * 100);
            const isEven = index % 2 === 0;

            return (
              <div 
                key={offer.id} 
                className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-shadow overflow-hidden border border-white/20"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Product Image Side */}
                  <div className={`relative bg-white/20 min-h-[400px] lg:min-h-[500px] ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <Image
                      src={offer.image}
                      alt={offer.name}
                      fill
                      className="object-cover p-8 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-[#563435] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg z-10">
                      -{discount}% POPUSTA
                    </div>
                  </div>

                  {/* Offer Details Side */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'lg:col-start-1' : ''}`}>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {offer.name}
                    </h3>
                    <p className="text-gray-500 text-lg mb-6">{offer.description}</p>

                    {/* Price Block */}
                    <div className="flex items-end gap-4 mb-8">
                      <span className="text-5xl font-bold text-[#563435]">{offer.price} KM</span>
                      <span className="text-2xl text-gray-400 line-through mb-2">{offer.compareAtPrice} KM</span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-10">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="bg-green-100 p-1.5 rounded-full flex-shrink-0">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={`/proizvod/${offer.id}`} 
                      className="block w-full text-center bg-[#563435] hover:bg-[#6d4446] text-white text-xl font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-8"
                    >
                      Naruči {offer.name}
                    </Link>

                    {/* Guarantees */}
                    <div className="grid grid-cols-3 gap-4 border-t border-gray-200/60 pt-8">
                      <div className="text-center">
                        <Truck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 font-medium block">Besplatna dostava</span>
                      </div>
                      <div className="text-center">
                        <ShieldCheck className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 font-medium block">12 mj. garancija</span>
                      </div>
                      <div className="text-center">
                        <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 font-medium block">Brza isporuka</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
