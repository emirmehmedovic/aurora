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
  title: "Gornja usna mi je bila najveći kompleks 10 godina — evo što je promijenilo | Aurora Style",
  description: "Sara iz Mostara se stidila gornje usne i brade od malena. Nakon 3 mieseca s ICE COOL LITE — kompleks je nestao. Njena priča.",
  keywords: "IPL za gornju usnu, IPL lice, hirzutizam kod žena, ICE COOL LITE, dlačice na licu rješenje, kompaktni IPL za lice BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/moj-najveci-kompleks",
  },
};

const liteContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Ljepota & Povjerenje",
  articleHeadline:
    "Gornja usna mi je bila najveći kompleks 10 godina. Evo šta ga je konačno riješilo.",
  articleDeck:
    "Sara Kovač iz Mostara godinama nije znala kako da se nosi s dlačicama na licu. Vosak, konac, laser — ništa nije trajalo. Onda je otkrila uređaj koji stane u torbicu.",
  authorName: "Sara Kovač",
  authorTitle: "26 god. · Mostar",
  publishDate: "26. mart 2026.",
  readingTime: "4 minute čitanja",
  heroImageDesc:
    "Sara — uzorak koža gornje usne, priiije i poslije 3 mieseca korištenja ICE COOL LITE",
  intro:
    "Ima stvari koje nosiš u sebi godinama i ne govoriš o njima nikome. Za mene je to bila gornja usna. Od četrnaeste do dvadeset i šeste — svako jutro bi me pogledala u ogledalo i podsjetila da imam 'problem'. Sada više ne.",
  sections: [
    {
      heading: "10 godina sam se sramila nečega čega se nisam morala",
      paragraphs: [
        "Počelo je u pubertetu. Tamne dlačice na gornjoj usni — blage, ali vidljive meni. I, mislila sam, svima ostalim. Počela sam koristiti vosak. Svaka 2–3 sedmice: crvenilo, iritacija, pa opet rast.",
        "Konac (threading) sam probala u jednom salonu koji je otvorila žena iz Turske. Bolje od voska, ali boli. I isto — svake 2–3 sedmice moraš ponavljati.",
        "U dvadeset i prvoj sam otišla na laser tretman. Tri sesije, svaka 80 KM. Poboljšanje — ali ne i trajno rješenje. Dlačice su se vraćale. Terapeut mi je rekao da trebam više sesija. Više novca.",
      ],
      imagePlaceholder:
        "Razni produkti za uklanjanje dlačica s lica — vosak, konac, krema — simboličan prikaz bezuspješnih pokušaja",
      highlight:
        "Svaka metoda je bila privremena. Vosak, konac, laser — problem se vraćao. Samo je novac odlazio.",
    },
    {
      heading: "Naišla sam na LITE slučajno — i nisam ga ozbiljno shvatila",
      paragraphs: [
        "Prošlog ljeta sam vidjela reklamu za ICE COOL LITE. Pomislila sam: 'Mali uređaj, 165 KM — sigurno je igračka.' Scrollala sam dalje.",
        "Tri sedmice kasnije, koleginica Dina mi je pokazala gornju usnu: 'Gle, pet sedmica nisam radila ništa. Koristim neki novi IPL.' Pogledala sam — potpuno čisto. Upitala sam je za više detalja.",
        "Rekla mi je: 'LITE. Mali, stane u torbicu, imam ga 3 mieseca. Gornja usna — riješena. Za lice je savršen jer ima precizan nastavak.'",
      ],
      calloutAfter: true,
    },
    {
      heading: "Šta se desilo u prvih 5 sedmica",
      paragraphs: [
        "Naručila sam. Doslovno sam sjedila ispred ogledala kada je stigao i odmah ga probala na gornjoj usni. Precizan nastavak je nevjerovatno dobro dizajniran — cilja tačno to malo područje bez straha.",
        "Druge sedmice — malo manje rasta. Treće — uočila sam da gornja usna nije tražila nikakav tretman. Peta sedmica — potpuno čisto. Nisam ništa radila s gornjom usnom 5 sedmica.",
        "Sada sam na četvrtom miesecu. Gornja usna — potpuno bez dlačica. Brada — 90% smanjenje. Svako jutro kada se pogledam u ogledalo, nema one jutarnje steze u grudima. Nema kompleksa.",
      ],
      imagePlaceholder:
        "Sara — ogledalo, smiješak, bez kompleksa — prikaz samopouzdanja koje je vratila u svoja 26.",
      highlight:
        "Svakog jutra 10 godina sam gledala to ogledalo i osjećala stid. Sada ga gledam i osjećam slobodu.",
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Preporučujemo",
    title: "ICE COOL LITE™",
    subtitle: "Kompaktni IPL za lice, gornju usnu i bikini zonu · 165 KM",
    bullets: [
      "Precizan nastavak za gornju usnu, bradu i bikini — tačno tamo gdje treba",
      "Lagan i kompaktan — stane u torbicu, ide na more i putovanje",
      "Ice Cool™ hlađenje — bez crvenila čak ni na najosjetljivijoj koži lica",
      "500.000 bljeskova = 10+ godina tretmana za manje zone",
      "12 mj. garancija + 14 dana pravo na povrat",
    ],
  },
  articleClosingHighlight:
    "ICE COOL LITE™ nije namijenjen svima — namijenjen je ženama koje imaju jedan konkretan kompleks koji žele riješiti jednom i zauvijek. Gornja usna. Brada. Bikini zona. Precizan, tih, diskretan. I stane u torbicu.",
  reviews: [
    {
      name: "Sara",
      age: 24,
      text: "Kupila sam LITE samo za gornju usnu i bradu — to mi je bio najveći kompleks. Već nakon 3 sedmice gornja usna mi je potpuno čista. Precizan nastavak je genijalan — cilja tačno to malo područje. Za 165 KM ovo je dar od Boga.",
      date: "Mart 2026",
      location: "Sarajevo",
    },
    {
      name: "Aida",
      age: 28,
      text: "Puno putujem zbog posla i LITE mi je savršen jer ga nosim svuda. Stane u torbicu. Koristim za pazuhe i bikini zonu — već nakon miesec dana skoro da nema ništa. Prijateljice su me sve pitale šta koristim.",
      date: "Februar 2026",
      location: "Tuzla",
    },
    {
      name: "Hana",
      age: 22,
      text: "Ovo mi je prvi IPL ikad i bila sam nervozna. LITE je tako jednostavan. Mali je, ugodan, i ne plaši me. Noge brijam upola rjeđe već nakon miesec dana. Sljedeći korak — naručim drugarici za rodendan.",
      date: "Januar 2026",
      location: "Bihać",
    },
    {
      name: "Maja",
      age: 25,
      text: "Imam hirzutizam i cijeli život sam se borila s dlačicama na licu. LITE je prvi uređaj koji je zaista pomogao. Tri mieseca, gornja usna i brada — riješene. Naravno, uz liječnikovu dozvolu sam koristila, ali rezultati su stvarni.",
      date: "Mart 2026",
      location: "Sarajevo",
    },
    {
      name: "Dina",
      age: 30,
      text: "Bila sam na tri laser sesije prošle godine — 240 KM ukupno. Rezultati su nestali za 6 mieseci. LITE koristim 4 mieseca i nema nazad. Sigurno. Jednom za svagda.",
      date: "Februar 2026",
      location: "Mostar",
    },
    {
      name: "Amna",
      age: 19,
      text: "Kao kćerka koja je naslijedila dlačice na gornjoj usni od mame — hvala joj što mi je naručila LITE za 18. rodendan. Treća sedmica bila je presudna. Prijatelji su primijetili promjenu u samopouzdanju — ne u koži.",
      date: "Mart 2026",
      location: "Banja Luka",
    },
  ],
  vsSection: {
    label: "Usporedba metoda",
    title: "Vosak, konac, laser — ili LITE jednom",
    subtitle:
      "Svaka metoda daje privremeni rezultat. LITE daje trajno smanjenje.",
    rows: [
      { salon: "Cijena po tretmanu|20–80 KM (vosak/konac/laser)", ipl: "165 KM jednom" },
      { salon: "Trajnost|2–3 sedmice", ipl: "Trajno smanjenje" },
      { salon: "Bol i iritacija|Crvenilo, iritacija, ingrown dlačice", ipl: "Ice Cool™ hlađenje — bez crvenila" },
      { salon: "Godišnji trošak|300–600 KM", ipl: "165 KM jednom za uvijek" },
      { salon: "Praktičnost|Zakazivanje, odlazak, čekanje", ipl: "Kod kuće, u torbici, na putu" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o licu i osjetljivim zonama",
    items: [
      {
        q: "Je li IPL bezbjedno za kožu lica?",
        a: "Da — uz pravilnu upotrebu. LITE ima niži intenzitet namijenjen posebno za lice i precizan nastavak koji cilja tačno na tretiranu zonu. Ice Cool™ hlađenje štiti kožu tokom svakog bljeska. Nemoj koristiti oko očiju, na ožiljcima ili aktivnoj akni.",
      },
      {
        q: "Hoće li raditi na gornjoj usni i bradi?",
        a: "Da — pod uslovom da su dlačice tamne (tamnosmeđe do crne) na svjetloj do maslinastoj koži. Ako imaš kombinaciju tamna kosa/tamna koža, preporuča se patch test. Sivo i bijelo obojene dlačice ne reaguju na IPL.",
      },
      {
        q: "Mogu li ga nositi u avion?",
        a: "Da. LITE je kompaktan i lagan (ispod 200g). Kao žičani uređaj, ne sadrži baterije i može ići u ručni prtljag. Preporuča se provjera aktualnih avionskih propisa o elektronskim uređajima.",
      },
      {
        q: "500.000 bljeskova — je li to dovoljno?",
        a: "Za lice i bikini zonu — apsolutno. Za gornju usnu (mala zona), 500.000 bljeskova znači 10+ godina sedmičnih tretmana. Čak i ako koristiš za pazuhe i lice kombinovano — godina i pol do dvije bez brige.",
      },
      {
        q: "Što ako ne budu rezultati za mene?",
        a: "14 dana prava na povrat bez pitanja. Ako LITE ne odgovara tvom tipu kože ili nisi zadovoljna — vraćaš ga i dobivaš povrat. Bez komplikacija, bez objašnjavanja.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 165 KM umjesto 320 KM",
    subtitle: "LITE trenutno dostupan s 48% popusta — dok traju zalihe.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "500,000" },
    { label: "Nivoi intenziteta", value: "3" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Dizajn", value: "Ultra-kompaktan, prenosiv" },
    { label: "Posebni nastavci", value: "Precizan nastavak za lice i bikini zonu" },
    { label: "Pogodno za", value: "Lice, gornja usna, pazuh, bikini zona, manja područja" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, precizan nastavak, korisnički priručnik" },
    { label: "Garancija", value: "12 mieseci" },
  ],
  closingTitle: "Glatka koža za 165 KM. Kompleks za svagda iza tebe.",
  closingText:
    "Manje od 3 posjete salonu za vosak. LITE radi isti posao — samo stane u torbicu i traje godinama. 14 dana povrat · Besplatna dostava · Plaćanje pouzećem.",
};

export default async function MojNajveciKompleksPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-lite"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: liteContent.articleHeadline,
    description: liteContent.articleDeck,
    author: {
      "@type": "Person",
      name: liteContent.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-03-26",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/moj-najveci-kompleks",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-lite"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLanding
        product={product}
        content={liteContent}
        comparisonProducts={comparisonProducts}
      />
      <Footer />
    </>
  );
}
