import React from 'react';

interface DeliveredPackageProps {
  size?: number;
  className?: string;
  houseColor?: string;
  roofColor?: string;
  boxColor?: string;
}

export const DeliveredPackage: React.FC<DeliveredPackageProps> = ({
  size = 200,
  className = '',
  houseColor = '#F3F4F6', // Light gray for house walls
  roofColor = '#563435',  // Brand brown for roof
  boxColor = '#F59E0B',   // Amber for package
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
          /* Animacija pada paketa sa "squash and stretch" efektom pri udaru */
          .box-drop {
            transform-origin: 120px 140px; /* Postavljeno na dno paketa kako bi se spljoštio prema tlu */
            animation: dropAndBounce 4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
          }

          /* Animacija kvačice (uspešna dostava) koja iskače iznad paketa */
          .success-pop {
            transform-origin: 120px 105px;
            animation: popUp 4s ease-in-out infinite;
          }

          /* Animacija malih zvezdica/varnica oko kvačice */
          .sparkle {
            transform-origin: 120px 105px;
            animation: sparkleSpin 4s ease-in-out infinite;
          }

          @keyframes dropAndBounce {
            0% { transform: translateY(-120px); opacity: 0; }
            10% { transform: translateY(-120px); opacity: 1; }
            /* Udarac o zemlju (spljoštavanje) */
            20% { transform: translateY(0) scale(1.2, 0.8); opacity: 1; }
            /* Odskok gore */
            25% { transform: translateY(-15px) scale(0.95, 1.05); opacity: 1; }
            /* Pad nazad na zemlju */
            30% { transform: translateY(0) scale(1.02, 0.98); opacity: 1; }
            /* Smirivanje */
            35% { transform: translateY(0) scale(1, 1); opacity: 1; }
            /* Čekanje ispred vrata */
            75% { transform: translateY(0) scale(1, 1); opacity: 1; }
            /* Skupljanje i nestanak (reset za novu dostavu) */
            85% { transform: translateY(0) scale(0, 0); opacity: 0; }
            100% { transform: translateY(-120px) scale(0, 0); opacity: 0; }
          }

          @keyframes popUp {
            0%, 30% { transform: scale(0); opacity: 0; }
            35% { transform: scale(1.2); opacity: 1; }
            40% { transform: scale(1); opacity: 1; }
            75% { transform: scale(1); opacity: 1; }
            80%, 100% { transform: scale(0); opacity: 0; }
          }

          @keyframes sparkleSpin {
            0%, 30% { transform: scale(0) rotate(-45deg); opacity: 0; }
            35% { transform: scale(1.2) rotate(15deg); opacity: 1; }
            45% { transform: scale(1) rotate(0deg); opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Nebo / Dekorativni oblak (Opciono, daje lepši ambijent) */}
      <path d="M 30 50 Q 40 40 50 50 Q 65 40 70 55 Q 80 65 65 65 L 35 65 Q 20 65 30 50 Z" fill="#E5E7EB" opacity="0.6" />
      <path d="M 190 30 Q 195 20 205 30 Q 215 25 220 35 Q 225 45 210 45 L 195 45 Q 185 45 190 30 Z" fill="#E5E7EB" opacity="0.4" />

      {/* Tlo / Zemlja */}
      <line x1="20" y1="140" x2="220" y2="140" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="145" x2="190" y2="145" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />

      {/* KUĆA */}
      <g>
        {/* Dimnjak */}
        <rect x="155" y="45" width="16" height="30" fill="#9CA3AF" />
        <rect x="153" y="40" width="20" height="5" fill="#6B7280" rx="2" />

        {/* Zidovi kuće */}
        <rect x="55" y="70" width="130" height="70" fill={houseColor} rx="2" />

        {/* Krov */}
        <polygon points="40,70 120,25 200,70" fill={roofColor} strokeLinejoin="round" />

        {/* Prozor Levi */}
        <rect x="70" y="90" width="24" height="24" fill="#BFDBFE" rx="2" />
        <line x1="82" y1="90" x2="82" y2="114" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="70" y1="102" x2="94" y2="102" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="68" y="114" width="28" height="4" fill="#9CA3AF" rx="1" />

        {/* Prozor Desni */}
        <rect x="146" y="90" width="24" height="24" fill="#BFDBFE" rx="2" />
        <line x1="158" y1="90" x2="158" y2="114" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="146" y1="102" x2="170" y2="102" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="144" y="114" width="28" height="4" fill="#9CA3AF" rx="1" />

        {/* Vrata (Centrirana na x=120) */}
        <rect x="106" y="90" width="28" height="50" fill="#563435" rx="2" /> {/* Brand brown door */}
        <rect x="108" y="92" width="24" height="48" fill="#6d4446" rx="1" /> {/* Lighter brown panel */}
        <circle cx="126" cy="115" r="3" fill="#FCD34D" /> {/* Door handle */}
      </g>

      {/* PAKET KOJI PADA */}
      <g className="box-drop">
        {/* Senka ispod paketa (pojavljuje se kad padne) */}
        <ellipse cx="120" cy="140" rx="14" ry="3" fill="#9CA3AF" opacity="0.5" />

        {/* Kutija */}
        <rect x="108" y="116" width="24" height="24" fill={boxColor} rx="2" />
        {/* Traka za pakovanje na kutiji */}
        <line x1="108" y1="128" x2="132" y2="128" stroke="#D97706" strokeWidth="2" />
        <line x1="120" y1="116" x2="120" y2="140" stroke="#D97706" strokeWidth="2" />
        <path d="M 115 116 L 125 116 L 120 110 Z" fill="#D97706" opacity="0.8" /> {/* Etiketa na vrhu */}
      </g>

      {/* ZNAK ZA USPEŠNU DOSTAVU (KVAČICA) */}
      <g className="success-pop">
        {/* Pozadina kvačice */}
        <circle cx="120" cy="100" r="12" fill="#10B981" /> {/* Emerald green */}
        {/* Ikona kvačice */}
        <path d="M 114 100 L 118 104 L 126 95" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* UKRASNE VARNICE ZA KVAČICU */}
      <g className="sparkle" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
        <line x1="120" y1="80" x2="120" y2="84" />
        <line x1="100" y1="100" x2="104" y2="100" />
        <line x1="140" y1="100" x2="136" y2="100" />
        <line x1="106" y1="86" x2="109" y2="89" />
        <line x1="134" y1="86" x2="131" y2="89" />
      </g>

    </svg>
  );
};
