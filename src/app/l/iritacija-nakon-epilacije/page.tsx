import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLandingV2 from "@/components/AdvertorialLandingV2";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";
import heroRightImage from "../../../../testimonials/1.png";
import heroLeftImage from "../../../../noviland/16.png";
import testimonial3Image from "../../../../testimonials/3.png";
import testimonial4Image from "../../../../testimonials/4.png";
import testimonial8Image from "../../../../testimonials/8.png";
import testimonial9Image from "../../../../testimonials/9.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Iritacija i urasle dlačice nakon epilacije nisu neizbježne | Aurora Style",
  description: "Crvenilo, urasle dlačice, pečenje — sve to slijedi klasičnu epilaciju. Zašto se to dešava i koje metode to eliminiraju u korijenu.",
  keywords: "iritacija nakon brijanja, urasle dlacice rjesenje, crvenilo nakon voska, IPL epilacija bez iritacije, ICE COOL PRO, epilacija bez urastanja BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/iritacija-nakon-epilacije",
  },
};

const proIrritationContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Koža & Zdravlje",
  articleHeadline:
    "Iritacija i urasle dlačice nakon epilacije nisu neizbježne",
  articleDeck:
    "Crvenilo, pečenje i urasle dlačice koje dolaze sedmicu-dvije poslije epilacije nisu nuspojava koju treba tolerirati. To je signal da metoda radi protiv kože, a ne za nju.",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "14. april 2026.",
  readingTime: "4 minute čitanja",
  heroImageDesc:
    "Glatka, mirna koža bez crvenila, koža koja nije bila podvrgnuta agresivnoj metodi epilacije",
  heroImageLeftSrc: heroLeftImage.src,
  heroImageLeftAlt: "ICE COOL PRO uređaj kao sljedeća slika ispod hero sekcije",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt: "ICE COOL PRO, IPL tretman koji ne izaziva iritaciju ni urasle dlačice",
  intro:
    "Crvenilo koje traje satima. Iritacija koja se vraća sa svakim novim rastom. Urasle dlačice na bikini zoni koje se pojave sedmicu-dvije poslije voska. Mnoge žene ovakva iskustva prihvataju kao neizbježni pratilac epilacije. Nisu.",
  sections: [
    {
      heading: "Zašto klasične metode izazivaju iritaciju i to nije slučajnost",
      paragraphs: [
        "Brijanje uklanja dlačicu s površine kože, ali istovremeno sječe gornji sloj kožnih stanica. Svaki potez britvom je mikrotrauma. Rezultat je upala folikula, crvenilo kože i dlačica koja počne rasti s narezanim vrhom koji probija kožu pod kutom i uraste.",
        "Vosak lijepi se za kožu i odljepljuje je zajedno s dlačicom. Pored folikula, mehaničku traumu doživljava i okolna koža. Na osjetljivijim zonama kao što je bikini linija, crvenilo, oticanje i ingrown dlačice mogu trajati i sedmicu-dvije.",
        "Depilacijske kreme kemijski otapaju strukturu dlačice, ali iste kemikalije reaguju s kožom. Pečenje, osip i dugotrajna iritacija česta su pojava na osjetljivijoj ili tanjoj koži.",
      ],
      imagePlaceholder:
        "Prikaz razlike između klasičnih metoda epilacije i IPL tretmana na koži",
      imageSrc: heroLeftImage.src,
      imageAlt: "Vizualni prikaz razlike u reakciji kože između klasičnih metoda epilacije i IPL tretmana",
      highlight:
        "Iritacija i urasle dlačice nisu nuspojava koja se mora tolerirati. To je signal da metoda radi protiv kože.",
    },
    {
      heading: "Kako IPL eliminira iritaciju, a ne samo dlačicu",
      paragraphs: [
        "IPL (Intense Pulsed Light) djeluje na melanin unutar folikula. Svjetlost prodire kroz kožu ne dirajući njenu površinu. Nema rezanja, nema lijepljenja, nema kemije i koža na površini ostaje netaknuta.",
        "Ice Cool™ tehnologija hladi kožu neposredno prije svakog bljeskanja. Hladna koža je manje reaktivna na toplinu koja dolazi s bljeskanjem i to smanjuje svaku eventualnu crvenost ili osjetljivost na minimum.",
        "Ono što čini IPL drugačijim na duži rok: dlačica ne raste na isti način. Folikul koji je primio dovoljno IPL tretmana prestaje proizvoditi dlačicu kao prije. Nema više tvrdog vrha koji probija kožu, nema uraslih i nema mehaničke traume koja pokreće upalnu reakciju.",
      ],
      highlight:
        "IPL ne dodiruje površinu kože. Nema mehaničke traume i nema čega da izazove iritaciju ili urasle dlačice.",
      calloutAfter: true,
    },
    {
      heading: "Korisnice s kroničnom iritacijom i šta su prijavile",
      paragraphs: [
        "Žene s osjetljivom kožom sklonom crvenilu i reakcijama na klasične metode čine značajan dio korisnica ICE COOL PRO. Razlog je upravo odsustvo mehaničke traume i prisutnost hlađenja.",
        "Korisnice koje su godinama imale problem s uraslim dlačicama na bikini zoni prijavljuju da su već nakon prvih nekoliko IPL tretmana primijetile smanjenje novih urastanja. Na krajevima dlačica koje preostaju nema više onog narezanog vrha pa nema ni probijanja u folikul.",
        "Korisnice s rosacea, ekzemom ili kronički reaktivnom kožom preporučuju patch test na manjem dijelu kože prije prvog tretmana. Veliki broj prijavljuje nula reakcije i opisuje ICE COOL PRO kao prvu metodu depilacije koju koža podnosi bez posljedica.",
      ],
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO™",
    subtitle: "IPL uređaj za trajno smanjenje dlačica kod kuće · 175 KM",
    bullets: [
      "Nema mehaničke traume, svjetlost ne dodiruje površinu kože",
      "Ice Cool™ hlađenje, koža hladna i mirna tokom svakog bljeska",
      "Nema uraslih dlačica, folikul se smanjuje a ne reže",
      "999.999 bljeskova, traje godinama bez zamjene lampice",
      "detaljno uputstvo i besplatna dostava u BiH",
    ],
  },
  articleClosingHighlight:
    "Iritacija koja prati epilaciju nije neminovnost. Ona je direktna posljedica metode koja radi protiv kože. ICE COOL PRO radi drugačije.",
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
    label: "Usporedba",
    title: "Klasične metode vs. ICE COOL PRO",
    subtitle: "Isti cilj, potpuno drugačiji efekt na kožu.",
    rows: [
      { salon: "Površina kože|Brijanje reže gornji kožni sloj, mikrotrauma sa svakim potezom", ipl: "Svjetlost prolazi kroz kožu bez dodira površine" },
      { salon: "Folikul|Dlačica se sječe, vrh postaje tvrd i probija kožu", ipl: "Folikul se smanjuje, nema uraslih dlačica" },
      { salon: "Crvenilo|Iritacija i crvenilo nakon svake sesije", ipl: "Ice Cool™ hlađenje, koža mirna tokom i poslije tretmana" },
      { salon: "Bikini zona|Urasle dlačice i oticanje sedmicu-dvije poslije voska", ipl: "Glatko bez iritacije čak i na najtanjoj koži" },
      { salon: "Dugoročno|Koža kronično izložena mehaničkoj traumi", ipl: "Koža se odmori, manje tretmana i manje stresa" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o iritaciji i IPL tretmanu",
    items: [
      {
        q: "Može li IPL sam po sebi izazvati iritaciju?",
        a: "Moguće je blago crvenilo neposredno nakon prvog tretmana, posebno na osjetljivijim zonama, ali ono prolazi za 30 do 60 minuta. Ice Cool™ hlađenje značajno smanjuje i tu eventualnu reakciju. Kronična iritacija kakva prati brijanje i vosak ne postoji s IPL-om.",
      },
      {
        q: "Šta s uraslim dlačicama koje već imam?",
        a: "Postojeće urasle dlačice trebaju se ukloniti mehanički prije prvog tretmana, sterilnom iglom ili egzfolijacijom. IPL sprečava nove i ne uklanja postojeće. Nakon nekoliko tretmana nove urasle dlačice prestaju se pojavljivati jer folikul mijenja prirodu rasta.",
      },
      {
        q: "Je li sigurno za osjetljivu kožu?",
        a: "Za većinu tipova osjetljive kože da. Preporuča se patch test na manjem dijelu kože 24 sata prije prvog tretmana. Korisnice s rosacea i reaktivnom kožom prijavljuju nula reakcije u velikom broju slučajeva. Iznimka su aktivna upala, rane i sunčanica, gdje tretman treba odgoditi.",
      },
      {
        q: "Hoće li dlačice rasti normalno ako prekinem tretmane?",
        a: "Folikul koji je primio dovoljno IPL tretmana smanjuje aktivnost, ali se može oporaviti ako se tretmani potpuno prestanu. Preporuča se touch-up tretman svakih 2 do 3 mjeseca nakon završenog kursa kako bi se rezultati održali.",
      },
      {
        q: "Što ako ne budu rezultati za mene?",
        a: "Prije narudžbe možeš nas pitati da li PRO odgovara tvom tipu kože i dlačica. Dobijaš jasne upute za korištenje i podršku pri kupovini.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 175 KM umjesto 340 KM",
    subtitle: "Popust od 49% vrijedi dok traju zalihe.",
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
    { label: "Podrška", value: "Dostupna prije kupovine" },
  ],
  closingTitle: "Koža koja ne reaguje više ne treba kompromise.",
  closingText:
    "175 KM jednom za epilaciju koja radi s kožom, a ne protiv nje. Besplatna dostava, plaćanje pouzećem i plaćanje pouzećem.",
  highlights: [
    { value: "48–72h", label: "iritacija od brijanja" },
    { value: "0×", label: "mikrotrauma s IPL-om" },
    { value: "6–8 sed.", label: "do trajno glatke kože" },
  ],
};

export default async function IritacijaNakonEpilacijePage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: proIrritationContent.articleHeadline,
    description: proIrritationContent.articleDeck,
    author: {
      "@type": "Organization",
      name: "Aurora Shop",
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-04-14",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/iritacija-nakon-epilacije",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-iritacija"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLandingV2
        product={product}
        content={proIrritationContent}
        comparisonProducts={comparisonProducts}
        theme="fresh"
      />
      <Footer />
    </>
  );
}
