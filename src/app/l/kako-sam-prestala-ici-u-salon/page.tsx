import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLanding from "@/components/AdvertorialLanding";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";
import heroRightImage from "../../../../noviland/16.png";
import heroLeftImage from "../../../../noviland/5.png";
import calendarImage from "../../../../noviland/Dizajn bez naslova.png";
import amraHomeImage from "../../../../noviland/Bez naslova (Objava na Facebooku) (1).png";
import testimonial3Image from "../../../../testimonials/3.png";
import testimonial4Image from "../../../../testimonials/4.png";
import testimonial8Image from "../../../../testimonials/8.png";
import testimonial9Image from "../../../../testimonials/9.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "1.440 KM godišnje ili 175 KM jednom — šta se desi kad to izračunaš | Aurora Style",
  description: "Jedna od naših kupaca izračunala je da godišnje troši 1.440 KM na epilaciju u salonu. Evo šta se desilo kad je promijenila pristup.",
  keywords: "IPL aparat za kuću, prestati ići u salon, epilacija kod kuće, ICE COOL PRO, uštedovine na epilaciji, laser epilacija kod kuće BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/kako-sam-prestala-ici-u-salon",
  },
};

const proContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Ljepota & Wellness",
  articleHeadline:
    "1.440 KM godišnje za epilaciju u salonu — ili 175 KM jednom. Šta se desi kad to jednom izračunaš.",
  articleDeck:
    "Jedna od naših kupaca otkrila je da je odlazak u salon koštao više od godišnjeg servisa auta. Pa je promijenila pristup — i nije se vratila.",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "28. mart 2026.",
  readingTime: "4 minute čitanja",
  heroImageDesc:
    "Glatke noge nakon 3 mjeseca korištenja ICE COOL PRO kod kuće, bez posjete salonu",
  heroImageLeftSrc: heroLeftImage.src,
  heroImageLeftAlt:
    "Brijanje noge prije tretmana — prvi korak pripreme za IPL epilaciju kod kuće",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt:
    "ICE COOL PRO u ruci — kućni IPL tretman kao alternativa odlascima u salon",
  intro:
    "Zbrojite jednom koliko godišnje date za epilaciju u salonu. Većina žena koje to uradi ostane bez teksta. Prosjek je 1.440 KM godišnje — za noge i pazuhe. Cifra dolazi polako, posjeta po posjeta, i rijetko ko je sabere dok ne mora.",
  sections: [
    {
      heading: "Svake godine 1.440 KM — i problem se nikad nije riješio",
      paragraphs: [
        "Dvanaest posjeta. Svaka po 100–120 KM. Sat vremena u salonu, zakazivanje unaprijed, gužve — i dlačice opet vidljive za dvije i po sedmice.",
        "Trošak koji se vraća svakog mjeseca nije trošak — to je pretplata. Samo što ovu niko nije transparentno najavljivao. Skuplja se tiho, sesija po sesija.",
        "Uradite proračun za pet godina: oko 7.000 KM. Na jednu jedinu stvar koja ne rješava problem — samo ga odlaže za sljedeće tri sedmice.",
      ],
      imagePlaceholder:
        "Kalendar s 12 zakazanih termina u salonu — vizualizacija ponavljajućeg godišnjeg troška, simbolični prikaz",
      imageSrc: calendarImage.src,
      imageAlt:
        "Kalendar i novac koji prikazuju koliko se termina i troškova nakupi kroz godinu dana odlazaka u salon",
      highlight:
        "1.440 KM godišnje. Za nešto što ne rješava problem — samo ga odlaže na sljedeće tri sedmice.",
    },
    {
      heading: "Šta kažu kupci koji su prestali ići u salon",
      paragraphs: [
        "Skoro svaka kupac koja nam piše počinje isto: 'Bila sam skeptična. Pomislila sam — još jedan gadget koji ne radi.' To je gotovo uvijek prva reakcija.",
        "Ono što ih promijeni su konkretne cifre. Kupci koji koriste ICE COOL PRO tri i više mjeseci redovno prijavljuju: pazuhe gotovo bez dlačica, noge glatke sedmicama umjesto danima. Jedna nam je napisala: 'Napravi matematiku — tri više godine u salonu su 4.300 KM. Ili 175 KM jednom.'",
        "Matematika je uvijek ista. Mijenja se samo trenutak kad je neko napravi.",
      ],
      calloutAfter: true,
    },
    {
      heading: "Šta se dešava u prvim sedmicama — iskustva kupaca",
      paragraphs: [
        "Prvih deset dana — ništa dramatično. Kupci koriste jednom sedmično prema uputstvu. Ono što iznenadi gotovo svakoga je hlađenje — na punom intenzitetu osjeti se samo blaga toplina, bez neugodnosti koje su očekivali.",
        "Negdje između treće i četvrte sedmice počinju stizati poruke. Pazuhe bez dlačice. Noge glatke do kraja sedmice bez brijanja. Nakon dva do tri mjeseca, odlazak u salon jednostavno — ispadne iz glave.",
        "Jedna kupac nam je napisala da ju je koleginica pitala da li je promijenila estetičara jer joj koža izgleda bolje. Nije. Samo je prestala ići.",
      ],
      imagePlaceholder:
        "Korištenje ICE COOL PRO na nogama kod kuće — prirodan, ugodan tretman bez salona",
      imageSrc: amraHomeImage.src,
      imageAlt:
        "Korištenje ICE COOL PRO na nogama kod kuće u opuštenom ambijentu",
      highlight:
        "Kupci koji su počeli ranije uštedili su više od 3.000 KM u pet godina. I više ne gube sat vremena svake tri sedmice.",
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO™",
    subtitle: "IPL uređaj za trajno smanjenje dlačica kod kuće · 175 KM",
    bullets: [
      "999.999 bljeskova — traje godinama bez zamjene lampice",
      "5 nivoa intenziteta za prilagodbu svakom tipu kože",
      "Ice Cool™ hlađenje — tretman bez neugodnosti čak i na osjetljivim zonama",
      "Cijelo tijelo: noge, pazuhe, bikini zona, lice, leđa",
      "12 mj. garancija + 14 dana pravo na povrat bez pitanja",
    ],
  },
  articleClosingHighlight:
    "ICE COOL PRO™ se isplati već nakon drugog tretmana koji biste platili u salonu. Sve ostalo je čista uštedovina — i vrijeme koje više ne moraš provoditi u čekaonici.",
  reviews: [
    {
      name: "Selma",
      age: 33,
      text: "Koristim PRO 5 mieseci. Nisam bila u salonu otkad sam ga kupila. Noge su mi sada glatke 95% vremena bez brijanja. Izračunala sam da sam uštedila 600 KM samo u ovoj godini.",
      date: "Mart 2026",
      location: "Sarajevo",
      imageSrc: testimonial3Image.src,
      imageAlt: "Selma koristi ICE COOL PRO kod kuće",
    },
    {
      name: "Lejla",
      age: 28,
      text: "Bila sam skeptična jer sam prethodno kupila jeftini IPL i nije radio ništa. PRO je potpuno drugačiji — osjeti se da ima snage. Nakon 6 sedmica pazuhe su mi praktički čiste.",
      date: "Februar 2026",
      location: "Zenica",
      imageSrc: testimonial4Image.src,
      imageAlt: "Lejla pokazuje rezultate i uređaj kod kuće",
    },
    {
      name: "Maida",
      age: 35,
      text: "Čitala sam hiljade recenzija prije nego sam naručila. Hlađenje je nevjerovatno — mislila sam da će boljeti, ali ne osjetiš gotovo ništa. Za 175 KM dobila sam salon kod kuće.",
      date: "Januar 2026",
      location: "Tuzla",
      imageSrc: testimonial8Image.src,
      imageAlt: "Maida priprema nogu i koristi ICE COOL PRO u kupatilu",
    },
    {
      name: "Ena",
      age: 30,
      text: "Preporučila sam PRO trima prijateljicama. Sve tri su me zvale poslije da kažu hvala. Nikad ne bih pomislila da 175 KM može biti tolika uštedovina.",
      date: "Mart 2026",
      location: "Banja Luka",
      imageSrc: testimonial9Image.src,
      imageAlt: "Ena pravi selfie sa ICE COOL PRO uređajem",
    },
  ],
  vsSection: {
    label: "Usporedba",
    title: "Salon ili PRO — gdje završi razlika za 12 mieseci",
    subtitle:
      "Isti cilj, potpuno drugačiji trošak. Pogledaj matematiku.",
    rows: [
      { salon: "Cijena tretmana|70–120 KM po posjeti", ipl: "175 KM jednom" },
      { salon: "Trajnost|2–4 sedmice, pa opet iz početka", ipl: "Trajno smanjenje rasta" },
      { salon: "Utrošeno vrieme|Zakazivanje + vožnja + čekanje", ipl: "15 min kod kuće" },
      { salon: "Osjećaj|Umjerena do jaka bol", ipl: "Ice Cool™ hlađenje — bez boli" },
      { salon: "Godišnji trošak|800–1.500 KM", ipl: "175 KM jednom za uvijek" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja koja si vjerovatno postavila sebi",
    items: [
      {
        q: "Radi li IPL na svim tipovima kože i dlačica?",
        a: "ICE COOL PRO radi na tipovima kože Fitzpatrick I–V (od vrlo svijetle do tamnomaslinaste) i najefikasniji je na tamnim dlačicama. Na sivo i bijelo obojene dlačice IPL tehnologija nije efikasna — to je prirodno ograničenje IPL-a općenito, ne ovog uređaja.",
      },
      {
        q: "Koliko dugo traju rezultati?",
        a: "IPL trajno smanjuje rast dlačica. Nakon 8–12 redovnih tretmana, većina korisnica pređe na 'touch-up' jednom u 2–3 mieseca. Noge ostaju glatke sedmicama, ne danima.",
      },
      {
        q: "Što ako ne budu rezultati za mene?",
        a: "14 dana prava na povrat bez pitanja. Ako PRO ne odgovara tvom tipu kože ili nisi zadovoljna — vraćaš ga i dobivaš povrat novca. Svaka narudžba uključuje garanciju zadovoljstva.",
      },
      {
        q: "Je li bezbjedno koristiti kod kuće bez estetičara?",
        a: "Da. ICE COOL PRO ima ugrađen senzor tona kože koji automatski prilagođava intenzitet i onemogućuje upotrebu na pretemnoj koži. Uputstvo je jednostavno — korisnice bez ikakvog iskustva koriste ga bez problema.",
      },
      {
        q: "Koliko vremena treba po tretmanu?",
        a: "Noge obje: 15–20 minuta. Pazuhe: 3–5 minuta. Bikini zona: 5–10 minuta. Sa praksom sve ide brže.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 175 KM umjesto 340 KM",
    subtitle: "Popust od 49% vrijedi dok traju zalihe — naruči danas.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Površina bljeska", value: "3.5 cm²" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuh, bikini zona, lice, leđa" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Garancija", value: "12 mieseci" },
  ],
  closingTitle: "175 KM jednom. Salone ostavljaš iza sebe.",
  closingText:
    "Svaki tretman u salonu koji preskočiš je novac koji ostaje tebi. PRO se isplati već nakon drugog tretmana koji biste platili vani. Besplatna dostava · Plaćanje pouzećem · 14 dana povrat.",
};

export default async function KakoSamPrestalaIciUSalonPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: proContent.articleHeadline,
    description: proContent.articleDeck,
    author: {
      "@type": "Organization",
      name: "Aurora Shop",
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-03-28",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/kako-sam-prestala-ici-u-salon",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-pro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLanding
        product={product}
        content={proContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
