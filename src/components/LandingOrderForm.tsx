"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Check, Truck, ShieldCheck, CreditCard, ChevronRight, Clock, Gift, ArrowRight } from "lucide-react";
import { trackInitiateCheckout, trackPurchase, trackLead, trackFormStart, trackFormAbandon, getUtmParams } from "@/lib/analytics";

interface LandingOrderFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    image?: string;
    images?: string[];
  };
}

export default function LandingOrderForm({ product }: LandingOrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    product: product.id,
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const lastFieldRef = useRef<string>("");

  const productImage = product.image || (product.images && product.images[0]) || "/slike/PRO/cover-image.png";
  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  // Track form abandonment on page leave
  const handleBeforeUnload = useCallback(() => {
    if (formStarted && !submitted && lastFieldRef.current) {
      trackFormAbandon('LandingOrderForm', lastFieldRef.current, product.id);
    }
  }, [formStarted, submitted, product.id]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [handleBeforeUnload]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      trackInitiateCheckout(product.price);

      // Append UTM params to order data
      const utms = getUtmParams();
      const orderData = { ...formData, ...utms };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        trackPurchase(data.orderId, product.price, [{ id: product.id, name: product.name }]);
        trackLead(data.leadId);
        setSubmitted(true);
      } else {
        console.error("Order submission failed:", data.error);
        alert("Greška pri slanju narudžbe. Molimo pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Greška pri slanju narudžbe. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart('LandingOrderForm', product.id);
    }
    lastFieldRef.current = e.target.name;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div id="naruci-form" className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-[2.5rem] p-8 md:p-12 text-center shadow-lg">
        <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Hvala na narudžbi! 🎉
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Narudžba je uspješno primljena. Kontaktirat ćemo te uskoro radi potvrde.
        </p>
        <div className="bg-white/60 rounded-2xl p-6 max-w-md mx-auto border border-white/40 shadow-sm text-left">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" /> Detalji narudžbe:
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex justify-between"><span className="text-gray-500">Ime:</span> <span className="font-medium">{formData.fullName}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Telefon:</span> <span className="font-medium">{formData.phone}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Adresa:</span> <span className="font-medium">{formData.address}, {formData.city}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Proizvod:</span> <span className="font-medium text-[#563435]">{product.name}</span></p>
            <p className="flex justify-between pt-2 border-t border-gray-200"><span className="font-bold">Ukupno:</span> <span className="font-bold text-lg">{product.price.toFixed(2)} KM</span></p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">Isporuka za 1-3 radna dana · Plaćanje pouzećem</p>
      </div>
    );
  }

  return (
    <div id="naruci-form" className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-10">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Naruči {product.name} odmah
        </h2>
        <p className="text-gray-600 text-lg">
          Popuni podatke ispod — plaćaš kuriru kad ti stigne na vrata.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <div className="lg:col-span-7">
          {/* Product Summary Card */}
          <div className="flex items-center gap-4 p-4 mb-6 bg-white/50 rounded-2xl border border-white/40 shadow-sm">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              <Image src={productImage} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{product.name}</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-bold text-[#563435] text-xl">{product.price.toFixed(2)} KM</span>
                <span className="text-sm text-gray-400 line-through">{product.compareAtPrice.toFixed(2)} KM</span>
                <span className="text-xs bg-[#563435] text-white px-2 py-0.5 rounded-full font-semibold">-{discount}%</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Check className="w-3.5 h-3.5" /> Na stanju
            </div>
          </div>

          {/* Shipping Form */}
          <form onSubmit={handleSubmit} id="landing-checkout-form" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ime i prezime *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                  placeholder="Tvoje ime"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                  placeholder="061 123 456"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresa *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                placeholder="Ulica i broj"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Grad *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                  placeholder="Grad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Poštanski broj</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                  placeholder="71000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Napomena <span className="text-gray-400">(opcionalno)</span></label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none resize-none"
                placeholder="Dodatne napomene za kurira..."
              />
            </div>

            {/* Mobile Submit Button */}
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#563435] hover:bg-[#6d4446] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Šaljem narudžbu...
                  </span>
                ) : (
                  <>
                    <span>Naruči — {product.price.toFixed(2)} KM</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Plaćanje pouzećem · Besplatna dostava
              </p>
            </div>
          </form>
        </div>

        {/* Sidebar Summary (desktop) */}
        <div className="hidden lg:block lg:col-span-5 space-y-5 sticky top-24">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Tvoja narudžba</h3>
            
            <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-200/60">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                <Image src={productImage} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500">Količina: 1</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{product.price.toFixed(2)} KM</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm text-gray-600 mb-5">
              <div className="flex justify-between">
                <span>Cijena</span>
                <span>{product.price.toFixed(2)} KM</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Dostava</span>
                <span>Besplatna</span>
              </div>
              <div className="flex justify-between text-[#563435] font-medium text-xs">
                <span>Ušteda</span>
                <span>-{(product.compareAtPrice - product.price).toFixed(2)} KM ({discount}%)</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200/60 text-lg font-bold text-gray-900">
                <span>Ukupno</span>
                <span>{product.price.toFixed(2)} KM</span>
              </div>
            </div>

            <button
              type="submit"
              form="landing-checkout-form"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#563435] hover:bg-[#6d4446] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Šaljem...
                </span>
              ) : (
                <>
                  <span>Naruči odmah</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Sigurna kupovina · Plaćanje pouzećem
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 gap-2.5">
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Truck className="w-4 h-4 text-green-700" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Besplatna dostava</p>
                <p className="text-xs text-gray-500">Isporuka za 1-3 radna dana u BiH</p>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Plaćanje pouzećem</p>
                <p className="text-xs text-gray-500">Plati kuriru kad ti stigne paket</p>
              </div>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-3.5 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-4 h-4 text-purple-700" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">14 dana za povrat</p>
                <p className="text-xs text-gray-500">Ako nisi zadovoljna — bez pitanja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
