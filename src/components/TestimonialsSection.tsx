"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Amra",
    age: 23,
    content: "Nakon nekoliko tretmana primijetila sam sporiji rast i puno manje iritacija. Najviše mi znači što sve mogu uraditi kod kuće, bez salona i bez stresa.",
    rating: 5,
  },
  {
    id: 2,
    name: "Samanta",
    age: 31,
    content: "Imam osjetljivu kožu i upravo mi je sistem hlađenja bio presudan. Tretman je mnogo ugodniji nego što sam očekivala, a rezultati su sve bolji iz sedmice u sedmicu.",
    rating: 5,
  },
  {
    id: 3,
    name: "Derva",
    age: 24,
    content: "Ranije sam trošila mnogo novca na salonske tretmane. Ovaj uređaj mi daje osjećaj kontrole, jer tretman radim kad meni odgovara.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Šta kažu naše korisnice
          </h2>
          <p className="text-lg text-gray-600">
            Pročitajte iskustva zadovoljnih korisnica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.age} godina</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
