import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLandingV2 from "@/components/AdvertorialLandingV2";
import SummerVibesWrapper from "@/components/SummerVibesWrapper";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";
import heroRightImage from "../../../../noviland/16.png";
import heroLeftImage from "../../../../testimonials/1.png";
import sectionImage from "../../../../testimonials/dizajn-bez-naslova-3.png";
import testimonial3Image from "../../../../testimonials/3.png";
import testimonial4Image from "../../../../testimonials/4.png";
import testimonial8Image from "../../../../testimonials/8.png";
import testimonial9Image from "../../../../testimonials/9.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zašto sve više žena preskače skupe salone i prelazi na kućni uređaj za glatku kožu s hlađenjem? | Aurora Style",
  description: "Uređaj od 175 KM koji koristi svjetlosne impulse, hladi kožu tokom tretmana i pomaže da dlačice vremenom rastu rjeđe, tanje i sporije.",
  keywords: "IPL uređaj BiH, kućna depilacija, hlađenje kože, Ice Cool Pro, trajno uklanjanje dlačica, IPL vs salon",
  alternates: {
    canonical: "https://aurorashop.ba/l/summer-glatka-koza",
  },
};

const summerSmoothContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Ljepota & Njega",
  articleHeadline:
    "Zašto sve više žena preskače skupe salone i prelazi na kućni uređaj za glatku kožu s hlađenjem?",
  articleDeck:
    "Uređaj od 175 KM koji koristi svjetlosne impulse, hladi kožu tokom tretmana i pomaže da dlačice vremenom rastu rjeđe, tanje i sporije.",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "31. maj 2026.",
  readingTime: "5 minuta čitanja",
  heroImageDesc:
    "Glatka koža bez stalnog brijanja — rezultat koji žene postižu sa ICE COOL PRO",
  heroImageLeftSrc: heroLeftImage.src,
  heroImageLeftAlt: "ICE COOL PRO uređaj sa ugrađenim hlađenjem kože",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt: "Žena uživa u glatkoj koži bez odlaska u salon",
  intro:
    "Ako si ikada probala brijanje, depilaciju voskom, salonske tretmane ili skupe kućne uređaje za uklanjanje dlačica, znaš jednu stvar: glatka koža obično ima cijenu. Nekad je to novac. Nekad bol. Nekad iritacija. Nekad stalno zakazivanje termina. A najčešće — sve zajedno. Zato je sve više pažnje privukao kućni uređaj za dugotrajno smanjenje dlačica koji koristi svjetlosne impulse, ali uz jednu veliku razliku: ima ugrađeno hlađenje kože tokom tretmana.",
  sections: [
    {
      heading: "Šta je zapravo ovaj uređaj?",
      paragraphs: [
        "Ovo je kućni uređaj za smanjenje dlačica pomoću svjetlosnih impulsa — tehnologija poznata kao IPL. Ali ne brini ako ne znaš šta znači IPL. Najjednostavnije rečeno: uređaj ne čupa dlačice kao vosak i ne siječe ih kao brijač. On šalje blage svjetlosne impulse prema korijenu dlačice. Redovnom upotrebom dlačice mogu postati rjeđe, tanje i sporije rasti.",
        "Zato ga žene koriste za noge, ruke, pazuhe, bikini zonu i druge dijelove tijela.",
      ],
    },
    {
      heading: "Zašto je ugrađeno hlađenje toliko važno?",
      paragraphs: [
        "Kod mnogih klasičnih uređaja problem nije samo rezultat. Problem je osjećaj. Koža se zagrije. Tretman počne peckati. Moraš praviti pauze. Ako imaš osjetljiviju kožu, lako odustaneš.",
        "Zato je ovaj model drugačiji. Ugrađeno hlađenje hladi kožu tokom tretmana, pa je osjećaj znatno ugodniji u odnosu na klasične uređaje bez hlađenja. To znači da tretman lakše uradiš do kraja, bez stalnog zaustavljanja i bez onog osjećaja da 'trpiš ljepotu'.",
        "A upravo je redovna upotreba ključ rezultata.",
      ],
      imageSrc: sectionImage.src,
      imageAlt: "Ugodni tretman sa Ice Cool hlađenjem — bez peckanja i neugodnosti",
      imageAspect: "landscape",
      highlight:
        "Ugrađeno hlađenje hladi kožu tokom tretmana i čini korištenje znatno ugodnijim nego kod klasičnih uređaja bez hlađenja.",
      calloutAfter: true,
    },
    {
      heading: "Zašto bih išla u salon ako ovo mogu koristiti kod kuće?",
      paragraphs: [
        "To je pitanje koje sve više žena postavlja. Salonski tretmani mogu biti efikasni, ali dolaze sa svojim problemima: moraš zakazivati termin, moraš ići više puta, tretmani se plaćaju iznova, cijena brzo naraste, nije uvijek ugodno, nemaš privatnost kao kod kuće.",
        "S druge strane, ovaj uređaj koristiš kad želiš. Navečer. Poslije tuširanja. Dok gledaš seriju. Bez termina. Bez salona. Bez neugodnosti.",
      ],
    },
    {
      heading: "A šta je s uređajima koji koštaju preko 1.000 KM?",
      paragraphs: [
        "Mnoge žene su čule za poznate kućne uređaje poput Philips Lumea. Problem? Njihova cijena često ide i preko 1.000 KM, a u prosjeku se kreće oko 1.500 KM.",
        "Ovaj uređaj košta 175 KM. I upravo zato je izazvao toliko pažnje. Ne zato što je 'još jedan aparat za dlačice', nego zato što spaja tri stvari koje žene najviše traže: kućnu upotrebu, ugodniji tretman zbog hlađenja i cijenu koja nije šok za novčanik.",
      ],
    },
    {
      heading: "Šta korisnice najviše primijete?",
      paragraphs: [
        "Najčešći komentari korisnica nisu samo o rezultatima. One najviše ističu osjećaj tokom korištenja.",
        "'Ne peče kao što sam očekivala.' 'Hlađenje se stvarno osjeti.' 'Mogu završiti tretman bez pauze.' 'Dlačice su mi vremenom rjeđe.' 'Ne moram više stalno brijati noge.'",
        "Upravo zato je ovaj uređaj dobar izbor za žene koje su ranije odustale od sličnih tretmana jer su im bili neugodni.",
      ],
    },
    {
      heading: "Kako se koristi?",
      paragraphs: [
        "Korištenje je jednostavno. Obriješ područje koje želiš tretirati. Uključiš uređaj. Odabereš jačinu koja ti odgovara. Prisloniš uređaj na kožu. Svjetlosni impuls odradi tretman, dok hlađenje hladi kožu.",
        "Tretman možeš raditi kod kuće, bez posebne pripreme i bez odlaska u salon.",
      ],
    },
    {
      heading: "Kada se vide rezultati?",
      paragraphs: [
        "Rezultati nisu instant, jer uređaj djeluje postepeno. Kod redovne upotrebe, dlačice vremenom mogu postati sporije u rastu, tanje, rjeđe i manje vidljive.",
        "Najbolji rezultati dolaze uz redovno korištenje prema uputstvu.",
      ],
    },
    {
      heading: "Zašto je cijena samo 175 KM?",
      paragraphs: [
        "Zato što ne plaćaš ime velikog brenda, skupe salone i nepotrebne dodatne troškove. Plaćaš ono što ti zaista treba: uređaj za kućno smanjenje dlačica, svjetlosnu tehnologiju i ugrađeno hlađenje koje tretman čini ugodnijim.",
        "Za mnoge žene, to je razlika između 'želim to, ali preskupo je' i 'ovo konačno mogu probati'.",
      ],
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO™",
    subtitle: "Kućni IPL uređaj s hlađenjem · 175 KM · Besplatna dostava",
    bullets: [
      "Ice Cool™ hlađenje — tretman ugodan na svim dijelovima tijela",
      "999.999 bljeskova — doživotni uređaj bez zamjene lampice",
      "Jednostavna upotreba — kod kuće, bez termina",
      "Sve zone: noge, pazuhe, bikini zona, ruke, lice",
      "plaćanje pouzećem · detaljno uputstvo · Plaćanje pouzećem",
    ],
  },
  articleClosingHighlight:
    "Nije u pitanju savršena koža. U pitanju je sloboda da ne razmišljaš o dlačicama svaki dan. ICE COOL PRO to mijenja.",
  reviews: [
    {
      name: "Sanela",
      age: 30,
      text: "Moja koža reaguje na sve. Vosak mi daje crvenilo koje traje dva dana, brijanje pak urasle dlačice koje treba vaditi. Sa ICE COOL PRO doslovno ništa negativno i dlačice nestaju tretman po tretman.",
      date: "Mart 2026",
      location: "Zenica",
      imageSrc: testimonial3Image.src,
      imageAlt: "Sanela, glatka koža bez iritacije nakon ICE COOL PRO",
    },
    {
      name: "Lejla",
      age: 26,
      text: "Bikini zona je bila moj problem godinama. Urasle dlačice i iritacija sedmicu-dvije poslije svakog voska. Sa ICE COOL PRO nema uraslih ni crvenila. Potpuno drugačije iskustvo.",
      date: "Februar 2026",
      location: "Mostar",
      imageSrc: testimonial4Image.src,
      imageAlt: "Lejla, korisnica ICE COOL PRO za bikini zonu bez iritacije",
    },
    {
      name: "Maida",
      age: 35,
      text: "Imam osjetljivu kožu i bojala sam se reakcija pa sam uradila patch test. Ništa. Sad koristim na cijelim nogama i pazuhama, nula iritacije i nula uraslih. Prva metoda koja mi zaista odgovara.",
      date: "Januar 2026",
      location: "Tuzla",
      imageSrc: testimonial8Image.src,
      imageAlt: "Maida, ICE COOL PRO za osjetljivu kožu bez reakcije",
    },
    {
      name: "Amra",
      age: 29,
      text: "Godinama sam imala problem s uraslim dlačicama na potkoljenicama. Stalno vaditi, stalno crvenilo. Nakon 6 sedmica ICE COOL PRO ne vidim više uraslu dlačicu. Koža izgleda drugačije, mirno.",
      date: "Mart 2026",
      location: "Sarajevo",
      imageSrc: testimonial9Image.src,
      imageAlt: "Amra, nestanak uraslih dlačica nakon ICE COOL PRO tretmana",
    },
  ],
  vsSection: {
    label: "Poređenje",
    title: "Brijanje i salon svako ljeto vs. ICE COOL PRO jednom",
    subtitle: "Isti cilj — glatka koža. Ali samo jedno rješenje ne zahtijeva stalno ponavljanje.",
    rows: [
      { salon: "Cijena|Brijanje", ipl: "Stalni trošak + iritacija|175 KM jednom" },
      { salon: "Vosak/salon", ipl: "Skupo, bolno, moraš čekati|Kod kuće kad želiš" },
      { salon: "Osjećaj", ipl: "Često peče i boli|Hlađenje čini ugodnim" },
      { salon: "Rezultati", ipl: "Privremeno|Dlačice rastu rjeđe" },
      { salon: "Praktičnost", ipl: "Termini i dolasci|Kod kuće, bez termina" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o ICE COOL PRO uređaju",
    items: [
      {
        q: "Da li boli?",
        a: "Zahvaljujući ugrađenom hlađenju, tretman je znatno ugodniji nego kod klasičnih uređaja bez hlađenja. Osjećaj može zavisiti od tipa kože, područja i odabrane jačine.",
      },
      {
        q: "Da li čupa dlačice?",
        a: "Ne. Uređaj ne čupa dlačice. Koristi svjetlosne impulse koji djeluju prema korijenu dlačice.",
      },
      {
        q: "Da li se koristi kod kuće?",
        a: "Da. Uređaj je namijenjen za kućnu upotrebu.",
      },
      {
        q: "Da li dlačice nestaju odmah?",
        a: "Ne odmah. Rezultati dolaze postepeno uz redovnu upotrebu. Dlačice vremenom mogu rasti sporije, tanje i rjeđe.",
      },
      {
        q: "Koja je razlika u odnosu na obične uređaje?",
        a: "Glavna razlika je ugrađeno hlađenje, koje hladi kožu tokom tretmana i čini korištenje ugodnijim.",
      },
      {
        q: "Koliko košta?",
        a: "Cijena uređaja je 175 KM.",
      },
    ],
  },
  urgencySection: {
    title: "Ponuda — 175 KM",
    subtitle: "Umjesto skupih salonskih tretmana i uređaja koji koštaju preko 1.000 KM. Besplatna dostava. Plaćanje pouzećem.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Površina bljeska", value: "3.5 cm²" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, pazuhe, bikini zona, ruke, lice" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Podrška", value: "Dostupna prije kupovine" },
  ],
  closingTitle: "Glatka koža bez salona. Tretman kod kuće. Hlađenje koje čini razliku.",
  closingText:
    "ICE COOL PRO — 175 KM jednom, besplatna dostava u BiH, plaćanje pouzećem, plaćanje pouzećem.",
  highlights: [
    { value: "6–8 sed.", label: "do vidljivih rezultata" },
    { value: "175 KM", label: "jednom umjesto 1.000+ KM" },
    { value: "Ice Cool™", label: "ugrađeno hlađenje" },
  ],
};

export default async function SummerGlatkKozaPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: summerSmoothContent.articleHeadline,
    description: summerSmoothContent.articleDeck,
    author: {
      "@type": "Organization",
      name: "Aurora Shop",
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-05-31",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/summer-glatka-koza",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-summer-glatka-koza"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SummerVibesWrapper>
        <AdvertorialLandingV2
          product={product}
          content={summerSmoothContent}
          comparisonProducts={comparisonProducts}
          theme="summer"
        />
        <Footer />
      </SummerVibesWrapper>
    </>
  );
}
