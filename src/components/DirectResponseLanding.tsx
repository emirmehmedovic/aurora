"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Star, Truck, Shield, RotateCcw, ArrowRight, Flame } from "lucide-react";

interface DirectResponseProps {
  product?: {
    id: string;
    name: string;
    price: number;
    compareAtPrice: number;
    image: string;
  };
}

export default function DirectResponseLanding({ product }: DirectResponseProps) {
  // Default to Ice Cool PRO if no product provided
  const p = product || {
    id: "ice-cool-pro",
    name: "Ice Cool PRO™",
    price: 172.50,
    compareAtPrice: 345.00,
    image: "/slike/1772394091-ee63e841-44b7-4498-864d-49a0816c27b9.webp"
  };

  const savings = p.compareAtPrice - p.price;

  const UrgencyCTA = () => (
    <div className="flex flex-col items-center mt-6 mb-8">
      <Link 
        href="/naruci"
        className="w-full max-w-md bg-[#e32636] hover:bg-[#c41e2a] text-white text-center font-black text-2xl py-4 px-8 rounded-xl shadow-[0_8px_20px_rgba(227,38,54,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 animate-pulse-slow"
      >
        NARUČI ODMAH <ArrowRight className="w-7 h-7" />
      </Link>
      <div className="mt-3 text-center bg-red-50 text-red-700 px-4 py-2 rounded-lg font-bold text-sm w-full max-w-md border border-red-200">
        🔥 50% popusta vrijedi do večeras u 23:59 (ostalo je 6 komada)
      </div>
    </div>
  );

  return (
    <main className="bg-white text-gray-900 pb-20">
      {/* Top Banner */}
      <div className="bg-[#563435] text-white text-center py-2 px-4 text-sm font-bold tracking-wide">
        BESPLATNA DOSTAVA ZA NARUDŽBE DANAS
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* HERO SECTION */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            {p.name} | Glatka koža koja traje sedmicama
          </h1>
        </div>

        <div className="relative w-full aspect-square md:aspect-video max-h-[500px] rounded-2xl overflow-hidden mb-8 shadow-xl">
          <Image 
            src={p.image} 
            alt={p.name} 
            fill 
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4 mb-8 text-lg font-medium text-gray-800">
          {[
            "Bezbolan način da se osjećate samouvjereno u svojoj koži",
            "Profesionalno uklanjanje dlačica iz udobnosti vašeg doma",
            "Šta ako možete dobiti glatku kožu kao iz salona - bez boli ili velike cijene?",
            "Udobno hlađenje susreće snažne IPL rezultate",
            "Bez rezultata? Vratite svoj novac u roku od 14 dana!"
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" strokeWidth={3} />
              <p>{benefit}</p>
            </div>
          ))}
        </div>

        {/* PRICING */}
        <div className="bg-gray-50 border-2 border-dashed border-red-200 rounded-2xl p-6 text-center mb-8">
          <div className="flex justify-center items-baseline gap-4 mb-2">
            <span className="text-3xl text-gray-400 line-through font-bold">{p.compareAtPrice.toFixed(2)}KM</span>
            <span className="text-5xl md:text-6xl text-[#e32636] font-black">{p.price.toFixed(2)}KM</span>
          </div>
          <div className="inline-block bg-yellow-300 text-yellow-900 font-black px-4 py-1 rounded-full text-lg uppercase tracking-wider transform -rotate-2">
            Uštedite {savings.toFixed(0)}KM!
          </div>
        </div>

        <UrgencyCTA />

        <hr className="border-gray-200 my-10" />

        {/* SECTION 2: Empathy & Story */}
        <h2 className="text-2xl md:text-3xl font-black mb-6 leading-tight">
          Uživajte u dugotrajno glatkoj koži - bez boli, pregleda ili svakodnevnog brijanja.
        </h2>
        <div className="prose prose-lg text-gray-700 mb-8">
          <p>
            Zamislite da se nikada ne morate požurivati s brijanjem u zadnji čas prije izlaska, nikada se ne morate suočiti s udubljenjima od brijanja, iritacijom ili onim grubim ponovnim rastom samo nekoliko dana kasnije. 
          </p>
          <p>
            S naprednom IPL tehnologijom i ugrađenom udobnošću hlađenja, ovaj uređaj nježno cilja dlačice u korijenu, a istovremeno održava vašu kožu mirnom i ugodnom. Nema skupih posjeta salonu. Nema bolnih depilacija voskom. 
          </p>
          <p className="font-bold text-gray-900 text-xl border-l-4 border-[#563435] pl-4 italic">
            Samo glatka, samouvjerena koža koja traje tjednima - sve iz privatnosti vašeg doma. Nije to samo uklanjanje dlačica; to je sloboda, samopouzdanje i jedna stvar manje o kojoj trebate brinuti.
          </p>
        </div>

        <UrgencyCTA />

        <hr className="border-gray-200 my-10" />

        {/* SECTION 3: First Person Story */}
        <div className="bg-purple-50 rounded-3xl p-8 mb-8 relative">
          <div className="absolute top-0 right-0 text-9xl text-purple-200 opacity-50 font-serif leading-none mt-[-20px] mr-4">"</div>
          <h2 className="text-2xl md:text-3xl font-black mb-6 leading-tight relative z-10">
            Profesionalno uklanjanje dlačica iz udobnosti vašeg doma
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed relative z-10">
            Godinama sam se borila s brzim rastom dlačica i stalno sam trošila novac na laserske tretmane u salonu. Brijanje mi je izazivalo iritacije i urasle dlačice, a vosak je uvijek bio bolan. Otkako sam počela koristiti ovaj uređaj, konačno imam rezultate kao iz salona — ali bez bolnih termina i bez izlaska iz kuće. Koža mi je glatka sedmicama, a ja se osjećam samopouzdano i mirno jer znam da imam rješenje koje stvarno djeluje.
          </p>
        </div>

        <UrgencyCTA />

        {/* TRUST BADGES STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 rounded-2xl p-6 my-12 border border-gray-200">
          <div className="flex flex-col items-center text-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-sm">Super Akcija!</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Truck className="w-8 h-8 text-blue-500" />
            <span className="font-bold text-sm">Besplatna Dostava 24-48h</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <RotateCcw className="w-8 h-8 text-green-500" />
            <span className="font-bold text-sm">14 Dana Povrat</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Shield className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-sm">Godina Dana Garancije!</span>
          </div>
        </div>

        {/* SECTION 4: How it works */}
        <h2 className="text-3xl md:text-4xl font-black mb-6 text-center text-[#563435]">
          Uključi. Prisloni. Zablistaj.
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
          Dizajniran tako da ga svako može koristiti bez posebnog znanja ili iskustva, ovaj uređaj je spreman za upotrebu u samo nekoliko minuta. Dovoljno je odabrati jačinu, prisloniti uređaj na kožu i započeti tretman — bez komplikovanih postavki i bez nereda. Zahvaljujući intuitivnim kontrolama i ugrađenom hlađenju, tretman je brz, ugodan i lako se uklapa u tvoju rutinu, čak i kada nemaš puno vremena.
        </p>

        <UrgencyCTA />

        <hr className="border-gray-200 my-10" />

        {/* SECTION 5: Tech Specs / 3 Ways it works */}
        <h2 className="text-2xl md:text-3xl font-black mb-6 leading-tight">
          Uživajte u dugotrajno glatkoj koži — bez boli, pregleda ili svakodnevnog brijanja
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          IceCool Pro™ razvijen je koristeći naprednu IPL tehnologiju s integriranim sustavom hlađenja za sigurnu i učinkovitu kućnu upotrebu.
        </p>
        <p className="font-bold text-lg mb-4">Uređaj djeluje na tri načina:</p>
        <ul className="space-y-4 mb-8 text-lg text-gray-700">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2.5 rounded-full bg-[#563435] flex-shrink-0" />
            <span>Cilja korijen dlačice svjetlosnim impulsima i usporava njezin ponovni rast</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2.5 rounded-full bg-[#563435] flex-shrink-0" />
            <span>Smanjuje iritaciju zahvaljujući ugrađenom hlađenju za gotovo bezbolno iskustvo</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2.5 rounded-full bg-[#563435] flex-shrink-0" />
            <span>Omogućuje dugotrajnu glatkoću kože bez svakodnevnog brijanja i bolnih tretmana</span>
          </li>
        </ul>
        <p className="text-lg text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
          <strong>Ključne značajke:</strong> napredna IPL tehnologija, 999.999 svjetlosnih impulsa, više razina intenziteta i sustav hlađenja – za brze, sigurne i dugotrajne rezultate iz udobnosti vlastitog doma.
        </p>

        <UrgencyCTA />

        <hr className="border-gray-200 my-10" />

        {/* SECTION 6: Reviews */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl font-black mb-2">4.452 reviews</h2>
          <p className="text-xl text-gray-600">Ne vjerujte nam samo na riječ - pogledajte što drugi kažu!</p>
          <p className="text-md text-gray-500 mt-2 font-medium">Više od 4452 provjerenih recenzija.</p>
        </div>

        <div className="space-y-6 mb-12">
          {/* Review 1 */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#563435] text-white flex items-center justify-center font-bold text-xl">D</div>
              <div>
                <p className="font-bold text-lg">Derva, 24</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <div className="ml-auto text-green-600 flex items-center gap-1 text-sm font-bold">
                <Check className="w-4 h-4" /> Provjeren kupac
              </div>
            </div>
            <p className="text-gray-700 italic text-lg">
              “Iskreno, bila sam skeptična jer sam već probala sve — brijanje, vosak, čak i skupe laserske tretmane. Ovo mi je prvi uređaj koji stvarno daje rezultate, a da me ne boli. Nakon par tretmana rast se vidno usporio, a koža mi je glatka bez iritacija. Najviše volim što sve mogu obaviti kod kuće za 10 minuta.”
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#563435] text-white flex items-center justify-center font-bold text-xl">S</div>
              <div>
                <p className="font-bold text-lg">Samanta, 31</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <div className="ml-auto text-green-600 flex items-center gap-1 text-sm font-bold">
                <Check className="w-4 h-4" /> Provjeren kupac
              </div>
            </div>
            <p className="text-gray-700 italic text-lg">
              “Imam jako osjetljivu kožu i uvijek sam imala problema s crvenilom i uraslim dlačicama. Kod ovog uređaja me oduševilo hlađenje — tretman je stvarno ugodan. Nakon nekoliko sedmica primijetila sam puno sporiji rast i manje dlačica. Konačno nešto što nije agresivno za moju kožu.”
            </p>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#563435] text-white flex items-center justify-center font-bold text-xl">A</div>
              <div>
                <p className="font-bold text-lg">Amra, 23</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
              <div className="ml-auto text-green-600 flex items-center gap-1 text-sm font-bold">
                <Check className="w-4 h-4" /> Provjeren kupac
              </div>
            </div>
            <p className="text-gray-700 italic text-lg">
              “Godinama sam trošila novac na laserske tretmane u salonu. Rezultati su bili dobri, ali preskupi. Ovaj uređaj mi je doslovno uštedio stotine eura. Efekat je sličan profesionalnom tretmanu, samo što sve radim kad meni odgovara. Prezadovoljna sam.”
            </p>
          </div>
        </div>

        {/* FINAL PITCH */}
        <div className="bg-gradient-to-br from-[#563435] to-[#7a484a] text-white rounded-3xl p-8 md:p-12 text-center shadow-2xl mb-12">
          <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
            Ne moraš se više boriti s bolnim brijanjem, iritacijama ili stalnim odlascima u salon – i prihvatati to kao "normalno".
          </p>
          <p className="text-2xl md:text-3xl font-black mb-6 text-yellow-300">
            IceCool Pro™ vraća ti glatkoću, samopouzdanje i slobodu – iz udobnosti vlastitog doma.
          </p>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Većina žena primijeti sporiji rast i glađu kožu već nakon prvih tretmana – a to potvrđujemo s <strong>30-dnevnom garancijom povrata novca.</strong>
          </p>
          
          <div className="bg-black/20 rounded-xl p-6 inline-block mb-8 border border-white/10">
            <p className="text-2xl font-black uppercase tracking-wider text-white">
              Bez pretplate. Bez rizika.<br/>Samo rezultati.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Link 
              href="/naruci"
              className="w-full max-w-md bg-white text-[#563435] hover:bg-gray-100 text-center font-black text-2xl py-5 px-8 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              👉 Naruči sada
            </Link>
            <p className="mt-4 font-bold text-yellow-300 animate-pulse">
              dok traje 50% popusta.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
