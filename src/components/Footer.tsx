"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MessageCircle, CreditCard, Banknote, Truck, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 backdrop-blur-lg border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
                alt="Ice Cool PRO™"
                width={60}
                height={60}
                className="rounded-xl mb-3"
              />
              <h3 className="text-xl font-bold text-[#563435]">
                Ice Cool PRO™
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Profesionalno IPL uklanjanje dlačica iz udobnosti vašeg doma.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Brzi linkovi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Početna
                </Link>
              </li>
              <li>
                <Link href="/proizvodi" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Proizvodi
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Pravne informacije</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/politika-privatnosti" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link href="/uslovi-koristenja" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Uslovi korištenja
                </Link>
              </li>
              <li>
                <Link href="/politika-dostave" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                  Politika dostave
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/38761904759" className="hover:text-gray-900 transition-colors">WhatsApp kontakt</a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+38761904759" className="hover:text-gray-900 transition-colors">+387 61 904 759</a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@icecoolpro.ba</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/icecoolpro" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors" aria-label="Facebook stranica">
                <Facebook className="w-4 h-4 text-rose-600" />
              </a>
              <a href="https://www.instagram.com/icecoolpro" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center transition-colors" aria-label="Instagram profil">
                <Instagram className="w-4 h-4 text-rose-600" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment & Delivery Info */}
        <div className="border-t border-gray-200/50 mt-8 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Banknote className="w-5 h-5" />
              <span>Plaćanje pouzećem</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <CreditCard className="w-5 h-5" />
              <span>Karticom online</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Truck className="w-5 h-5" />
              <span>Besplatna dostava u BiH (1-3 radna dana)</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} Ice Cool PRO™. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
}
