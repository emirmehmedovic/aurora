import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextImage from "next/image";
import Script from "next/script";

const faqs = [
  {
    id: 1,
    question: "Da li je tretman bolan?",
    answer: "Većina korisnica tretman opisuje kao blago zagrijavanje ili lagano peckanje. Zahvaljujući ugrađenom sistemu hlađenja, tretman je znatno ugodniji u poređenju s voskom ili epilatorom."
  },
  {
    id: 2,
    question: "Kada mogu očekivati rezultate?",
    answer: "Prve promjene se često primijete nakon 3 do 4 tretmana, dok se puniji rezultati obično vide nakon 8 do 12 sedmica redovne upotrebe."
  },
  {
    id: 3,
    question: "Koliko dugo traju rezultati?",
    answer: "Uz pravilnu i redovnu upotrebu, rezultati mogu trajati mjesecima, a kasnije su potrebni samo povremeni tretmani održavanja."
  },
  {
    id: 4,
    question: "Na kojim dijelovima tijela mogu koristiti uređaj?",
    answer: "Pogodan je za noge, ruke, pazuhe, bikini zonu i lice ispod jagodične kosti, uz poštivanje uputstva proizvođača."
  },
  {
    id: 5,
    question: "Koliko često trebam koristiti uređaj?",
    answer: "Na početku se preporučuje nekoliko tretmana sedmično prema uputstvu, a kasnije povremeni tretmani održavanja."
  },
  {
    id: 6,
    question: "Da li je IPL siguran za kućnu upotrebu?",
    answer: "Da, IPL uređaji dizajnirani za kućnu upotrebu su potpuno sigurni kada se koriste prema uputstvima. Imaju ugrađene sigurnosne mehanizme i niže nivoe intenziteta od profesionalnih uređaja."
  },
  {
    id: 7,
    question: "Mogu li koristiti IPL na tamnijoj koži?",
    answer: "IPL najbolje funkcioniše na svjetlijoj koži sa tamnijim dlakama. Za tamnije tonove kože preporučujemo konsultaciju ili testiranje na maloj površini prije potpune upotrebe."
  },
  {
    id: 8,
    question: "Šta je razlika između IPL i laserskog tretmana?",
    answer: "IPL koristi široki spektar svjetlosti dok laser koristi jednu specifičnu talasnu dužinu. Oba su efikasna, ali IPL je pristupačniji za kućnu upotrebu i pokriva veću površinu odjednom."
  },
  {
    id: 9,
    question: "Kako se vrši dostava?",
    answer: "Dostava je besplatna na cijelu BiH i vrši se kurirskom službom. Paket stiže za 1-3 radna dana. Plaćanje je moguće pouzećem prilikom preuzimanja."
  },
  {
    id: 10,
    question: "Šta ako nisam zadovoljan proizvodom?",
    answer: "Prije narudžbe možete nas kontaktirati za preporuku modela i dodatna pitanja o korištenju. Dostava je besplatna, a plaćanje se vrši pouzećem."
  },
  {
    id: 11,
    question: "Da li dobijam uputstvo za korištenje?",
    answer: "Da, uz uređaj dobijaš informacije za pravilno korištenje. Ako imaš dodatna pitanja prije narudžbe ili tokom korištenja, možeš nas kontaktirati direktno."
  },
  {
    id: 12,
    question: "Koliko impulsa ima uređaj?",
    answer: "ICE COOL PRO i Max modeli imaju 999,999 bljeskova, dok LITE model ima 500,000 — svi dovoljni za višegodišnju upotrebu na cijelom tijelu."
  }
];

export const metadata: Metadata = {
  title: "FAQ | IPL Epilator, Dostava i Sigurnost | Aurora Shop",
  description:
    "Odgovori na najčešća pitanja o IPL epilatorima, rezultatima, sigurnosti, dostavi i korištenju za kupce u BiH.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Image */}
          <div className="text-center mb-12">
            <div className="relative h-64 rounded-3xl overflow-hidden mb-8 shadow-lg">
              <NextImage
                src="/slike/Gemini_Generated_Image_sbj41esbj41esbj4.png"
                alt="Često postavljana pitanja o IPL uređajima Ice Cool PRO™"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Često postavljana pitanja
                </h1>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              Pronađi odgovore na najčešća pitanja o IPL tretmanu
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <summary className="w-full list-none cursor-pointer p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors">
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 text-gray-600 transition-transform duration-200 group-open:rotate-45 group-open:text-[#563435]">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-br from-[#563435]/5 via-white/40 to-[#563435]/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Niste pronašli odgovor?
            </h2>
            <p className="text-gray-600 mb-6">
              Kontaktirajte nas i rado ćemo odgovoriti na sva vaša pitanja
            </p>
            <a
              href="/kontakt"
              className="inline-block px-8 py-3 bg-[#563435] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Kontaktirajte nas
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
