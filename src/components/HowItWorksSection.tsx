"use client";

import Image from "next/image";
import { Sparkles, Zap, Check } from "lucide-react";

const steps = [
  {
    title: "Priprema",
    description: "Obrij područje i očisti kožu prije tretmana.",
    image: "/slike/Gemini_Generated_Image_3nt72c3nt72c3nt7.png",
    icon: Sparkles
  },
  {
    title: "Tretman",
    description: "Prisloni uređaj i pritisni tipku za bljesak.",
    image: "/slike/Gemini_Generated_Image_ct06zvct06zvct06.png",
    icon: Zap
  },
  {
    title: "Rezultat",
    description: "Ponovi svake sedmice za trajno glatku kožu.",
    image: "/slike/Gemini_Generated_Image_sbj41esbj41esbj4.png",
    icon: Check
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#563435] font-semibold tracking-wider uppercase text-sm">
            Tehnologija
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Salon rezultati bez odlaska u salon
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            IPL tehnologija (Intense Pulsed Light) djeluje direktno na korijen dlačice, uspavljujući njen rast. Sigurno, bezbolno i efikasno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-3">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#563435]/10 text-[#563435] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
