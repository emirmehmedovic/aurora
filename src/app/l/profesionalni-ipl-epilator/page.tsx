import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ICE COOL Max™ | Profesionalni IPL Epilator — Salon Rezultati Kod Kuće | BiH",
  description: "ICE COOL Max – profesionalni IPL epilator s najvećom površinom bljeska i naprednim hlađenjem. Salon rezultati kod kuće. Besplatna dostava u BiH →",
  keywords: "profesionalni IPL epilator, IPL aparat, lasersko uklanjanje dlačica, trajno uklanjanje dlačica BiH, ICE COOL Max, IPL epilator cijena",
  alternates: {
    canonical: "https://aurorashop.ba/l/profesionalni-ipl-epilator",
  }
};

const maxContent: LandingContent = {
  badge: "Za žene kojima je vrijeme najvažnije",
  heroHeadline: "Noge gotove za 10 minuta. Rezultati kao u salonu — kod kuće.",
  heroSubtitle: "Dvostruko hlađenje. Najveća površina bljeska. Za žene koje neće čekati.",
  benefits: [
    "Noge za 10 min — veća površina bljeska pokriva više kože svakim impulsom",
    "Dvostruko hlađenje (Ice Cool+™) — čak na punoj snazi osjetiš samo blagu toplinu",
    "Vidljivi rezultati za 2-3 sedmice — brže nego standardni modeli",
    "Cijelo tijelo bez iznimke — noge, ruke, pazuhe, bikini, lice i leđa",
  ],
  empathyLabel: "Poznato ti je?",
  empathyTitle: "Nemaš vremena za salone?",
  empathySubtitle: "Max je napravljen za tvoj tempo života.",
  empathyParagraph1: "Posao, kuća, obaveze — a ti još trebaš naći sat vremena za salon? I platiti 80-150 KM svaki put? Koliko je to godišnje — 1.000? 1.500 KM? I onda sve počne ispočetka čim prestaneš ići.",
  empathyParagraph2: "ICE COOL Max ima najveću površinu bljeska u našoj liniji — svaki impuls pokriva više kože, pa noge završiš za 10 minuta umjesto sat u salonu. Ice Cool+™ dvostruko hlađenje znači da čak na punoj snazi ne osjetiš ništa osim blage topline.",
  empathyParagraph3: "Žene koje koriste Max kažu da im je ovo prva epilacija koja se zaista uklapa u život — ne planiraš oko nje, samo uzmeš uređaj nedjeljom uveče i za 10 minuta si gotova.",
  empathyHighlight: "190 KM jednom. Tretman kod kuće kad tebi odgovara. Rezultati kao u salonu — bez računa, bez čekanja, bez boli.",
  story: {
    title: "'Išla sam u salon 2 godine. Sad ne mogu vjerovati da sam toliko novca bacila.'",
    text: "Svaka seansa u salonu: 100-120 KM. Plus vožnja, čekanje, zakazivanje unaprijed. Kad sam izračunala da sam potrošila preko 2.000 KM za 2 godine — zamalo sam zaplakala. Max sam kupila jer prijateljica ima PRO i bila je oduševljena, a ja sam htjela najjači model. Razlika je ogromna — noge završim za 10 minuta, hlađenje je nevjerovatno, a već nakon 3 sedmice pazuhe su bile potpuno glatke. Sada sam na četvrtom mjesecu i iskreno ne sjećam se kad sam zadnji put koristila žilet.",
    authorName: "Selma K.",
    authorSubtitle: "32 god. · Mostar · koristi Max 4 mjeseca",
  },
  howItWorks: [
    { step: 1, title: "Veći bljesak = brži tretman", desc: "Max pokriva veću površinu kože svakim impulsom. Noge, ruke, pazuhe — sve završiš za manje od 15 minuta. Manje posla, više rezultata." },
    { step: 2, title: "Dvostruko hlađenje štiti kožu", desc: "Ice Cool+™ hladi kožu prije i poslije svakog bljeska. Čak i na najjačem nivou osjetiš samo blagu toplinu — ništa više." },
    { step: 3, title: "Brži rezultati nego sa standardnim modelom", desc: "Pojačana snaga znači da folikuli reaguju brže. Većina korisnica primijeti vidnu razliku već za 2-3 sedmice." },
  ],
  urgencySection: {
    title: "⚡ Akcija traje još:",
    subtitle: "ICE COOL Max™ trenutno dostupan sa 52% popusta. Akcija se završava kad istekne tajmer.",
  },
  reviews: [
    { name: "Emina", age: 29, text: "Imam dvoje djece i posao — nemam vremena za salone. Max mi treba 10 minuta nedjeljom uveče i to je to. Već nakon trećeg tretmana pazuhe su mi bile glatke. Za 190 KM dobila sam nešto što bi me u salonu koštalo 1.500+ KM.", date: "Mart 2026", location: "Mostar" },
    { name: "Nina", age: 34, text: "Išla sam na profesionalni laser 2 godine. Iskreno — Max daje iste rezultate. Razlika je što sad radim kod kuće, kad meni odgovara, i ne dajem 100 KM svaki mjesec. Noge ne brijam već 3 sedmice i koža je glatka.", date: "Februar 2026", location: "Sarajevo" },
    { name: "Jasmina", age: 27, text: "Kupila sam jeftiniji IPL prošle godine i nije uradio ništa. Max je potpuno druga priča — osjetiš da ima snage. Ali hlađenje je tako dobro da ne boli. Bikini zona mi je sada čista bez ijednog problema. Preporod.", date: "Januar 2026", location: "Banja Luka" },
    { name: "Amra", age: 31, text: "Kupila sam Max jer sam htjela najjači model — i ne žalim ni sekunde. Noge završim za 8 minuta, hlađenje je nevjerovatno. Muž kaže da mi je koža ljepša nego ikad. Za 190 KM sam dobila nešto što salone učini suvišnim zauvijek.", date: "Mart 2026", location: "Zenica" },
    { name: "Lejla", age: 26, text: "Radim u smjenama i saloni mi nikad nisu odgovarali rasporedom. Max mi je spas — koristim ga kad god imam 10 slobodnih minuta. Već drugi mjesec i noge su mi glatke kao nikad. Preporučila sam ga svim kolegicama.", date: "Februar 2026", location: "Tuzla" },
    { name: "Sabina", age: 38, text: "Probala sam sve — vosak, kreme, brijanje. Sve se vraćalo. Max je jedino što je zaista promijenilo situaciju. Dvostruko hlađenje je ključ — čak i bikini zona ne boli. Nakon 6 sedmica jedva da ima dlačica. Ovo je bila moja najbolja investicija.", date: "Januar 2026", location: "Sarajevo" },
  ],
  vsSection: {
    label: "Uradi račun",
    title: "Salon vs. ICE COOL Max™",
    subtitle: "Pogledaj razliku jednom — i sve je jasno.",
    rows: [
      { salon: "80–150 KM svaki posjet", ipl: "190 KM — jednom zauvijek" },
      { salon: "1.000–1.800 KM godišnje", ipl: "0 KM godišnje (već si platila)" },
      { salon: "Sat čekanja, zakazivanje, vožnja", ipl: "10 minuta kod kuće, kad tebi odgovara" },
      { salon: "Boli — crvenilo, iritacija", ipl: "Bezbolno — dvostruko Ice Cool+™ hlađenje" },
      { salon: "Dlačice rastu za 2-4 sedmice", ipl: "Rast se usporava sa svakim tretmanom" },
      { salon: "Bez kraja — uvijek iznova", ipl: "Trajno rješenje, 10+ godina" },
    ],
  },
  skepticSection: {
    label: "Imaš pitanja?",
    title: "Razumijemo skeptičnost — evo odgovora",
    items: [
      {
        q: '„Je li Max zaista bolji od standardnog modela?"',
        a: "Da — Max ima najveću površinu bljeska i pojačanu snagu. Noge završiš za 8-10 minuta umjesto 20+. Dvostruko Ice Cool+™ hlađenje znači da je tretman ugodan čak i na bikini zoni i licu. Vidljive razlike dolaze brže — već za 2-3 sedmice.",
      },
      {
        q: '„Da li boli?"',
        a: "Ice Cool+™ hladi kožu i prije i poslije svakog bljeska. Kupice kažu da je tretman ugodan čak i na najosjetljivijim područjima — bikini zona, lice, pazuhe. Mnoge opisuju osjećaj kao blagu toplinu i ništa više.",
      },
      {
        q: '„Probala sam jeftini IPL i nije radio."',
        a: "Jeftini aparati imaju premalu energiju. Max ima 5+ pojačanih razina intenziteta i profesionalnu snagu. Nije usporediv s aparatima koji koštaju 30-60 KM — to je potpuno drugačija kategorija.",
      },
      {
        q: '„Koliko dugo dok vidim rezultate?"',
        a: "Prve razlike vidljive su već za 2-3 sedmice (brže nego standardni modeli). Za potpun rezultat — 8-10 sedmica. Zatim samo održavanje jednom u 4-6 sedmica.",
      },
    ],
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5+ (pojačana snaga)" },
    { label: "Površina bljeska", value: "Najveća u liniji (4.5 cm²)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool+™ napredno hlađenje" },
    { label: "Brzina impulsa", value: "Brže punjenje između impulsa" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuh, bikini zona, lice, leđa" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, nastavci, korisnički priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Salon u džepu. 190 KM jednom — zauvijek.",
  closingText: "Svaka seansa u salonu je novac koji više ne moraš davati. Max se isplati već nakon drugog tretmana. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
  beforeAfterImages: [
    {
      image: "/testimonials/before-after/max1.png",
      label: "Emina, 29 god. · Mostar · 8 sedmica tretmana",
    },
    {
      image: "/testimonials/before-after/max2.png",
      label: "Jasmina, 35 god. · Banja Luka · 6 sedmica tretmana",
    },
    {
      image: "/testimonials/before-after/max3.png",
      label: "Nina, 27 god. · Sarajevo · 10 sedmica tretmana",
    },
  ],
};

export default async function ProfesionalniIplLandingPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro-max"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": "Profesionalni IPL epilator s najvećom površinom bljeska za najbrže rezultate",
    "brand": { "@type": "Brand", "name": "Ice Cool PRO™" },
    "image": `https://aurorashop.ba${product.image}`,
    "offers": {
      "@type": "Offer",
      "price": product.price.toFixed(2),
      "priceCurrency": "BAM",
      "availability": "https://schema.org/InStock",
      "url": "https://aurorashop.ba/l/profesionalni-ipl-epilator",
      "priceValidUntil": "2026-12-31",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "BAM"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "BA"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 1,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "BA",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 14,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "32"
    }
  };

  return (
    <>
      <Script
        id="product-jsonld-max"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding
        product={product}
        content={maxContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
