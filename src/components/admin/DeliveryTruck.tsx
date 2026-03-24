import React from 'react';

interface DeliveryTruckProps {
  size?: number;
  className?: string;
  truckColor?: string;
  boxColor?: string;
}

export const DeliveryTruck: React.FC<DeliveryTruckProps> = ({
  size = 200,
  className = '',
  truckColor = '#563435', // Brand brown color
  boxColor = '#F59E0B',   // Amber for package
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 120"
      width={size}
      height={(size / 240) * 120}
      className={className}
      style={{ overflow: 'hidden' }}
    >
      <style>
        {`
          /* Glavna animacija kretanja celog kamiona */
          .truck-move {
            animation: driveOff 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          /* Animacija truck body-ja (treskanje dok vozi) */
          .truck-bounce {
            animation: bounce 5s linear infinite;
          }

          /* Animacija pada i nestanka paketa */
          .box-drop {
            animation: dropBox 5s ease-in-out infinite;
          }

          /* Rotacija točkova */
          .wheel-spin {
            animation: spinWheel 5s linear infinite;
          }

          /* Animacija vetra / brzine */
          .speed-line {
            animation: wind 5s linear infinite;
            stroke-dasharray: 20;
          }

          @keyframes driveOff {
            0%, 25% { transform: translateX(0); } /* Čeka da se utovari */
            45%, 65% { transform: translateX(250px); } /* Odlazi sa ekrana udesno */
            66% { transform: translateX(-200px); } /* Prebacuje se levo van ekrana */
            85%, 100% { transform: translateX(0); } /* Vraća se u centar i staje */
          }

          @keyframes bounce {
            0%, 25%, 65%, 85%, 100% { transform: translateY(0); }
            30%, 40%, 50%, 60%, 70%, 80% { transform: translateY(-1.5px); }
            35%, 45%, 55%, 65%, 75% { transform: translateY(1px); }
          }

          @keyframes dropBox {
            0% { transform: translateY(-80px); opacity: 0; }
            10% { transform: translateY(-80px); opacity: 1; }
            20%, 60% { transform: translateY(0); opacity: 1; } /* U kamionu je */
            61%, 100% { opacity: 0; } /* Nestaje kad kamion ode */
          }

          @keyframes spinWheel {
            0%, 25% { transform: rotate(0deg); }
            45%, 65% { transform: rotate(720deg); }
            66% { transform: rotate(0deg); }
            85%, 100% { transform: rotate(360deg); }
          }

          @keyframes wind {
            0%, 30% { transform: translateX(0); opacity: 0; }
            35% { opacity: 1; }
            55% { transform: translateX(-100px); opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Pozadina / Put */}
      <line x1="10" y1="100" x2="230" y2="100" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="104" x2="200" y2="104" stroke="#F3F4F6" strokeWidth="2" strokeLinecap="round" />

      {/* Linije brzine (Pojavljuju se kad kamion krene) */}
      <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" className="speed-line" style={{ animationDelay: '0s' }}>
        <line x1="200" y1="40" x2="220" y2="40" />
      </g>
      <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" className="speed-line" style={{ animationDelay: '0.2s' }}>
        <line x1="180" y1="60" x2="210" y2="60" />
      </g>
      <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" className="speed-line" style={{ animationDelay: '0.1s' }}>
        <line x1="210" y1="80" x2="230" y2="80" />
      </g>

      {/* Kamion kontejner (kreće se napred/nazad po x osi) */}
      <g className="truck-move">
        {/* Unutrašnji kontejner za "treskanje" kabine i tereta */}
        <g className="truck-bounce">

          {/* Paket / Kutija */}
          <g className="box-drop">
            <rect x="50" y="55" width="24" height="24" fill={boxColor} rx="2" />
            {/* Detalji na kutiji (traka) */}
            <line x1="50" y1="67" x2="74" y2="67" stroke="#D97706" strokeWidth="2" />
            <line x1="62" y1="55" x2="62" y2="79" stroke="#D97706" strokeWidth="2" />
          </g>

          {/* Zadnji deo kamiona (tovarni prostor) */}
          <path
            d="M 30 40 L 90 40 L 90 85 L 30 85 Z"
            fill={truckColor}
            opacity="0.9"
          />
          {/* Ram tovarnog prostora (daje dubinu) */}
          <path
            d="M 30 40 L 40 40 L 40 85 L 30 85 Z"
            fill="#3d2425"
            opacity="0.5"
          />

          {/* Kabina kamiona */}
          <path
            d="M 90 50 L 115 50 L 125 65 L 125 85 L 90 85 Z"
            fill={truckColor}
          />
          {/* Prozor kabine */}
          <polygon
            points="95 55, 110 55, 118 65, 95 65"
            fill="#E8D4C0"
          />
          {/* Far */}
          <circle cx="122" cy="75" r="3" fill="#FBBF24" />
        </g>

        {/* Točkovi (van truck-bounce klase da ne bi "skakali" gore dole zajedno sa kabinom na isti nacin) */}
        {/* Zadnji točak */}
        <g style={{ transformOrigin: '50px 85px' }} className="wheel-spin">
          <circle cx="50" cy="85" r="12" fill="#1F2937" />
          <circle cx="50" cy="85" r="5" fill="#9CA3AF" />
          <circle cx="50" cy="85" r="2" fill="#F3F4F6" />
        </g>

        {/* Prednji točak */}
        <g style={{ transformOrigin: '110px 85px' }} className="wheel-spin">
          <circle cx="110" cy="85" r="12" fill="#1F2937" />
          <circle cx="110" cy="85" r="5" fill="#9CA3AF" />
          <circle cx="110" cy="85" r="2" fill="#F3F4F6" />
        </g>
      </g>
    </svg>
  );
};
