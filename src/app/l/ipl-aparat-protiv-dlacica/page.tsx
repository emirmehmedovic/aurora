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
  title: "ICE COOL PRO™ | IPL Aparat za Trajno Uklanjanje Dlačica | BiH",
  description: "ICE COOL PRO – IPL aparat za trajno uklanjanje dlačica kod kuće. 5 nivoa intenziteta, Ice Cool™ hlađenje, 999k bljeskova. Besplatna dostava u BiH. Naruči danas →",
  keywords: "IPL aparat, IPL epilator, lasersko uklanjanje dlačica kod kuće, IPL aparat cijena BiH, IPL uređaj Bosna, ICE COOL PRO, epilacija kod kuće",
  alternates: {
    canonical: "https://aurorashop.ba/l/ipl-aparat-protiv-dlacica",
  }
};

const proContent: LandingContent = {
  badge: "Ice Cool PRO™ — Najpopularniji model u BiH",
  heroHeadline: "Zamisli da više nikad ne moraš brijati noge",
  heroSubtitle: "Zamisli da više nikad ne moraš brijati noge. Bez bola, bez salona, bez vječitog trošenja.",
  heroSubline: "Svaka žena u BiH koja ode u salon za depilaciju daje između 700 i 1.200 KM godišnje. Ice Cool PRO to mijenja — jednom za svagda.",
  benefits: [
    "Rezultati već nakon 3-4 tretmana",
    "Bezbolno — ugrađeno hlađenje štiti kožu",
    "Noge, ruke, pazuhe, bikini, lice — sve u jednom",
    "175 KM jednom = 10+ godina bez salona",
  ],
  empathyLabel: "Poznato ti je?",
  empathyTitle: "Umorna si od ovog začaranog kruga",
  empathySubtitle: "Nisi jedina. I postoji bolji način.",
  empathyParagraph1: "Obriješ se ujutro — uveče već osjetiš bockanje. Izbjegavaš kratku suknju jer znaš kako noge izgledaju do kraja dana. Ili trošiš 60-80 KM na vosak koji te ostavlja crvenu, bolnu i s problemima koji počinju ponovo za par sedmica.",
  empathyParagraph2: "To je novac koji nikad ne prestaje odlaziti. Žena koja ide u salon jednom mjesečno troši 720-960 KM godišnje. Za pet godina — do 5.000 KM. Za isti problem. Uvijek iznova.",
  empathyParagraph3: "Nisi jedina koja se zapitala mora li tako biti. I odgovor je — ne mora. ICE COOL PRO koristi istu tehnologiju koju koriste saloni, ali kod tebe kući. Ugrađeno hlađenje štiti kožu pa ne osjetiš ništa. A rezultati počinju već nakon trećeg tretmana.",
  empathyHighlight: "175 KM jednom. I koža ti je glatka godinama.",
  story: {
    title: "'Za 4 godine dala sam preko 3.000 KM na salone. Ice Cool PRO je promijenio sve.'",
    text: "Svaki mjesec sam išla na depilaciju voskom — 70 KM, plus bol, plus crvenilo. Izračunala sam da sam za 4 godine dala preko 3.000 KM. Muž me godinama nagovarao da probam IPL kod kuće, ali bojala sam se da će boljeti. Kad je Ice Cool PRO stigao, nisam mogla vjerovati — ne boli. Bljesak, hlađenje, i to je to. Nakon četiri tretmana pazuhe su mi bile potpuno glatke. Za 175 KM imam nešto što će mi trajati godinama.",
    authorName: "Amila H.",
    authorSubtitle: "28 god. · Sarajevo · koristi PRO 3 mjeseca",
  },
  howItWorks: [
    { step: 1, title: "Svjetlosni impuls cilja korijen dlačice", desc: "IPL bljesak prolazi kroz kožu i uspavljuje folikul dlačice. Ugrađeno hlađenje radi istovremeno — ne osjetiš bol, samo blagu toplinu." },
    { step: 2, title: "Dlačica prestaje rasti — sedmicu po sedmicu", desc: "Svaki tretman šalje signal folikulu da uspori. Iz sedmice u sedmicu, dlačice su rjeđe, tanje, i manje vidljive. Nakon 3-4 tretmana razlika je vidljiva." },
    { step: 3, title: "Glatka koža postaje tvoja nova norma", desc: "Nakon 8-12 sedmica, većina žena prelazi na održavanje jednom u 4-6 sedmica. Žilet i salon postaju prošlost." },
  ],
  urgencySection: {
    title: "⚡ Akcija traje još:",
    subtitle: "Ice Cool PRO™ trenutno dostupan sa 49% popusta. Akcija se završava kad istekne tajmer.",
  },
  reviews: [
    { name: "Merjem", age: 26, text: "Najviše me brinulo da li će boljeti jer imam jako osjetljivu kožu. Ali — ništa. Osjetim laganu toplinu i to je sve. Sad sam na drugom mjesecu i pazuhe više uopšte ne brijam. Noge brijam jednom u 10 dana. Ovo je najboljih 175 KM koje sam ikad potrošila.", date: "Februar 2026", location: "Sarajevo" },
    { name: "Lamija", age: 31, text: "Godinama sam trošila na vosak u salonu. 70 KM svaki put, jednom-dva puta mjesečno. Ovaj uređaj je stigao za manje od 200 KM i nakon 6 sedmica razlika je nevjerovatna. Muž mi kaže da mi je koža ljepša nego ikad.", date: "Januar 2026", location: "Tuzla" },
    { name: "Adna", age: 23, text: "Bila sam skeptična prema kućnoj IPL depilaciji dok mi drugarica nije pokazala noge nakon 2 mjeseca. Odmah sam naručila. Radim tretman nedjeljom uveče uz Netflix — 10 minuta za noge — i koža mi je bolja nego ikad.", date: "Mart 2026", location: "Zenica" },
    { name: "Emina", age: 29, text: "Imam dvoje djece i posao — nemam vremena za salone. Ovo mi treba 10 minuta nedjeljom uveče i to je to. Već nakon trećeg tretmana pazuhe su mi bile glatke. Za 175 KM dobila sam nešto što bi me u salonu koštalo 1.500+ KM.", date: "Mart 2026", location: "Mostar" },
    { name: "Jasmina", age: 27, text: "Kupila sam jeftiniji IPL prošle godine i nije uradio ništa. Ice Cool PRO je potpuno druga priča — osjetiš da ima snage. Ali hlađenje je tako dobro da ne boli. Bikini zona mi je sada čista bez ijednog problema.", date: "Januar 2026", location: "Banja Luka" },
    { name: "Nina", age: 34, text: "Išla sam na profesionalni laser 2 godine. Iskreno — ovaj uređaj daje iste rezultate. Razlika je što sad radim kod kuće, kad meni odgovara, i ne dajem 100 KM svaki mjesec. Noge ne brijam već 3 sedmice.", date: "Februar 2026", location: "Sarajevo" },
  ],
  vsSection: {
    label: "Uradi račun",
    title: "Salon vs. Ice Cool PRO™",
    subtitle: "Samo jednom pogledaj ovu tabelu — i sve je jasno.",
    rows: [
      { salon: "60–100 KM svaki posjet", ipl: "175 KM — jednom zauvijek" },
      { salon: "720–1.200 KM godišnje", ipl: "0 KM godišnje (već si platila)" },
      { salon: "Zakazivanje, čekanje, vožnja", ipl: "Kod kuće, u pidžami, uz Netflix" },
      { salon: "Boli — crvenilo, iritacija", ipl: "Bezbolno — ugrađeno hlađenje" },
      { salon: "Dlačice rastu za 2-4 sedmice", ipl: "Rast se usporava sa svakim tretmanom" },
      { salon: "Bez kraja — uvijek iznova", ipl: "Trajno rješenje, 10+ godina" },
    ],
  },
  skepticSection: {
    label: "Imaš pitanja?",
    title: "Razumijemo skeptičnost — evo odgovora",
    items: [
      {
        q: '„Hoće li stvarno raditi za mene?"',
        a: "IPL funkcioniše na principu svjetlosnog impulsa koji cilja folikul dlačice. Radi na svim tipovima kože i dlaka (izuzev najsvjetlijih nijansi). Ako nisi zadovoljna — imaš 14 dana za povrat bez pitanja. Nula rizika s tvoje strane.",
      },
      {
        q: '„Da li boli?"',
        a: 'Ice Cool PRO ima ugrađeni sistem hlađenja koji radi istovremeno s bljeskanjem. 9 od 10 kupica kaže da su iznenađene koliko je bezbolno — "blaga toplina i to je to" je najčešći opis. Mnoge kažu da je ugodnije od brijanja.',
      },
      {
        q: '„Probala sam jeftini IPL i nije radio."',
        a: "Jeftini aparati imaju premalu energiju da bi dali rezultate. Ice Cool PRO ima 5 razina intenziteta i 999.999 bljeskova profesionalne snage. Nije usporediv s aparatima koji koštaju 30-50 KM.",
      },
      {
        q: '„Koliko dugo dok vidim rezultate?"',
        a: "Prve razlike vidljive su već nakon 3-4 tretmana (2-4 sedmice). Za potpun rezultat — 8-12 sedmica redovnih tretmana. Zatim samo održavanje jednom u 4-6 sedmica.",
      },
    ],
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuh, bikini zona, lice" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Jednom kupiš. 10 godina ne briješ.",
  closingText: "Svaki dan koji odgađaš je još jedno jutro sa brijačem u ruci. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
  beforeAfterImages: [
    {
      image: "/testimonials/before-after/pro1.png",
      label: "Ivana, 24 god. · Banja Luka · 8 sedmica tretmana",
    },
    {
      image: "/testimonials/before-after/pro2.png",
      label: "Marina, 31 god. · Mostar · 6 sedmica tretmana",
    },
    {
      image: "/testimonials/before-after/pro3.png",
      label: "Amra, 23 god. · Tuzla · 10 sedmica tretmana",
    },
  ],
};

export default async function IplAparatLandingPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": "IPL uređaj za trajno uklanjanje dlačica kod kuće sa Ice Cool™ hlađenjem",
    "brand": { "@type": "Brand", "name": "Ice Cool PRO™" },
    "image": `https://aurorashop.ba${product.image}`,
    "offers": {
      "@type": "Offer",
      "price": product.price.toFixed(2),
      "priceCurrency": "BAM",
      "availability": "https://schema.org/InStock",
      "url": "https://aurorashop.ba/l/ipl-aparat-protiv-dlacica",
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
      "reviewCount": "47"
    }
  };

  return (
    <>
      <Script
        id="product-jsonld-pro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding
        product={product}
        content={proContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
