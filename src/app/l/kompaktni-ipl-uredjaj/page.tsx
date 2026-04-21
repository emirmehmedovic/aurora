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
  title: "ICE COOL LITE™ | IPL Epilator za Lice, Bikini i Cijelo Tijelo | BiH",
  description: "ICE COOL LITE — precizan IPL epilator za lice, bikini zonu i cijelo tijelo. 999.999 bljeskova, bezbolno Ice Cool™ hlađenje. Isti rezultati kao PRO, kompaktniji. BiH →",
  keywords: "IPL za lice BiH, IPL gornja usna, threading alternativa, IPL bikini zona, IPL epilator cijelo tijelo, ICE COOL LITE, IPL aparat Bosna",
  alternates: {
    canonical: "https://aurorashop.ba/l/kompaktni-ipl-uredjaj",
  }
};

const liteContent: LandingContent = {
  badge: "ICE COOL LITE™ — Rješenje za threading bol jednom zauvijek",
  heroHeadline: "Gornja usna. Brada. Bikini. Jednom zauvijek. Bez bola.",
  heroSubtitle: "Počni tamo gdje te najviše muči — pa tretiraj sve ostalo istim uređajem.",
  heroSubline: "Ista IPL snaga i 999.999 bljeskova kao PRO model — samo kompaktniji. Precizan nastavak za lice i bikini, ali radi i noge, ruke i pazuhe. Jedan uređaj. Sve zone. Jednom zauvijek.",
  benefits: [
    "Gornja usna i brada čiste za 4–5 sedmica — bez threading bola",
    "Radi sve: noge, ruke, pazuhe, bikini zona, lice — isti rezultati kao PRO",
    "999.999 bljeskova — ista snaga kao PRO model, kompaktniji i lakši za nošenje",
    "Bezbolno Ice Cool™ hlađenje — štiti i najosjetljiviju kožu, čak i na licu",
  ],
  empathyLabel: "Poznato ti je?",
  empathyTitle: "Svake 3 sedmice. Isti bol. Isti trošak. Isti kompleks.",
  empathySubtitle: "Gornja usna, brada, bikini linija — mjesta koja te svakodnevno podsjećaju da nisi gotova.",
  empathyParagraph1: "Threading boli. Svaki put isti ritual — zakazivanje, čekanje, suzne oči dok ti neko izvlači dlačicu po dlačicu. I dok izlaziš iz salona, već znaš: za 3 sedmice opet sve ispočetka. Godinama.",
  empathyParagraph2: "Vosak na bikini zoni? Crvenilo i urasle dlačice koji dolaze sedmicu-dvije poslije. Depilatorska krema na licu — pečenje, iritacija, sumnjivi miris. Nijedan od tih načina ne rješava problem — samo ga odgađa do sljedećeg puta.",
  empathyParagraph3: "Žene koje koriste LITE kažu da je ovo konačno rješenje, ne još jedan odgodak. Pet minuta jednom sedmično — i kompleks koji si nosila godinama počinje nestajati zauvijek.",
  empathyHighlight: "165 KM jednom. Manje od 3 odlaska na threading ili vosak.",
  story: {
    title: "'Počela sam za gornju usnu. Završila sam sa cijelim tijelom.'",
    text: "Imam mediteransku boju kože i tamne dlačice na licu od malena. Threading svake tri sedmice — skupa, bolna, rutina bez kraja. Kupila sam LITE isključivo za gornju usnu. Nakon 4 tretmana — 80% čista. Sada, 4 mjeseca kasnije, gornja usna i brada su čiste kao nikad. Ali onda sam pomislila — pa zašto ne i noge? I pazuhe? Isti uređaj, ista tehnologija. Sad tretiram cijelo tijelo. Za 165 KM riješila sam kompleks koji me mučio 15 godina — i dobila cijeli epilator na poklon.",
    authorName: "Amira K.",
    authorSubtitle: "32 god. · Sarajevo · koristi LITE 4 mjeseca",
  },
  howItWorks: [
    { step: 1, title: "Počni tamo gdje te najviše muči", desc: "Precizan nastavak za lice i bikini cilja tačno gornju usnu, bradu ili bikini liniju. Bezbolno, 5 minuta — promjene vidljive za 3–4 sedmice." },
    { step: 2, title: "Proširi na cijelo tijelo", desc: "Isti uređaj, iste postavke — noge, ruke, pazuhe. Tretiraj sve što hoćeš. LITE ima isti bljesak kao PRO, samo je glava malo manja pa noge traju koji minut duže." },
    { step: 3, title: "Jednom sedmično, pa zaboraviš", desc: "10–15 minuta za cijelo tijelo jednom sedmično. Nakon 8–10 sedmica prelaziš na jednom mjesečno. Brijanje, threading, vosak — sve je to prošlost." },
  ],
  urgencySection: {
    title: "⚡ Akcija traje još:",
    subtitle: "ICE COOL LITE™ trenutno dostupan sa 50% popusta. Akcija se završava kad istekne tajmer.",
  },
  reviews: [
    { name: "Amira", age: 32, text: "Godinama sam se stidila gornje usne. Threading svake 3 sedmice — bolno, skupo, iscrpljujuće. Kupila sam LITE sa skeptičnošću. Nakon 4 tretmana gornja usna mi je bila 80% čista. Sada, 4 mjeseca kasnije — nema ništa. Eliminisala sam kompleks koji me mučio 15 godina. Za 165 KM.", date: "Mart 2026", location: "Sarajevo" },
    { name: "Merjem", age: 25, text: "Imam mediteranski tip kože i tamne dlačice na licu od puberteta. LITE mi je promijenio život — bukvalno. Precizan nastavak radi savršeno za gornju usnu i bradu. Nakon 5 sedmica razlika je nevjerovatna. Sad ne izlazim iz kuće bez samopouzdanja.", date: "Mart 2026", location: "Mostar" },
    { name: "Lejla", age: 27, text: "Bikini zona je bila moj najveći problem — urasle dlačice i iritacija svaki put. Sa LITE-om — glatko bez iritacije, bez bola, bez uraslih. Tretiram 5 minuta jednom sedmično. Ne mogu zamisliti da sam godinama prolazila kroz onu torturu za vosak.", date: "Februar 2026", location: "Tuzla" },
    { name: "Sara", age: 22, text: "Kupila sam LITE samo za gornju usnu — to mi je bio najveći kompleks od tinejdžerskih dana. Već nakon 3 sedmice potpuno čista. Precizan nastavak pokriva tačno to malo područje. Hlađenje je super, ne osjeti se ništa. Za 165 KM ovo je dar od Boga.", date: "Februar 2026", location: "Sarajevo" },
    { name: "Aida", age: 28, text: "Imam osjetljivu kožu lica i bila sam sigurna da će iritirati. Ne — Ice Cool™ hlađenje je tako nježno da je ugodnije nego toner. Gornja usna i brada su mi čiste već 2 mjeseca bez ikakvog tretmana. Nikad više threading.", date: "Januar 2026", location: "Zenica" },
    { name: "Emina", age: 19, text: "Mama mi je kupila LITE za 18. rođendan i nisam vjerovala da će toliko raditi. Imam tamnu dlaku i gornju usnu sam mrzila od kad pamtim. Sada, 2 mjeseca kasnije — ne vidim ništa. Preporučila sam svim drugaricama.", date: "Januar 2026", location: "Sarajevo" },
  ],
  vsSection: {
    label: "Uradi račun",
    title: "Threading / Vosak vs. ICE COOL LITE™",
    subtitle: "Jednom platiš — zauvijek prestaneš plaćati.",
    rows: [
      { salon: "40–70 KM/mj. za threading lica i bikini vosak", ipl: "165 KM — jednom zauvijek" },
      { salon: "480–840 KM godišnje samo za lice i bikini", ipl: "0 KM u svim narednim godinama" },
      { salon: "Bol threading-a — suzne oči svaki put", ipl: "Bezbolno — Ice Cool™ hlađenje štiti lice" },
      { salon: "Urasle dlačice i iritacija na bikini zoni", ipl: "Glatko bez iritacije, bez uraslih dlačica" },
      { salon: "Za 3 sedmice već rastu — ispočetka", ipl: "Tretman po tretman — sve manje, sve rjeđe" },
      { salon: "Zakazivanje, čekanje, vožnja", ipl: "5 minuta kod kuće, jednom sedmično" },
    ],
  },
  skepticSection: {
    label: "Imaš pitanja?",
    title: "Razumijemo skeptičnost — evo iskrenih odgovora",
    items: [
      {
        q: '„Boli li na licu i bikini zoni — iskreno?"',
        a: "Ne. To je najčešće pitanje i najiskrenniji odgovor je: Ice Cool™ hlađenje radi tokom svakog bljeska. 9 od 10 kupica kaže da osjetile blagu toplinu — ništa više. Čak i na gornjoj usni i bikini liniji gdje je koža najtanja i najosjetljivija.",
      },
      {
        q: '„Stvarno ima 999.999 bljeskova — koliko je to?"',
        a: "Da — isti broj kao PRO model. Za lice, gornju usnu, bikini zonu i pazuhe, 999.999 bljeskova je dovoljno za 15+ godina tretmana. U praksi — kupuješ jednom i ne trebaš ga zamijeniti nikad za vijeka upotrebe.",
      },
      {
        q: '„Razlikuje li se od jeftinijih IPL uređaja?"',
        a: "Da, značajno. Jeftini IPL uređaji (ispod 60 KM) nemaju hlađenje, imaju slab bljesak i rade samo na najsvjetlijim tipovima kože. LITE ima Ice Cool™ hlađenje, dovoljno jak bljesak za vidljive rezultate i radi na tipovima kože I–V.",
      },
      {
        q: '„Koliko dugo do rezultata — na licu i na nogama?"',
        a: "Na gornjoj usni i bradi — promjene vidljive nakon 3–4 sedmice. Bikini zona — 4–5 sedmica. Noge i pazuhe — 6–8 sedmica. Potpun rezultat svuda za 8–10 sedmica tretmana jednom sedmično.",
      },
      {
        q: '„Može li LITE zamijeniti PRO za noge i cijelo tijelo?"',
        a: "Da — ista IPL tehnologija, isti broj bljeskova (999.999), isto hlađenje. Jedina razlika je veličina glave — LITE je malo sporiji za noge (treba 15–20 min umjesto 10). Ako ti brzina nije prioritet i hoćeš jedan uređaj za sve, LITE to radi savršeno.",
      },
    ],
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "3" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Dizajn", value: "Kompaktan, prenosiv" },
    { label: "Posebni nastavci", value: "Precizan nastavak za lice i bikini zonu" },
    { label: "Pogodno za", value: "Lice, gornja usna, brada, pazuh, bikini zona, noge" },
    { label: "Tip kože", value: "Fitzpatrick I-V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, precizan nastavak, korisnički priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Jedan uređaj. Sve zone. 165 KM jednom zauvijek.",
  closingText: "Počni za lice i bikini. Nastavi za noge i cijelo tijelo. Ista snaga kao PRO — kompaktniji i 10 KM jeftiniji. Plaćanje pouzećem · Besplatna dostava u BiH · 14 dana povrat bez pitanja.",
  beforeAfterImages: [
    {
      image: "/testimonials/before-after/lite1.png",
      label: "Sara, 22 god. · Sarajevo · gornja usna · 5 sedmica",
    },
    {
      image: "/testimonials/before-after/lite2.png",
      label: "Aida, 28 god. · Tuzla · bikini zona · 6 sedmica",
    },
    {
      image: "/testimonials/before-after/lite3.png",
      label: "Hana, 22 god. · Bihać · noge · 8 sedmica",
    },
  ],
};

export default async function KompaktniIplLandingPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-lite"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": "ICE COOL LITE — precizni IPL uređaj za gornju usnu, bradu i bikini zonu. 999.999 bljeskova, bezbolno Ice Cool™ hlađenje, vidljivi rezultati za 3–4 sedmice.",
    "brand": { "@type": "Brand", "name": "Ice Cool PRO™" },
    "image": `https://aurorashop.ba${product.image}`,
    "offers": {
      "@type": "Offer",
      "price": product.price.toFixed(2),
      "priceCurrency": "BAM",
      "availability": "https://schema.org/InStock",
      "url": "https://aurorashop.ba/l/kompaktni-ipl-uredjaj",
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
      "reviewCount": "28"
    }
  };

  return (
    <>
      <Script
        id="product-jsonld-lite"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding
        product={product}
        content={liteContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
