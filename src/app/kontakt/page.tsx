"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Contact form failed:", data.error);
        alert("Greška pri slanju poruke. Molimo pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Greška pri slanju poruke. Molimo pokušajte ponovo.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-[#563435] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Poruka poslata!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Hvala što ste nas kontaktirali. Odgovorićemo vam u najkraćem mogućem roku.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-block px-8 py-3 bg-[#563435] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Pošalji novu poruku
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Kontaktirajte nas
            </h1>
            <p className="text-lg text-gray-600">
              Rado ćemo odgovoriti na sva vaša pitanja
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone */}
              <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#563435] rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
                <p className="text-gray-600">+387 XX XXX XXX</p>
                <p className="text-sm text-gray-500 mt-2">Pon-Pet: 9:00 - 17:00</p>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#563435] rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600">info@icecoolpro.ba</p>
                <p className="text-sm text-gray-500 mt-2">Odgovaramo u roku 24h</p>
              </div>

              {/* Address */}
              <div className="bg-gradient-to-br from-rose-50/30 via-white/40 to-pink-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#563435] rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Adresa</h3>
                <p className="text-gray-600">Bosna i Hercegovina</p>
                <p className="text-sm text-gray-500 mt-2">Dostava na cijelu BiH</p>
              </div>

              {/* Working Hours */}
              <div className="bg-gradient-to-br from-amber-50/30 via-white/40 to-orange-50/20 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                <div className="w-12 h-12 bg-[#563435] rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Radno vrijeme</h3>
                <div className="text-gray-600 text-sm space-y-1">
                  <p>Ponedjeljak - Petak: 9:00 - 17:00</p>
                  <p>Subota: 10:00 - 14:00</p>
                  <p>Nedjelja: Zatvoreno</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pošaljite nam poruku</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                        Ime i prezime *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                        placeholder="Vaše ime i prezime"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                        placeholder="vas.email@primjer.ba"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                        placeholder="+387 XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                        Tema *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors"
                      >
                        <option value="">Odaberite temu</option>
                        <option value="product">Pitanje o proizvodu</option>
                        <option value="order">Status narudžbe</option>
                        <option value="delivery">Dostava</option>
                        <option value="return">Povrat proizvoda</option>
                        <option value="technical">Tehnička podrška</option>
                        <option value="other">Ostalo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                      Poruka *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-[#563435] focus:outline-none transition-colors resize-none"
                      placeholder="Unesite vašu poruku..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-8 bg-[#563435] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    Pošalji poruku
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
