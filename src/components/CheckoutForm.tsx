"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Check, Truck, ShieldCheck, Clock, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";
import { trackInitiateCheckout, trackPurchase, trackLead, updateAdvancedMatching } from "@/lib/analytics";
import { getAttributionForOrder } from "@/lib/attribution";
import { DeliveryTruck } from "@/components/admin/DeliveryTruck";
import { DeliveredPackage } from "@/components/admin/DeliveredPackage";

type CheckoutProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  shortDescription: string;
};

const productFeatures: Record<string, string[]> = {
  "ice-cool-pro": ["Najprodavaniji model", "Napredno hlađenje", "5 nivoa jačine"],
  "ice-cool-pro-max": ["Veća površina bljeska", "Brži tretmani", "Profesionalni rezultati"],
  "ice-cool-lite": ["Kompaktan dizajn", "Idealno za putovanja", "Odlično za početnike"],
};

type CheckoutFormProps = {
  initialProduct?: string;
  products: CheckoutProduct[];
};

export default function CheckoutForm({ initialProduct, products }: CheckoutFormProps) {
  const pathname = usePathname();
  const preferredProduct =
    products.find(
      (product) => product.slug === initialProduct || product.id === initialProduct
    ) ?? products[0] ?? null;
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    product: preferredProduct?.slug || products[0]?.slug || "ice-cool-pro",
    notes: "",
    sourcePath: pathname || "/naruci",
    website: "",
    formStartedAt: Date.now(),
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(preferredProduct ?? products[0]);

  useEffect(() => {
    const product = products.find(p => p.slug === formData.product);
    if (product) {
      setSelectedProduct(product);
      trackInitiateCheckout(product.price);
    }
  }, [formData.product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, ...getAttributionForOrder() }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update Meta Pixel with user data for advanced matching
        // Split full name into first and last name
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        updateAdvancedMatching({
          email: formData.email || undefined,
          phone: formData.phone,
          firstName: firstName,
          lastName: lastName,
          city: formData.city,
          zip: formData.zipCode || undefined,
          country: 'ba', // Bosnia and Herzegovina
        });

        trackPurchase(data.orderId, selectedProduct.price, [{ id: formData.product, name: selectedProduct.name }]);
        trackLead(data.leadId);
        setSubmitted(true);
      } else {
        console.error("Order submission failed:", data.error);
        alert("Greška pri slanju narudžbe. Molimo pokušajte ponovo.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Greška pri slanju narudžbe. Molimo pokušajte ponovo.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSelect = (productId: string) => {
    setFormData((current) => ({ ...current, product: productId }));
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-lg">
        <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Hvala na narudžbi!
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Vaša narudžba je uspješno primljena. Naš tim će vas uskoro kontaktirati radi potvrde.
        </p>
        <div className="bg-white/60 rounded-2xl p-6 max-w-md mx-auto border border-white/40 shadow-sm text-left">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-600" /> Detalji narudžbe:
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p className="flex justify-between"><span className="text-gray-500">Ime:</span> <span className="font-medium">{formData.fullName}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Telefon:</span> <span className="font-medium">{formData.phone}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Adresa:</span> <span className="font-medium">{formData.address}, {formData.city}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Proizvod:</span> <span className="font-medium text-[#563435]">{selectedProduct.name}</span></p>
            <p className="flex justify-between pt-2 border-t border-gray-200"><span className="font-bold">Ukupno:</span> <span className="font-bold text-lg">{selectedProduct.price.toFixed(2)} KM</span></p>
          </div>
        </div>

        {/* Delivery Animation Section */}
        <div className="mt-8 bg-gradient-to-br from-[#563435]/5 via-amber-50/30 to-transparent backdrop-blur-md rounded-3xl border border-white/40 shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-6">
            {/* Shipping Animation */}
            <div className="flex flex-col items-center">
              <div className="bg-white/60 rounded-2xl p-6 shadow-sm border border-white/40">
                <DeliveryTruck size={200} />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#563435]" />
                <span className="text-sm font-medium text-gray-700">Slanje</span>
              </div>
            </div>

            {/* Arrow or Divider */}
            <div className="hidden md:flex items-center">
              <ChevronRight className="w-8 h-8 text-[#563435]/40" />
            </div>
            <div className="md:hidden">
              <ChevronRight className="w-8 h-8 text-[#563435]/40 rotate-90" />
            </div>

            {/* Delivery Animation */}
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

          {/* Delivery Time Text */}
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Section */}
      <div className="lg:col-span-7 space-y-8">
        {/* Product Selection */}
        <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-[#563435] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Odaberite uređaj
          </h3>
          <div className="space-y-4">
            {products.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleProductSelect(p.slug)}
                className={`relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                  formData.product === p.slug 
                    ? "border-[#563435] bg-white shadow-md" 
                    : "border-transparent bg-white/50 hover:bg-white hover:border-gray-200"
                } ${
                  preferredProduct &&
                  formData.product === preferredProduct.slug &&
                  formData.product !== p.slug
                    ? "opacity-70 saturate-75"
                    : ""
                } cursor-pointer`}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-800">{p.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {productFeatures[p.slug]?.[0] || p.shortDescription}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-[#563435] text-lg">{p.price.toFixed(2)} KM</span>
                      <span className="block text-xs text-gray-400 line-through">{p.compareAtPrice.toFixed(2)} KM</span>
                    </div>
                  </div>
                </div>
                {formData.product === p.slug && (
                  <div className="absolute -top-3 -right-3 bg-[#563435] text-white p-1.5 rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {preferredProduct && (
            <p className="mt-4 text-sm text-gray-500">
              Model sa prethodne stranice je preselektovan, ali možete odabrati i drugi.
            </p>
          )}
        </div>

        {/* Shipping Form */}
        <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="bg-[#563435] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Podaci za dostavu
          </h3>
          <form onSubmit={handleSubmit} id="checkout-form" className="space-y-5">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ime i prezime *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                  placeholder="Vaše ime"
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (opcionalno)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none"
                placeholder="vas.email@primjer.ba"
              />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Napomena</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:ring-2 focus:ring-[#563435]/20 focus:border-[#563435] transition-all outline-none resize-none"
                placeholder="Dodatne napomene za kurira..."
              />
            </div>
          </form>
        </div>
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-5 space-y-6 sticky top-24">
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Pregled narudžbe</h3>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/60">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <Image src={selectedProduct.images[0]} alt={selectedProduct.name} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{selectedProduct.name}</h4>
              <p className="text-sm text-gray-500">Količina: 1</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-bold text-gray-800">{selectedProduct.price.toFixed(2)} KM</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex justify-between">
              <span>Međuzbir</span>
              <span>{selectedProduct.price.toFixed(2)} KM</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Dostava</span>
              <span>Besplatna</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200/60 text-lg font-bold text-gray-900">
              <span>Ukupno za platiti</span>
              <span>{selectedProduct.price.toFixed(2)} KM</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full py-4 bg-[#563435] hover:bg-[#6d4446] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Naruči odmah</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Sigurna kupovina • Plaćanje pouzećem
          </p>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Besplatna dostava u BiH</p>
              <p className="text-xs text-gray-500">Isporuka za 1-3 radna dana</p>
            </div>
          </div>
          <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Plaćanje pouzećem</p>
              <p className="text-xs text-gray-500">Platite kuriru prilikom preuzimanja</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
