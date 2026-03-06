"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    product: "ice-cool-pro",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual form submission to API
    console.log("Form submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-teal-50/30 via-white/40 to-cyan-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Hvala na narudžbi!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Vaša narudžba je uspješno primljena. Naš tim će vas kontaktirati u najkraćem roku radi potvrde.
        </p>
        <div className="bg-white/50 rounded-2xl p-6 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-3">Detalji narudžbe:</h3>
          <div className="text-left space-y-2 text-sm text-gray-700">
            <p><span className="font-medium">Ime:</span> {formData.fullName}</p>
            <p><span className="font-medium">Telefon:</span> {formData.phone}</p>
            <p><span className="font-medium">Email:</span> {formData.email}</p>
            <p><span className="font-medium">Adresa:</span> {formData.address}, {formData.city}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div>
          <label htmlFor="product" className="block text-sm font-semibold text-gray-800 mb-2">
            Odaberite proizvod
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
          >
            <option value="ice-cool-pro">Ice Cool PRO™ - 172.50 KM</option>
            <option value="ice-cool-pro-max">Ice Cool PRO™ Max - 199.00 KM</option>
            <option value="ice-cool-lite">Ice Cool Lite™ - 149.00 KM</option>
          </select>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
              Ime i prezime *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
              placeholder="Vaše ime i prezime"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
              placeholder="+387 XX XXX XXX"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email (opcionalno)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
            placeholder="vas.email@primjer.ba"
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-800 mb-2">
            Adresa dostave *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
            placeholder="Ulica i broj"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-800 mb-2">
              Grad *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
              placeholder="Sarajevo"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-800 mb-2">
              Poštanski broj
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors"
              placeholder="71000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-800 mb-2">
            Napomena (opcionalno)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-violet-200/50 bg-white/70 focus:bg-white focus:border-violet-400 focus:outline-none transition-colors resize-none"
            placeholder="Dodatne napomene za dostavu..."
          />
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-[#563435]/5 via-white/40 to-[#563435]/10 rounded-2xl p-6 border border-[#563435]/20">
          <h3 className="font-bold text-gray-800 mb-4">Sažetak narudžbe</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Proizvod:</span>
              <span className="font-medium text-gray-800">
                {formData.product === "ice-cool-pro" && "Ice Cool PRO™"}
                {formData.product === "ice-cool-pro-max" && "Ice Cool PRO™ Max"}
                {formData.product === "ice-cool-lite" && "Ice Cool Lite™"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cijena:</span>
              <span className="font-medium text-gray-800">
                {formData.product === "ice-cool-pro" && "172.50 KM"}
                {formData.product === "ice-cool-pro-max" && "199.00 KM"}
                {formData.product === "ice-cool-lite" && "149.00 KM"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dostava:</span>
              <span className="font-medium text-teal-600">Besplatno</span>
            </div>
            <div className="border-t border-[#563435]/20 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Ukupno:</span>
                <span className="font-bold text-gray-900 text-lg">
                  {formData.product === "ice-cool-pro" && "172.50 KM"}
                  {formData.product === "ice-cool-pro-max" && "199.00 KM"}
                  {formData.product === "ice-cool-lite" && "149.00 KM"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-8 bg-[#563435] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Potvrdi narudžbu - Plaćanje pouzećem
        </button>

        <p className="text-center text-sm text-gray-600">
          Plaćanje se vrši prilikom preuzimanja paketa. Besplatna dostava na cijelu BiH.
        </p>
      </form>
    </div>
  );
}
