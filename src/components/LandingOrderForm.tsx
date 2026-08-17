"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Check, Truck, ShieldCheck, CreditCard, ChevronRight, Clock, Gift, ArrowRight } from "lucide-react";
import { trackInitiateCheckout, trackPurchase, trackLead, trackFormStart, trackFormAbandon, getUtmParams, trackCtaClick } from "@/lib/analytics";
import { DeliveryTruck } from "@/components/admin/DeliveryTruck";
import { DeliveredPackage } from "@/components/admin/DeliveredPackage";

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
  const WHATSAPP_PHONE = "38761904759";
  const VIBER_PHONE = "%2B38761904759";
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    product: product.id,
    notes: "",
    sourcePath: pathname || "/naruci",
    website: "",
    formStartedAt: Date.now(),
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const lastFieldRef = useRef<string>("");

  const productImage = product.image || (product.images && product.images[0]) || "/slike/PRO/cover-image.png";
  const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  // Track InitiateCheckout on mount (when user sees the order form)
  useEffect(() => {
    trackInitiateCheckout(product.price);
  }, [product.price]);

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

        <div className="mt-8 bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent backdrop-blur-md rounded-3xl border border-white/40 shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-6">
            <div className="flex flex-col items-center">
              <div className="bg-white/60 rounded-2xl p-6 shadow-sm border border-white/40">
                <DeliveryTruck size={200} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#563435]" />
                <span className="text-sm font-medium text-gray-700">Slanje</span>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <ChevronRight className="w-8 h-8 text-[#563435]/40" />
            </div>
            <div className="md:hidden">
              <ChevronRight className="w-8 h-8 text-[#563435]/40 rotate-90" />
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white/60 rounded-2xl p-6 shadow-sm border border-white/40">
                <DeliveredPackage size={200} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-700">Dostava</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#563435] text-white rounded-xl font-semibold shadow-md">
              <Truck className="w-5 h-5" />
              Dostava 1-3 radna dana
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Besplatna dostava na vašu adresu
            </p>
          </div>
        </div>
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
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Zdravo, želim naručiti ${product.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick("WhatsApp", "order-form", `landing-${product.id}`)}
            className="flex items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-3.5 text-sm font-semibold text-green-700 shadow-sm transition-all hover:bg-green-100 hover:shadow-md"
          >
            <WhatsAppIcon />
            <span>Naruči preko WhatsApp-a</span>
          </a>
          <a
            href={`viber://chat?number=${VIBER_PHONE}`}
            onClick={() => trackCtaClick("Viber", "order-form", `landing-${product.id}`)}
            className="flex items-center justify-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3.5 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:bg-violet-100 hover:shadow-md"
          >
            <ViberIcon />
            <span>Naruči preko Viber-a</span>
          </a>
        </div>
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
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              aria-hidden="true"
            />
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
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Poštanski broj <span className="font-normal text-gray-400">(opcionalno)</span></label>
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
                <p className="font-bold text-gray-800 text-sm">Uputstvo i podrška</p>
                <p className="text-xs text-gray-500">Dobijaš jasne upute za pravilno korištenje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M19.11 17.41c-.28-.14-1.64-.81-1.9-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.38-.82-.73-1.37-1.64-1.53-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01-.18 0-.49.07-.74.35-.25.28-.97.95-.97 2.31s.99 2.69 1.13 2.88c.14.18 1.95 2.97 4.72 4.16.66.28 1.18.45 1.59.57.67.21 1.29.18 1.77.11.54-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.06-.12-.25-.19-.53-.33Z" />
      <path d="M16.01 3.2c-7.07 0-12.8 5.71-12.8 12.75 0 2.25.59 4.45 1.72 6.38L3.1 28.8l6.65-1.73a12.85 12.85 0 0 0 6.26 1.61h.01c7.06 0 12.79-5.71 12.79-12.75 0-3.41-1.33-6.62-3.76-9.03a12.8 12.8 0 0 0-9.04-3.7Zm0 23.31h-.01a10.7 10.7 0 0 1-5.45-1.5l-.39-.23-3.95 1.03 1.05-3.85-.25-.4a10.55 10.55 0 0 1-1.64-5.62c0-5.86 4.79-10.63 10.68-10.63 2.85 0 5.53 1.1 7.54 3.09a10.52 10.52 0 0 1 3.14 7.54c0 5.86-4.8 10.63-10.72 10.63Z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M16 3C8.82 3 3 8.4 3 15.05c0 3.45 1.56 6.55 4.05 8.73V29l5.11-2.8c1.2.33 2.49.5 3.84.5 7.18 0 13-5.4 13-12.05S23.18 3 16 3Zm6.52 17.38c-.3.84-1.76 1.56-2.43 1.6-.64.04-1.46.12-4.71-1.08-3.92-1.45-6.44-5.03-6.63-5.28-.18-.25-1.6-2.11-1.6-4.03s1.01-2.85 1.37-3.23c.36-.38.78-.47 1.05-.47h.76c.24 0 .56-.09.88.67.33.79 1.12 2.74 1.22 2.94.1.2.16.43.03.68-.12.25-.19.4-.37.61-.18.21-.38.47-.54.63-.18.18-.37.37-.16.72.21.35.95 1.56 2.03 2.53 1.4 1.25 2.57 1.64 2.93 1.83.37.18.58.16.79-.1.21-.25.91-1.04 1.15-1.39.24-.35.48-.29.81-.18.33.11 2.09.97 2.45 1.15.36.18.6.27.69.42.09.14.09.81-.21 1.64Z" />
      <path d="M17.56 8.22c2.82.19 5.08 2.3 5.34 5.06.03.34.32.6.66.57a.61.61 0 0 0 .57-.66c-.31-3.37-3.07-5.98-6.49-6.22a.63.63 0 0 0-.67.57c-.03.34.23.65.59.68Zm-1.02 2.45c1.48.11 2.66 1.21 2.83 2.63.04.34.34.58.69.54.34-.04.58-.35.54-.69-.24-2-1.9-3.55-3.96-3.69a.62.62 0 1 0-.1 1.24Zm-.06 2.52a.62.62 0 0 0-.09 1.24c.18.01.33.15.35.32a.62.62 0 1 0 1.23-.13 1.92 1.92 0 0 0-1.49-1.43Z" />
    </svg>
  );
}
