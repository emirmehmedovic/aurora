"use client";

import { ReactNode } from "react";
import "../app/l/summer-glatka-koza/summer-vibes.css";

interface SummerVibesWrapperProps {
  children: ReactNode;
}

export default function SummerVibesWrapper({ children }: SummerVibesWrapperProps) {
  return (
    <div className="summer-container relative">
      {/* Floating dekorativni elementi */}
      <div className="summer-decoration summer-circle-1" aria-hidden="true" />
      <div className="summer-decoration summer-circle-2" aria-hidden="true" />
      <div className="summer-decoration summer-circle-3" aria-hidden="true" />
      <div className="summer-decoration summer-circle-4" aria-hidden="true" />

      {/* SVG wave decorations */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-30" style={{ height: '150px' }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,60 C300,100 600,20 900,60 C1050,85 1150,60 1200,60 L1200,0 L0,0 Z"
            fill="url(#wave-gradient-top)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="wave-gradient-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="50%" stopColor="#F9A8D4" />
              <stop offset="100%" stopColor="#FBCFE8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-20" style={{ height: '120px' }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,60 C300,20 600,100 900,60 C1050,35 1150,60 1200,60 L1200,120 L0,120 Z"
            fill="url(#wave-gradient-bottom)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="wave-gradient-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="50%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating sparkles */}
      <div className="absolute top-20 right-10 text-4xl opacity-60 pointer-events-none" style={{ animation: 'float 6s ease-in-out infinite' }}>
        ✨
      </div>
      <div className="absolute top-60 left-20 text-3xl opacity-50 pointer-events-none" style={{ animation: 'float-slow 8s ease-in-out infinite 1s' }}>
        🌸
      </div>
      <div className="absolute bottom-40 right-32 text-3xl opacity-50 pointer-events-none" style={{ animation: 'float 7s ease-in-out infinite 2s' }}>
        ☀️
      </div>
      <div className="absolute top-1/3 left-10 text-2xl opacity-40 pointer-events-none" style={{ animation: 'float-slow 9s ease-in-out infinite 3s' }}>
        💎
      </div>
    </div>
  );
}
