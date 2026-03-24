import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Clock, Check, Truck, RotateCcw, Shield, Banknote, ChevronDown, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Philips Lumea u BiH — alternativa dostupna odmah | Aurora Blog",
  description: "Philips Lumea ne možeš naći u BiH bez carine i čekanja. ICE COOL serija je lokalna alternativa — iste tehnologije, odmah, pouzećem.",
  keywords: "Philips Lumea BiH, Lumea alternativa Bosna, ICE COOL vs Philips Lumea, kućni IPL epilator BiH, IPL aparat dostava BiH",
  alternates: { canonical: "https://aurorashop.ba/blog/philips-lumea-alternativa-bih" },
  openGraph: {
    title: "Philips Lumea u BiH — alternativa dostupna odmah",
    description: "Philips Lumea ne možeš naći u BiH bez carine i čekanja. ICE COOL serija je lokalna alternativa.",
    type: "article",
    publishedTime: "2026-03-01",
  },
};

const faqItems = [
  {
    q: "Je li Aurora ICE COOL kopija Philips Lumea?",
    a: "Nije kopija — oba uređaja koriste IPL tehnologiju koja postoji od 90-ih i nije patentirana kao metoda. ICE COOL je posebno dizajniran s ugrađenim sistemom hlađenja koji nije prisutan u svim Lumea modelima.",
  },
  {
    q: "Mogu li naručiti Philips Lumea u BiH bez carine?",
    a: "Formalno ne — sve pošiljke iznad 75 EUR vrijednosti podliježu carinskom postupku pri uvozu u BiH. U praksi neke pošiljke prolaze, neke ne — ali to nije nešto na što možeš računati.",
  },
  {
    q: "Koliko dugo traje Aurora ICE COOL?",
    a: "500.000 bljeskova za LITE, 999.999 za PRO i Max modele. Ako radiš tretmane tjedno (8 sedmica), pa jednom mjesečno — to je 10–15 godina redovnog korišćenja.",
  },
  {
    q: "Ima li Aurora garanciju?",
    a: "Da — 14 dana povrat bez pitanja i garancija na uređaj. Kontakt direktno kroz aurorashop.ba.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Tražiš Philips Lumea u BiH? Postoji bolji način",
      description: "Zašto je Philips Lumea problem u BiH i kako je Aurora ICE COOL serija lokalna alternativa s ugrađenim hlađenjem.",
      author: { "@type": "Organization", name: "Aurora Shop BiH" },
      publisher: {
        "@type": "Organization",
        name: "Aurora Shop BiH",
        logo: { "@type": "ImageObject", url: "https://aurorashop.ba/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png" },
      },
      datePublished: "2026-03-01",
      dateModified: "2026-03-24",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://aurorashop.ba/blog/philips-lumea-alternativa-bih" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function BlogPostLumea() {
  return (
    <>
      <Script
        id="article-jsonld-lumea"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-100/25 to-transparent pointer-events-none" />

        {/* Article Hero */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
          <div className="mb-4">
            <Link href="/blog" className="text-sm text-[#563435] hover:underline font-medium">
              ← Blog
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#563435]/10 text-[#563435]">
              Vodič za kupovinu
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" /> 5 min čitanja
            </span>
            <span className="text-xs text-gray-400">Mart 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Tražiš Philips Lumea u BiH? Postoji bolji način
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Philips Lumea je jedan od najpopularnijih kućnih IPL epilatora na svijetu. Ako si je tražila, vjerovatno znaš zašto — odlična reputacija, pametni design, solidni rezultati. Problem? U Bosni i Hercegovini je gotovo nemoguće kupiti je bez muke.
          </p>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section 1 — Zašto Lumea problem */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zašto je Lumea problem u BiH</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Philips nema zvaničnu distribuciju u BiH za Lumea liniju. Tvoje opcije su:
            </p>
            <div className="space-y-3 not-prose mb-4">
              {[
                { title: "Narudžba iz EU (Amazon, Media Markt, Philips.com)", desc: "Čekanje 2–4 tjedna, carina pri uvozu (10–17% + PDV na carinsku vrijednost), mogući problemi s reklamacijom." },
                { title: "Traženje u HR ili RS", desc: "Lumea 9000 i 8000 serija ponekad se nađu, ali cijena je 350–600 EUR (685–1.175 KM)." },
                { title: "Kupovina \"iz ruke\"", desc: "Nema nikakve garancije ni mogućnosti povrata." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-red-50/50 border border-red-100 rounded-xl p-4">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 italic">Ni jedna od ovih opcija nije ni jednostavna ni jeftina.</p>
          </div>

          {/* Section 2 — Što nudi */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Što nudi Philips Lumea — i što je Aurora ICE COOL?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Philips Lumea koristi IPL tehnologiju s SenseIQ sistemom koji automatski detektuje ton kože i preporučuje intenzitet. Solidna inovacija. Ali srž tehnologije — IPL bljeskanje koje cilja melanin u folikulu — ista je kao u svim kvalitetnim kućnim IPL uređajima.
            </p>
            <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-2xl p-6 not-prose">
              <p className="text-gray-700 leading-relaxed">
                Aurora ICE COOL serija koristi isti princip, s dodatkom koji Lumea nema u nižim modelima: <strong className="text-[#563435]">ugrađeni sistem hlađenja kože</strong> koji radi neposredno prije svakog bljeskanja. To znači nula neugode čak i na osjetljivim zonama.
              </p>
            </div>
          </div>

          {/* Section 3 — Direktna usporedba */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Direktna usporedba</h2>
            <div className="not-prose overflow-x-auto rounded-2xl border border-gray-200/50 shadow-sm">
              <table className="w-full text-sm bg-white/40 backdrop-blur-sm">
                <thead>
                  <tr className="border-b border-gray-200/60">
                    <th className="text-left p-4 text-gray-500 font-medium"></th>
                    <th className="text-center p-4 text-gray-700 font-semibold">Philips Lumea 8000</th>
                    <th className="text-center p-4 text-[#563435] font-semibold bg-[#563435]/5">Aurora ICE COOL PRO</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cijena", "400–500 EUR (785–980 KM)", "175 KM"],
                    ["Hlađenje kože", "Opciono (Cooling cap)", "Ugrađeno"],
                    ["Bljeskovi", "450.000", "999.999"],
                    ["Dostupnost u BiH", "Nema direktne distribucije", "Odmah, pouzećem"],
                    ["Garancija/povrat", "Servisni centar u HR/RS", "14 dana povrat, direktno"],
                    ["Intenziteti", "5", "5"],
                  ].map(([row, lumea, aurora], i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="p-4 text-gray-600 font-medium">{row}</td>
                      <td className="p-4 text-center text-gray-600">{lumea}</td>
                      <td className="p-4 text-center font-bold text-[#563435] bg-[#563435]/5">{aurora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-3">
              Lumea ima neke prednosti u software dijelu (SenseIQ app, personalizirani programi). ICE COOL ima prednost u cijeni, dostupnosti i ugrađenom hlađenju.
            </p>
          </div>

          {/* Section 4 — Lokalni izbor */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zašto &ldquo;lokalni izbor&rdquo; nije kompromis</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Postoji jedna stvar koja je bitna kada kupuješ online u BiH: šta se desi kad nešto ne valja?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
              <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">S Philips Lumea iz Njemčke</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {["Vraćaš u Njemčku", "Platiš poštarinu", "Čekaš 3–4 tjedna"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><X className="w-3.5 h-3.5 text-red-400" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">S Aurora ICE COOL</h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {["Zoveš ili pišeš direktno", "Šalješ nazad lokalno", "Dobijajš povrat ili zamjenu"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#563435]" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 not-prose">
              <p className="text-sm text-amber-800">
                Za istu cijenu jedne Lumea (400+ EUR) možeš kupiti <strong>dva Aurora ICE COOL Max uređaja</strong> i pokloniti jedan sestri ili mami.
              </p>
            </div>
          </div>

          {/* Zaključak */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Zaključak</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Philips Lumea je odličan uređaj. Ali u BiH, uz sve troškove uvoza i muku dostave, plaćaš premiju za brand — ne za tehnologiju. Aurora ICE COOL nudi istu IPL tehnologiju s boljim hlađenjem, lokalnom podrškom i cijenom koja ima smisla.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Ako si tražila Lumeu, probaj ICE COOL. Dostava sutra, plaćanje na vrata.
            </p>
          </div>

          {/* Inline CTA */}
          <div className="bg-[#563435] rounded-[2rem] p-8 md:p-10 text-center text-white relative overflow-hidden shadow-xl mb-12">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-2">Aurora ICE COOL serija</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Od 165 KM. Dostava sutra.</h3>
              <p className="text-white/70 mb-6">Plaćanje pouzećem · 14 dana povrat · Lokalna podrška</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 mb-6">
                {[
                  { icon: Truck, text: "Besplatna dostava u BiH" },
                  { icon: Banknote, text: "Plaćanje pouzećem" },
                  { icon: RotateCcw, text: "14 dana povrat" },
                  { icon: Shield, text: "12 mj. garancija" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4" />
                    {text}
                  </div>
                ))}
              </div>
              <Link
                href="/proizvodi"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#563435] font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Pogledaj Aurora ICE COOL
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-sm">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-800 list-none">
                    {item.q}
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100/50 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Pročitaj i ovo</p>
            <Link
              href="/blog/ipl-depilacija-kod-kuce-vs-salon-laser"
              className="group flex items-center justify-between gap-4 text-gray-800 hover:text-[#563435] transition-colors"
            >
              <span className="font-semibold leading-snug">IPL kod kuće vs. salon laser — šta se isplati?</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
