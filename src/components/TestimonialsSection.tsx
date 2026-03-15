"use client";

import { Star, CheckCircle } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Amra",
    age: 23,
    location: "Sarajevo",
    date: "Mart 2026",
    content: "Godinama sam izbjegavala kratke haljine jer sam uvijek imala urasle dlačice na nogama. Nakon 5 tretmana Ice Cool PRO-om, koža mi je čista kao nikad. Prošlo ljeto sam prvi put nosila mini suknju bez da sam se brinula.",
    rating: 5,
    image: "/slike/1772396139-pexels-foundertips-4745140.webp"
  },
  {
    id: 2,
    name: "Selma",
    age: 28,
    location: "Mostar",
    date: "Februar 2026",
    content: "Radim smjene i jednostavno nisam imala vremena za salone. Sad radim tretman nedjeljom uveče uz seriju — 10 minuta za noge, i to je to. Već nakon mjesec dana nisam trebala brijati pazuhe uopšte.",
    rating: 5,
    image: "/slike/1772396140-pexels-nuta-sorokina-8514313.webp"
  },
  {
    id: 3,
    name: "Lejla",
    age: 31,
    location: "Tuzla",
    date: "Januar 2026",
    content: "Bila sam skeptična jer sam imala loše iskustvo sa voskom. Ali ovo je potpuno drugačije — ne boli, a koža je glatđa svake sedmice. Muž mi je prvi primijetio razliku, a to mi sve govori.",
    rating: 5,
    image: "/slike/lejla-review.png"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Žene iz BiH dijele svoja iskustva
          </h2>
          <p className="text-lg text-gray-600">
            Prave priče, pravi rezultati — bez filtera i lažih obećanja
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-sm">
              {/* User Image */}
              {testimonial.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.age} godina · {testimonial.location}</p>
                    <p className="text-xs text-gray-400">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
