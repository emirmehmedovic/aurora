import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLanding from "@/components/AdvertorialLanding";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "10 minuta sedmično — kako zaposlena mama prestala trošiti sate u salonu | Aurora Style",
  description: "Nermina iz Tuzle ima dvoje djece i puno radno vriieme. Evo kako je rješila epilaciju za 10 minuta sedmično — bez salona, bez zakazivanja, bez boli.",
  keywords: "IPL za zaposlene mame, epilacija kod kuće brzo, ICE COOL Max, profesionalni IPL epilator, brza epilacija BiH, IPL aparat za noge",
  alternates: {
    canonical: "https://aurorashop.ba/l/10-minuta-sedmicno",
  },
};

const maxContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Mama & Stil",
  articleHeadline:
    "Imam dvoje djece, puno radno vriieme i nikad slobodnog sata. Evo kako sam rješila epilaciju za 10 minuta sedmično.",
  articleDeck:
    "Nermina Softić iz Tuzle nije imala vremena za salone godinama. Onda je otkrila uređaj koji je promijenio njenu nedeljnu rutinu — kompletno i trajno.",
  authorName: "Nermina Softić",
  authorTitle: "34 god. · Tuzla · majka dvoje djece",
  publishDate: "27. mart 2026.",
  readingTime: "5 minuta čitanja",
  heroImageDesc:
    "Nermina nedeljom uveče — 10 minuta s ICE COOL Max, noge gotove za cijelu sedmicu",
  intro:
    "Nedjelja uveče. Djeca su napokon zaspala u 21:30. Imam sat i po slobodnog vremena — sat i po koji sam godinama nisam znala kako potrošiti. Sada znam. Noge su gotove za 10 minuta. Ostatak večeri je moj.",
  sections: [
    {
      heading: "Salon sam prestala zakazivati još u 2023. — nije bilo kada",
      paragraphs: [
        "Dvoje djece, puno radno vriieme u banci, muž koji radi u izmjenama. Zakazivanje salona za mene znači: naći sat u rasporedu koji ne postoji, organizovati ko čuva djecu, platiti taksi ili moliti nekog da me odveze i još se sjedeći čekati u čekaonici.",
        "Počela sam urediti sebe na zadnje. Noge brijam svaki drugi dan — loša opcija, ali jedina dostupna. Ponekad kažem sebi: naredne sedmice ću naći vremena za salon. Naredna sedmica dođe i prođe ista.",
        "Proljetos je muž počeo primjećivati da sam nervoznija nego inače. Rekla sam mu zašto. Rekao je: 'Pa kupe ti nešto'. Mislila sam da će mi kupiti godišnju kartu za salon. Kupio mi je Max.",
      ],
      imagePlaceholder:
        "Nermina s djecom — prikaz zaposlene mame, sreća i umor istovremeno, autentična fotografija",
      highlight:
        "Zakazivanje salona za mene znači sat kojeg nema, organizovanje čuvanja djece, i čekanje u čekaonici. A dlačice su opet tu za 2 sedmice.",
    },
    {
      heading: "Prvu subotu nisam vjerovala da je to to",
      paragraphs: [
        "Muž je pročitao uputstvo i postavio uređaj. Rekao je: 'Uzmi nedjelju uveče, probaj'. Stisnula sam se za dvadesetak minuta između kade i gledanja serije.",
        "ICE COOL Max ima najveću površinu bljeska u liniji — osjeti se razlika odmah. Noge sam završila za 13 minuta. Pazuhe za 4. Hlađenje je bilo toliko ugodno da sam pomislila da ga nisam uopšte upalila na jakost.",
        "Treće sedmice pazuhe su bile bez dlačice cijelu sedmicu. Četvrte — noge glatke do petka bez brijanja. Peta sedmica — zaboravila sam brijati i bio je petak, a koža je bila glatka.",
      ],
      calloutAfter: true,
    },
    {
      heading: "Šta se promijenilo — konkretno, u brojevima",
      paragraphs: [
        "Ranije: brijanje nogu 4–5 puta sedmično, 10 minuta svaki put = 40–50 minuta tjedno. Salon jednom u 3–4 sedmice kad uspijevam = 3–4 sata plus organizacija.",
        "Sada: nedjelom uveče 10 minuta s Maxom. To je sve. Noge su glatke cijelu sedmicu. Pazuhe ne koristim brijanjaače od mjesec i po dana.",
        "Muž pita jesu li vriiedilo 190 KM. Svaki put mu odgovorim: 'Naruči još jedan.'",
      ],
      imagePlaceholder:
        "Nermina koristi Max nedeljom uveče — tiho, dok su djeca u spavaćoj sobi, 10 minuta za sebe",
      highlight:
        "10 minuta nedeljom — to je sada moja epilacijska rutina. Sat salona, organizacija, čekanje — sve to je nestalo.",
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Preporučujemo",
    title: "ICE COOL Max™",
    subtitle: "Profesionalni IPL sa dvostrukim hlađenjem · 190 KM",
    bullets: [
      "Najveća površina bljeska — noge gotove za 10 minuta",
      "Ice Cool+™ dvostruko hlađenje — čak ni na jakosti ne boli",
      "Vidljivi rezultati za 2–3 sedmice",
      "Cijelo tijelo bez iznimke: noge, ruke, pazuhe, bikini, lice, leđa",
      "12 mj. garancija + 14 dana pravo na povrat",
    ],
  },
  articleClosingHighlight:
    "ICE COOL Max™ je namijenjen ženama koje nemaju sat vremena za salon — ali imaju 10 minuta nedeljom uveče. Ako si mama ili žena koja stalno stavlja sebe na zadnje, ovo je možda jedini gadget koji je stvoren baš za tebe.",
  reviews: [
    {
      name: "Emina",
      age: 31,
      text: "Imam troje djece i radim od kuće. Max mi je promijenio život — bukvalno. 10 minuta nedeljom i noge su mi glatke 6 dana. Nisam bila u salonu 4 mieseca i jedini put kad žalim za njim je kad pomislim koliko sam ranije novca ostavila tamo.",
      date: "Mart 2026",
      location: "Zenica",
    },
    {
      name: "Nina",
      age: 36,
      text: "Radim u zdravstvu, smjene. Nikad nije bio dobar trenutak za salon. Max koristim subotom dok djeca crtaju — do i po sam završila noge i pazuhe. Već 3 sedmice ne brijam noge. Ovo je promjena koja ostaje.",
      date: "Februar 2026",
      location: "Tuzla",
    },
    {
      name: "Jasmina",
      age: 29,
      text: "Kupila sam za 30. rodendan sebi. Prije nisam imala vremena za ništa. Sada imam 10 minuta nedeljom. Noge su mi glatke cijeli tjedan. Hlađenje je nevjerovatno. Preporučujem svim zaposlenim ženama.",
      date: "Januar 2026",
      location: "Sarajevo",
    },
    {
      name: "Sanela",
      age: 38,
      text: "Imam 4 djece i muža koji puno radi van. Max sam naručila sama i ne kajem se. Treće sedmice pazuhe čiste. Četvrte noge glatke 5 dana bez brijanja. Zahvalna sam što takva stvar uopšte postoji.",
      date: "Mart 2026",
      location: "Bihać",
    },
    {
      name: "Amra",
      age: 27,
      text: "Nisam mama ali radim puno radno vriieme i magistriram. Bukvalno nemam slobodnih sati. Max sam kupila i koristim petkom uveče — 10 minuta i gotovo. Noge su mi glatke do sljedećeg petka.",
      date: "Februar 2026",
      location: "Mostar",
    },
    {
      name: "Mirela",
      age: 33,
      text: "Dvostruko hlađenje je razlog zašto sam uzela Max umjesto PRO. Bikini zona — bez ikakvog neugodnog osjećaja. Noge završim za 9 minuta. To je manje nego jedan jutarnji telefonski razgovor. Savršen uređaj.",
      date: "Mart 2026",
      location: "Banja Luka",
    },
  ],
  vsSection: {
    label: "Usporedba",
    title: "Salon ili Max — ko pobijedi u satima i kilomarkama",
    subtitle:
      "Jedna posjeta salonu vs. cijela sedmica glatke kože. Pogledaj razliku.",
    rows: [
      { salon: "Vrijeme po tretmanu|1–2 sata (vožnja + čekanje + tretman)", ipl: "10 minuta kod kuće" },
      { salon: "Organizacija|Zakazivanje, čuvanje djece", ipl: "Nedjelja uveče, 10 minuta" },
      { salon: "Cijena|80–150 KM po posjeti", ipl: "190 KM jednom" },
      { salon: "Trajnost|2–3 sedmice", ipl: "Trajno smanjenje — sedmice bez brijanja" },
      { salon: "Bol|Umjerena do jaka", ipl: "Ice Cool+™ — gotovo bez boli" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja koja si sigurno postavila sebi",
    items: [
      {
        q: "Čime se Max razlikuje od PRO modela?",
        a: "Max ima veću površinu bljeska (4.5 cm² vs 3.5 cm²) i dvostruko hlađenje Ice Cool+™ koje aktivno hladi kožu i prije i poslije svakog bljeska. Rezultat: noge završiš 30–40% brže nego s PRO modelom, a tretman je ugodniji čak i na bikini zoni.",
      },
      {
        q: "Mogu li koristiti tokom dojenja ili trudnoće?",
        a: "IPL tretmani se ne preporučuju tokom trudnoće i dojenja iz predostrožnosti. Preporučujemo konzultaciju s liječnikom. Uređaj čuvaš za period nakon — a garancija i bljeskovi te čekaju.",
      },
      {
        q: "Koliko sedmica do vidljivih rezultata?",
        a: "Većina korisnica primijeti razliku nakon 3. tretmana (3. sedmice). Pazuhe reaguju najbrže — često u potpunosti glatke već nakon 4–5 tretmana. Za noge treba 6–8 sedmica za trajno smanjenje rasta.",
      },
      {
        q: "Što ako ne budu rezultati za mene?",
        a: "14 dana prava na povrat bez pitanja. Ako Max ne odgovara tvom tipu kože ili nisi zadovoljna rezultatima — vraćaš ga i dobivaš povrat. Bez komplikacija.",
      },
      {
        q: "Mogu li ga koristiti na tamnoj koži?",
        a: "Max radi na tipovima kože Fitzpatrick I–V. Ugrađeni senzor tona kože onemogućuje upotrebu na pretemnim tonovima (VI) iz sigurnosnih razloga. Za tamnomaslinaste tonove (V) preporučujemo početi s nižim intenzitetom.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 190 KM umjesto 370 KM",
    subtitle: "Max trenutno dostupan s 49% popusta — dok traju zalihe.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5+ (pojačana snaga)" },
    { label: "Površina bljeska", value: "Najveća u liniji (4.5 cm²)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool+™ napredno dvostruko hlađenje" },
    { label: "Brzina impulsa", value: "Brže punjenje između impulsa" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuh, bikini zona, lice, leđa" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, nastavci, korisnički priručnik" },
    { label: "Garancija", value: "12 mieseci" },
  ],
  closingTitle: "Salon u džepu. 190 KM jednom — 10 minuta sedmično.",
  closingText:
    "Za žene koje nemaju sat vremena za salon — ali imaju 10 minuta nedjelom uveče. Besplatna dostava · Plaćanje pouzećem · 14 dana povrat.",
};

export default async function DesetMinutaSedmicnoPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro-max"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: maxContent.articleHeadline,
    description: maxContent.articleDeck,
    author: {
      "@type": "Person",
      name: maxContent.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-03-27",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/10-minuta-sedmicno",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-max"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLanding
        product={product}
        content={maxContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
