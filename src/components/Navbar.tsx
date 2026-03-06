"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto backdrop-blur-lg bg-white/30 border border-white/20 shadow-lg rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Ice Cool PRO Logo"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Početna
            </Link>
            <Link href="/proizvodi" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Proizvodi
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              FAQ
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Kontakt
            </Link>
            <Link 
              href="/naruci" 
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#563435] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Naruči odmah
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 sm:mx-6 lg:mx-8 max-w-[1400px] lg:mx-auto bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Početna
            </Link>
            <Link 
              href="/proizvodi" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Proizvodi
            </Link>
            <Link 
              href="/faq" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/kontakt" 
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50 font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Link 
              href="/naruci" 
              className="block px-4 py-2.5 bg-[#563435] text-white font-semibold rounded-lg text-center shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Naruči odmah
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
