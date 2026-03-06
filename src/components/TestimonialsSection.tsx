"use client";

import { Star, CheckCircle } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Amra",
    age: 23,
    content: "Nakon nekoliko tretmana primijetila sam sporiji rast i puno manje iritacija. Najviše mi znači što sve mogu uraditi kod kuće, bez salona i bez stresa.",
    rating: 5,
    image: "/slike/1772396139-pexels-foundertips-4745140.webp"
  },
  {
    id: 2,
    name: "Selma",
    age: 28,
    content: "Odlična investicija! Koža mi je glađa, a dlačice rastu sporije. Preporučujem svima koji žele profesionalne rezultate kod kuće.",
    rating: 5,
    image: "/slike/1772396140-pexels-nuta-sorokina-8514313.webp"
  },
  {
    id: 3,
    name: "Lejla",
    age: 31,
    content: "Nisam mogla vjerovati koliko je jednostavno za korištenje. Rezultati su vidljivi već nakon par tretmana. Presretna sam!",
    rating: 5,
    image: "/slike/1772396139-pexels-foundertips-4745140.webp"
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
                    <p className="text-sm text-gray-600">{testimonial.age} godina</p>
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
