import React from 'react';

interface OrderProcessingAgentProps {
  size?: number;
  className?: string;
  agentColor?: string;
  screenColor?: string;
  accentColor?: string;
}

export const OrderProcessingAgent: React.FC<OrderProcessingAgentProps> = ({
  size = 240,
  className = '',
  agentColor = '#563435',  // Brand brown for agent shirt
  screenColor = '#1F2937', // Gray-800 for monitor frame
  accentColor = '#F59E0B', // Amber for accent
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 160"
      width={size}
      height={(size / 240) * 160}
      className={className}
      style={{ overflow: 'hidden' }}
    >
      <style>
        {`
          /* Animacija disanja/pomeranja agenta */
          .agent-breathe {
            animation: breathe 6s ease-in-out infinite;
            transform-origin: 60px 140px;
          }

          /* Oblačić za govor */
          .speech-bubble {
            transform-origin: 85px 70px;
            animation: popSpeech 6s ease-in-out infinite;
          }

          /* Tačkice u oblačiću (kucanje/govor) */
          .dot {
            animation: bounceDot 1.5s infinite;
          }
          .dot-2 { animation-delay: 0.2s; }
          .dot-3 { animation-delay: 0.4s; }

          /* Rotacija zupčanika (procesiranje) */
          .gear-spin {
            transform-origin: 160px 30px;
            animation: spinGear 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          /* Ulazak dokumenta na ekran */
          .order-doc {
            animation: slideDoc 6s ease-in-out infinite;
          }

          /* Punjenje loading trake */
          .loading-bar {
            transform-origin: 130px 105px;
            animation: fillBar 6s ease-in-out infinite;
          }

          /* Kvačica na ekranu (uspešno procesirano) */
          .screen-check {
            transform-origin: 160px 85px;
            animation: popCheck 6s ease-in-out infinite;
          }

          @keyframes breathe {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-2px) scale(1.02); } /* Blago se podiže dok priča */
          }

          @keyframes popSpeech {
            0%, 10% { transform: scale(0); opacity: 0; }
            15%, 55% { transform: scale(1); opacity: 1; } /* Agent priča */
            60%, 100% { transform: scale(0); opacity: 0; }
          }

          @keyframes bounceDot {
            0%, 20%, 100% { transform: translateY(0); }
            10% { transform: translateY(-3px); }
          }

          @keyframes spinGear {
            0%, 15% { transform: rotate(0deg); }
            15%, 55% { transform: rotate(360deg); } /* Vrti se dok se procesira */
            55%, 100% { transform: rotate(360deg); } /* Staje kad je gotovo */
          }

          @keyframes slideDoc {
            0%, 5% { transform: translateY(-60px); opacity: 0; }
            15%, 75% { transform: translateY(0); opacity: 1; } /* Na ekranu je */
            85%, 100% { transform: translateY(40px); opacity: 0; } /* Odlazi dole/uspešno */
          }

          @keyframes fillBar {
            0%, 15% { transform: scaleX(0); opacity: 1; }
            15%, 55% { transform: scaleX(1); opacity: 1; } /* Puni se sinhrono sa zupčanikom */
            60%, 100% { opacity: 0; } /* Nestaje kad iskoči kvačica */
          }

          @keyframes popCheck {
            0%, 50% { transform: scale(0); opacity: 0; }
            55%, 75% { transform: scale(1); opacity: 1; } /* Pojavljuje se uspeh */
            85%, 100% { transform: scale(0); opacity: 0; } /* Reset */
          }
        `}
      </style>

      {/* Tlo / Radni Sto */}
      <line x1="20" y1="140" x2="220" y2="140" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="145" x2="190" y2="145" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />

      {/* --- LEVA STRANA: CALL AGENT --- */}
      <g className="agent-breathe">
        {/* Telo agenta (Ramena) */}
        <path d="M 25 140 C 25 105, 95 105, 95 140 Z" fill={agentColor} />
        {/* Kragna / Vrat */}
        <circle cx="60" cy="105" r="8" fill="#FCA5A5" opacity="0.8" />

        {/* Glava */}
        <circle cx="60" cy="85" r="18" fill="#FCD34D" /> {/* Boja kože */}

        {/* Kosa */}
        <path d="M 42 85 C 42 60, 78 60, 78 85 C 78 70, 42 70, 42 85 Z" fill="#4B5563" />

        {/* Headset (Slušalice i Mikrofon) */}
        {/* Traka preko glave */}
        <path d="M 42 85 A 20 20 0 0 1 78 85" fill="none" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
        {/* Slušalica (Earpiece) */}
        <rect x="74" y="80" width="8" height="14" rx="3" fill="#374151" />
        {/* Mikrofon */}
        <path d="M 78 90 L 70 100" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
        <circle cx="68" cy="102" r="2.5" fill="#EF4444" /> {/* Svetleća lampica na mic-u */}
      </g>

      {/* Oblačić za govor (Pojavljuje se dok agent komunicira) */}
      <g className="speech-bubble">
        <rect x="75" y="35" width="46" height="26" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
        {/* Trougao za rep oblačića */}
        <polygon points="85,60 80,70 93,60" fill="#FFFFFF" />
        <polygon points="83,61 80,70 93,60" fill="none" stroke="#E5E7EB" strokeWidth="2" />
        {/* Popravka preklapanja ivice trougla i pravougaonika */}
        <line x1="84" y1="60" x2="94" y2="60" stroke="#FFFFFF" strokeWidth="3" />

        {/* Animacija tačkica kucanja/govora */}
        <circle cx="88" cy="48" r="2" fill="#9CA3AF" className="dot" />
        <circle cx="98" cy="48" r="2" fill="#9CA3AF" className="dot dot-2" />
        <circle cx="108" cy="48" r="2" fill="#9CA3AF" className="dot dot-3" />
      </g>

      {/* --- DESNA STRANA: MONITOR I PROCESIRANJE --- */}

      {/* Zupčanik (Ikona u pozadini/iznad ekrana za "Processing") */}
      <g className="gear-spin" fill="#F59E0B">
        <circle cx="160" cy="30" r="12" />
        {/* Zupci zupčanika (4 ukrštena pravougaonika) */}
        <rect x="157" y="14" width="6" height="32" rx="1" />
        <rect x="144" y="27" width="32" height="6" rx="1" />
        <rect x="157" y="14" width="6" height="32" rx="1" transform="rotate(45 160 30)" />
        <rect x="144" y="27" width="32" height="6" rx="1" transform="rotate(45 160 30)" />
        {/* Rupa u sredini zupčanika */}
        <circle cx="160" cy="30" r="5" fill="#FFFFFF" />
      </g>

      {/* Postolje monitora */}
      <rect x="155" y="120" width="10" height="20" fill="#6B7280" />
      <path d="M 140 140 L 180 140 L 175 135 L 145 135 Z" fill="#4B5563" />

      {/* Glavni okvir monitora */}
      <rect x="120" y="60" width="80" height="60" rx="4" fill={screenColor} />

      {/* Ekran (Svetliji deo) */}
      {/* ClipPath da dokument ne curi van ekrana */}
      <clipPath id="screenClip">
        <rect x="124" y="64" width="72" height="52" rx="2" />
      </clipPath>

      <rect x="124" y="64" width="72" height="52" rx="2" fill="#DBEAFE" /> {/* Blue-100 */}

      {/* Sadržaj na ekranu */}
      <g clipPath="url(#screenClip)">

        {/* Dokument narudžbine koji uskače na ekran */}
        <g className="order-doc">
          <rect x="134" y="70" width="52" height="36" rx="2" fill="#FFFFFF" />
          {/* Linije teksta na dokumentu */}
          <line x1="140" y1="78" x2="160" y2="78" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="86" x2="180" y2="86" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="94" x2="170" y2="94" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />

          {/* Sličica/Box na dokumentu */}
          <rect x="168" y="74" width="12" height="8" rx="1" fill={accentColor} opacity="0.8" />
        </g>

        {/* Loading bar (Procesiranje) */}
        <rect x="130" y="105" width="60" height="4" rx="2" fill="#E5E7EB" />
        <rect x="130" y="105" width="60" height="4" rx="2" fill={accentColor} className="loading-bar" />

        {/* Velika zelena kvačica (Pojavljuje se kad je procesiranje gotovo) */}
        <g className="screen-check">
          <circle cx="160" cy="85" r="16" fill="#10B981" /> {/* Emerald-500 */}
          <path d="M 152 85 L 157 90 L 168 79" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

    </svg>
  );
};
