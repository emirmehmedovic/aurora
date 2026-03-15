"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/38761904759?text=Zdravo%2C%20zanima%20me%20ICE%20COOL%20PRO%20ure%C4%91aj"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating-button')}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Kontaktirajte nas putem WhatsApp-a"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Pišite nam na WhatsApp
      </span>
    </a>
  );
}
