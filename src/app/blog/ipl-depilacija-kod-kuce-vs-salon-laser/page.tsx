import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Clock, Check, Truck, RotateCcw, Shield, Banknote, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "IPL kod kuće vs. salon laser — šta se isplati? | Aurora Blog",
  description: "Usporedili smo kućni IPL epilator i salon laser po cijeni, bolu i rezultatima. Evo što treba znati prije nego odlučiš.",
  keywords: "IPL kod kuće vs salon laser, razlika IPL laser, kućni epilator vs salon, ICE COOL vs salon laser, IPL depilacija BiH",
  alternates: { canonical: "https://aurorashop.ba/blog/ipl-depilacija-kod-kuce-vs-salon-laser" },
  openGraph: {
    title: "IPL kod kuće vs. salon laser — šta se isplati?",
    description: "Usporedili smo kućni IPL epilator i salon laser po cijeni, bolu i rezultatima.",
    type: "article",
    publishedTime: "2026-03-01",
  },
};

const faqItems = [
  {
    q: "Koliko tretmana treba kućni IPL?",
    a: "Prvih 8 sedmica: jednom tjedno. Nakon toga: jednom mjesečno po potrebi, ili čak rjeđe. Većina korisnica primijeti razliku već nakon 3–4 tretmana.",
  },
  {
    q: "Je li kućni IPL trajan kao salon laser?",
    a: "Oba smanjuju dlačice 70–90%. Salon laser može biti nešto brži u potpunoj eliminaciji, ali kućni IPL uz dosljednost daje usporedive rezultate na duže staze.",
  },
  {
    q: "Mogu li raditi IPL kod kuće ako imam osjetljivu kožu?",
    a: "Da — kućni IPL s ice cooling tehnologijom je čak nježniji od većine salon tretmana. Hlađenje kože prije svakog bljeskanja eliminiše iritaciju.",
  },
  {
    q: "Za koje tipove kože funkcionira kućni IPL?",
    a: "Fitzpatrick I–IV (svijetla do maslinasta koža s tamnim dlačicama). Fitzpatrick V uz poseban oprez i niži intenzitet. Fitzpatrick VI i sive/bijele/crvene dlačice — IPL ne funkcionira.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "IPL depilacija kod kuće vs. salon laser: šta se zaista isplati?",
      description: "Detaljna usporedba kućnog IPL epilatora i salon laser tretmana po cijeni, bolu, praktičnosti i rezultatima.",
      author: { "@type": "Organization", name: "Aurora Shop BiH" },
      publisher: {
        "@type": "Organization",
        name: "Aurora Shop BiH",
        logo: { "@type": "ImageObject", url: "https://aurorashop.ba/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png" },
      },
      datePublished: "2026-03-01",
      dateModified: "2026-03-24",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://aurorashop.ba/blog/ipl-depilacija-kod-kuce-vs-salon-laser" },
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

export default function BlogPostIplVsSalon() {
  return (
    <>
      <Script
        id="article-jsonld-ipl-salon"
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
              Usporedba
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" /> 6 min čitanja
            </span>
            <span className="text-xs text-gray-400">Mart 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            IPL depilacija kod kuće vs. salon laser: šta se zaista isplati?
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Pitanje koje sebi postavi svaka žena koja je jednom platila tretman u salonu i pogledala u račun. Salon laser ili kućni IPL epilator — koja je razlika, koja je bolja i, što je najvažnije, koja se više isplati?
          </p>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="prose prose-lg max-w-none">

            {/* Kratki odgovor */}
            <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-2xl p-6 mb-10 not-prose">
              <p className="text-gray-700 font-medium">
                <strong className="text-[#563435]">Kratki odgovor:</strong> ovisi o tvojem načinu života i budžetu. Dugačak odgovor — čitaj dalje.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kako radi IPL, a kako salon laser?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Salon laser</strong> koristi jedan fokusirani valni dužina svjetlosti (obično 755 nm ili 1064 nm) koji precizno cilja melanin u dlačici i zagrije folikul do uništenja. Profesionalni uređaji imaju visoku snagu i tretman je brz — ali zahtijeva stručnu osobu koja rukuje njima.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>IPL (Intense Pulsed Light)</strong> emituje široki spektar svjetlosti koji se apsorbuje u pigmentu dlačice i grije folikul, inhibirajući rast. Kućni IPL uređaji su dizajnirani za sigurnu kućnu upotrebu — manja snaga nego salon uređaji, ali redovnim tretmanima daju odlične rezultate.
              </p>
              <div className="bg-white/50 border border-white/30 rounded-xl p-5 not-prose">
                <p className="text-gray-700 font-medium">
                  <span className="text-[#563435] font-bold">Ključna razlika:</span> salon laser je snažniji i brži, ali kućni IPL s redovnim korištenjem daje usporedive dugoročne rezultate uz znatno manje troška.
                </p>
              </div>
            </div>

            {/* Section 2 — Price table */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Usporedba po cijeni</h2>
              <div className="not-prose overflow-x-auto rounded-2xl border border-gray-200/50 shadow-sm">
                <table className="w-full text-sm bg-white/40 backdrop-blur-sm">
                  <thead>
                    <tr className="border-b border-gray-200/60">
                      <th className="text-left p-4 text-gray-500 font-medium"></th>
                      <th className="text-center p-4 text-gray-700 font-semibold">Salon laser</th>
                      <th className="text-center p-4 text-[#563435] font-semibold bg-[#563435]/5">Kućni IPL (Aurora)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Jedna sesija", "50–80 KM", "—"],
                      ["Cijeli kurs (8–12 sesija)", "400–960 KM", "—"],
                      ["Jednokratna kupovina", "—", "165–190 KM"],
                      ["Održavanje godišnje", "2–4 tretmana × 50 KM", "Besplatno (500k+ bljeskova)"],
                      ["Trošak za 5 godina", "1.000–2.000 KM+", "165–190 KM"],
                    ].map(([row, salon, ipl], i) => (
                      <tr key={i} className="border-b border-gray-100 last:border-0">
                        <td className="p-4 text-gray-600 font-medium">{row}</td>
                        <td className="p-4 text-center text-gray-700">{salon}</td>
                        <td className="p-4 text-center font-bold text-[#563435] bg-[#563435]/5">{ipl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Matematika je brutalno jasna. Salon tretmani se isplate samo ako planiraš ići jednom, provjeriti rezultate i ne vraćati se. Što se ne dešava — jer dlačice rastu u ciklusima i trebaš kontinuitet.
              </p>
            </div>

            {/* Section 3 — Bol */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Boli li?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ovo je pitanje broj jedan svake žene koja razmišlja o depilaciji svjetlošću.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-4">
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-2">Salon laser</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Da, boli. Intenzivniji je od kućnog IPL-a i osjećaj opisuju kao &ldquo;pikanje gumenom trakom&rdquo; do &ldquo;žarenje&rdquo;. Savremeni saloni imaju cooling sisteme, ali neugoda je realna.</p>
                </div>
                <div className="bg-green-50/60 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-2">Kućni IPL s ice cooling</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Minimalna neugoda. Aurora ICE COOL uređaji imaju ugrađen sistem hlađenja koji rashladuje kožu neposredno prije svakog bljeskanja. Korisnice opisuju tretman kao &ldquo;blagi topli osjećaj&rdquo; ili &ldquo;uopće ne osjetim ništa&rdquo;.</p>
                </div>
              </div>
            </div>

            {/* Section 4 — Praktičnost */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Praktičnost i dostupnost</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="bg-white/40 border border-white/30 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Salon tretman</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Zakaži termin (često tjedan unaprijed)", "Vozi se do salona, traži parking", "Čekaj u čekaonici", "Ukupno: 45–90 minuta po sesiji, 8–12 puta"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Kućni IPL</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Uzmeš uređaj s police", "Radiš kada ti odgovara — u 23h, u pidžami, dok gledaš seriju", "Tretman nogu: 20–30 minuta", "Tretman lica: 5–10 minuta"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#563435] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 italic">Za zaposlenu ženu s porodicom, fleksibilnost kućnog tretmana nije luksuz — to je realnost.</p>
            </div>

            {/* Section 5 — Rezultati */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kakvi su rezultati?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Oba pristupa smanjuju gustoću dlačica <strong>70–90%</strong> nakon kompletnog kursa tretmana.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Salon laser je nešto brži u potpunoj eliminaciji jer je snažniji. Kućni IPL zahtijeva dosljednost — 1 tretman tjedno prvih 8 sedmica, zatim po potrebi. Rezultati počinju biti vidljivi već nakon 3–4 tretmana.
              </p>
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 not-prose">
                <p className="text-sm text-amber-800">
                  <strong>Važna napomena:</strong> Ni salon laser ni kućni IPL ne funkcioniraju na vrlo svijetlim (sive, bijele, crvene) dlačicama jer nema dovoljno melanina. Za tamnu kožu (Fitzpatrick V–VI) savjetuj se s dermatologom.
                </p>
              </div>
            </div>

            {/* Section 6 — Za koga */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Za koga je što prikladno?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                <div className="bg-white/40 border border-white/30 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Salon laser je bolji ako:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Imaš neograničen budžet", "Trebaš brze rezultate (vjenčanje, hitno)", "Imaš vrlo tamnu kožu (Fitzpatrick V) gdje kućni IPL traži poseban oprez"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#563435]/5 border border-[#563435]/15 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Kućni IPL je bolji ako:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {["Razmišljaš dugoročno i isplativosti", "Cijeniš privatnost i fleksibilnost", "Imaš osjetljivu kožu koja reaguje na agresivne metode", "Već si probala salon i nisi oduševljena cijenom ili bolom"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2"><Check className="w-3.5 h-3.5 text-[#563435] mt-0.5 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Closing */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Završna misao</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Salon laser je odličan. Kućni IPL je pametan. Razlika je u tome što salon tretmanom plaćaš tuđe radno vrijeme i opremu — iznova i iznova. Kućni IPL kupuješ jednom i koristiš godinama.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ako se pitaš odakle početi, Aurora ICE COOL serija je dostupna za 165–190 KM s besplatnom dostavom u BiH i plaćanjem pouzećem — bez rizika.
              </p>
            </div>
          </div>

          {/* Inline CTA */}
          <div className="bg-[#563435] rounded-[2rem] p-8 md:p-10 text-center text-white relative overflow-hidden shadow-xl mb-12">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-white/70 text-sm font-semibold tracking-wider uppercase mb-2">Aurora ICE COOL serija</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Od 165 KM. Besplatna dostava u BiH.</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 mb-6">
                {[
                  { icon: Truck, text: "Dostava sutra" },
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
                Pogledaj epilatore
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ — IPL kod kuće vs. salon laser</h2>
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
              href="/blog/philips-lumea-alternativa-bih"
              className="group flex items-center justify-between gap-4 text-gray-800 hover:text-[#563435] transition-colors"
            >
              <span className="font-semibold leading-snug">Tražiš Philips Lumea u BiH? Postoji bolji način</span>
              <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
