import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLandingV2 from "@/components/AdvertorialLandingV2";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";
import heroRightImage from "../../../../testimonials/2.png";
import testimonial3Image from "../../../../testimonials/3.png";
import testimonial4Image from "../../../../testimonials/4.png";
import testimonial8Image from "../../../../testimonials/8.png";
import testimonial9Image from "../../../../testimonials/9.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dlake na bradi i trbuhu su uništavale samopouzdanje mnogim ženama… dok nisu našle rješenje koje stvarno radi kod kuće | Aurora Style",
  description: "Svaki dan ih čupaju, skrivaju ispod šminke i duge odjeće. Onda su počele koristiti ICE COOL PRO i prvi put nakon dugo vremena izašle bez straha da će ih neko primijetiti.",
  keywords: "dlake na bradi žene, IPL lice trbuh, ICE COOL PRO brada, trajno uklanjanje dlačica lice BiH, IPL kućna upotreba dlake brada",
  alternates: {
    canonical: "https://aurorashop.ba/l/kratki-rukavi",
  },
};

const proConfidenceContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Ljepota & Samopouzdanje",
  articleHeadline:
    "Dlake na bradi i trbuhu su uništavale samopouzdanje mnogim ženama… dok nisu našle rješenje koje stvarno radi kod kuće",
  articleDeck:
    "Svaki dan ih čupaju, skrivaju ispod šminke ili duge odjeće i osjećaju se nelagodno. Onda su počele koristiti ICE COOL PRO i prvi put nakon dugo vremena izašle bez straha da će ih neko primijetiti.",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "20. april 2026.",
  readingTime: "4 minute čitanja",
  heroImageDesc:
    "Žena bez šminke i bez straha — rezultat koji ICE COOL PRO donosi na bradi, iznad usne i na trbuhu",
  heroImageLeftSrc: "/testimonials/before-after/dizajn-bez-naslova-4.png",
  heroImageLeftAlt: "Rezultat tretmana na licu i tijelu — glatka koža bez svakodnevnog skrivanja",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt: "ICE COOL PRO — IPL uređaj koji radi i na bradi, iznad usne i na trbuhu",
  intro:
    "Mnogim ženama dlake na bradi, iznad usne i na trbuhu znaju biti prava muka. Rastu brzo, guste su i nikako ne prestaju. Svaki dan ih čupaju, skrivaju ispod šminke ili duge odjeće i osjećaju se nelagodno. Umjesto da se osjećaju ženstveno i lijepo, stalno se stide i kriju. Kao da ne smiju da se opuste ni pred sobom, a kamoli pred drugim ljudima.",
  sections: [
    {
      heading: "Saloni su bili preskupi — i problem se ionako nije riješio",
      paragraphs: [
        "Svaki odlazak u salon 120 do 150 KM, a dlake se vrate već za dvije-tri sedmice. Na kraju godine to je lako preko 1.800 KM — a problem se nikad ne riješi, samo se odlaže. Isti stid. Iste trakice. Isto crvenilo.",
        `Skoro svaka žena koja nam piše kaže isto na početku: „Bila sam skeptična, mislila sam da ništa neće pomoći na ovim upornim dlakama." Ali onda naprave računicu. Tri godine u salonu = preko 5.400 KM. Ili ICE COOL PRO jednom za 175 KM.`,
        "Razlika između salona i kućnog IPL-a nije samo u novcu. Salon tretira dlake privremeno. IPL djeluje na folikul iznutra i s vremenom ga gasi. Dlake ne rastu brže — rastu sve sporije, tanje i rjeđe, dok ne prestanu.",
      ],
      highlight:
        "Tri godine u salonu = preko 5.400 KM. Ili ICE COOL PRO jednom za 175 KM. Računica je jasna.",
    },
    {
      heading: "Šta se dešava sedmica po sedmicu",
      paragraphs: [
        "Prvih 10 dana ništa dramatično. Koristiš ga jednom sedmično. Hlađenje je toliko prijatno da čak i na bradi osjetiš samo blagu toplinu, bez bola. Nema crvenila, nema iritacije, nema razloga odgađati.",
        "Između 4. i 6. sedmice dlake počinju da se rjeđe pojavljuju. Ne nestaju odjednom — ali razlika je vidljiva. Jutro bez čupkanja. Dan bez provjere u ogledalu svakih sat vremena. Večer bez toga da razmišljaš šta ćeš obući sutra.",
        "Nakon dva do tri mjeseca većina žena prestane čupati svaki dan. Salon im jednostavno ispadne iz glave. Ne jer su zaboravile — nego jer razlog više nije tu.",
      ],
      imagePlaceholder:
        "Žena izlazi bez šminke — bez straha da će je neko primijetiti",
      imageSrc: "/testimonials/before-after/dizajn-bez-naslova-4.png",
      imageAlt: "Prva jutro bez čupkanja, bez provjere, bez skrivanja — ICE COOL PRO korisnica",
      highlight:
        "Nakon 5–6 sedmica dlake na bradi i trbuhu su im bile znatno rjeđe. Prvi put nakon puno vremena izašle su bez šminke na lice i bez stalnog straha.",
      calloutAfter: true,
    },
    {
      heading: "Zašto ICE COOL PRO radi tamo gdje drugi nisu",
      paragraphs: [
        "ICE COOL PRO ima ugrađen senzor tona kože koji automatski prilagođava intenzitet. Brada, iznad usne i trbuh su zone različite osjetljivosti — uređaj se sam kalibriše za svaku zonu. Ice Cool™ hlađenje hladi kožu pri svakom bljeskanju, što tretman čini ugodnim čak i na licu.",
        "Nije namijenjen samo za noge i pazuhe. Tretira sve zone: brada, iznad usne, trbuh, noge, pazuhe, bikini zona, leđa. Jedan uređaj, sve zone, jednom sedmično.",
        "999.999 bljeskova znači da ga nećeš zamijeniti ni za deset godina normalnog korištenja. Nije potrošna roba. Nije pretplata. Nije termin koji zakazuješ.",
      ],
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO™",
    subtitle: "IPL za sve zone uključujući lice i trbuh · 175 KM · Besplatna dostava",
    bullets: [
      "Ice Cool™ hlađenje — tretman ugodan čak i na bradi i iznad usne",
      "Ugrađeni senzor tona kože — automatska kalibracija za svaku zonu",
      "999.999 bljeskova — doživotni uređaj bez zamjene lampice",
      "Sve zone: brada, trbuh, noge, pazuhe, bikini zona, leđa",
      "plaćanje pouzećem · detaljno uputstvo · Plaćanje pouzećem",
    ],
  },
  articleClosingHighlight:
    "Nije u pitanju luksuz. U pitanju je sloboda da izađeš bez straha da će te neko primijetiti. ICE COOL PRO to mijenja za 5 do 6 sedmica.",
  reviews: [
    {
      name: "Amra",
      age: 32,
      text: "Dlake na bradi su mi bile tajna koju sam nosila godinama. Šminka svaki dan, čak i doma. Sa ICE COOL PRO poslije 6 sedmica nisam morala. To zvuči malo ali za mene je bilo ogromno — otišla sam na kafu bez šminke po prvi put u godinama.",
      date: "Mart 2026",
      location: "Sarajevo",
      imageSrc: testimonial3Image.src,
      imageAlt: "Amra — kafa bez šminke po prvi put nakon godina skrivanja",
    },
    {
      name: "Lejla",
      age: 28,
      text: "Dlake iznad usne i na trbuhu su mi bile razlog zašto nisam htjela na more. Zvuči suludo ali je istina. Krenula sam s ICE COOL PRO u februaru i do ljeta su bile znatno rjeđe. More je bilo drugačije. Ja sam bila drugačija.",
      date: "August 2025",
      location: "Zenica",
      imageSrc: testimonial4Image.src,
      imageAlt: "Lejla — more koje je konačno bilo drugačije",
    },
    {
      name: "Maida",
      age: 35,
      text: "Bila sam skeptična jer imam tamnu i gušću dlaku na bradi i mislila sam da IPL neće raditi. Radilo je. Sporije nego na nogama ali radilo je. Nakon tri mjeseca čupkam jednom sedmično umjesto svaki dan. To je za mene promjena koja se mjeri u miru.",
      date: "Februar 2026",
      location: "Tuzla",
      imageSrc: testimonial8Image.src,
      imageAlt: "Maida — skeptična, gusta tamna dlaka na bradi, radilo je polako ali sigurno",
    },
    {
      name: "Ena",
      age: 30,
      text: "Godinama sam trošila na salon 150 KM svaki mjesec i svaki put se vraćala s istim strahom za tri sedmice. ICE COOL PRO sam kupila skoro nevoljko. Tri meseca kasnije ne znam zašto sam čekala toliko dugo.",
      date: "Septembar 2025",
      location: "Banja Luka",
      imageSrc: testimonial9Image.src,
      imageAlt: "Ena — 150 KM mjesečno na salon, tri mjeseca IPL-a, i pita se zašto je čekala",
    },
  ],
  vsSection: {
    label: "Poređenje",
    title: "Salon svake 2–3 sedmice vs. ICE COOL PRO jednom za svagda",
    subtitle: "Isti stid, ali samo jedno od ova dva zapravo završava priču.",
    rows: [
      { salon: "Trajnost|Dlake se vrate za 2–3 sedmice, bez izuzetka", ipl: "Svaki tretman ih čini rjeđim — dok ne prestanu" },
      { salon: "Cijena|120–150 KM po posjeti, 1.800+ KM godišnje", ipl: "175 KM jednom, bez ponavljanja" },
      { salon: "Lice|Bolno, crvenilo dana, skrivanje ionako nastavlja", ipl: "Ice Cool™ hlađenje, ugodan tretman čak i na bradi" },
      { salon: "Dostupnost|Termin, čekanje, odvoženje, crvenilo", ipl: "Kod kuće, jednom sedmično, bez termina" },
      { salon: "Nakon 3 godine|5.400 KM i isti problem svakog jutra", ipl: "Jutro bez čupkanja, bez provjere, bez skrivanja" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o tretmanu lica i trbuha s ICE COOL PRO",
    items: [
      {
        q: "Radi li IPL zaista na bradi i iznad usne?",
        a: "Da, uz jedan uslov: dlake moraju imati melanin, znači tamnu ili smeđu pigmentaciju. Na sijede, bijele ili veoma svijetle dlačice IPL nije efikasan — to je opće ograničenje IPL tehnologije, ne specifičnost ovog uređaja. Na tamnim dlakama lica ICE COOL PRO radi, ali rezultati dolaze sporije nego na nogama jer je zona osjetljivija i tretira se nižim intenzitetom.",
      },
      {
        q: "Je li bolan tretman na licu?",
        a: "Ice Cool™ hlađenje hladi kožu pri svakom bljeskanju. Na licu se koristi niži intenzitet nego na nogama. Korisnice opisuju osjećaj kao blagu toplinu, bez bola. Brada i iznad usne su osjetljive zone ali su podnošljive uz hlađenje.",
      },
      {
        q: "Koliko dugo do vidljivih rezultata na bradi?",
        a: "Lice reaguje sporije od nogu i pazuha jer se tretira nižim intenzitetom. Prve vidljive promjene — rjeđi rast, tanje dlačice — javljaju se između 5. i 8. sedmice. Puni rezultati za 3 do 4 mjeseca redovnih tretmana jednom sedmično.",
      },
      {
        q: "Šta ako ne budu rezultati za mene?",
        a: "Prije narudžbe možeš nas pitati da li ICE COOL PRO odgovara tvom tipu kože i dlačica. Plaćanje pouzećem znači da plaćaš tek kada primiš uređaj na vrata.",
      },
      {
        q: "Mogu li ga koristiti i za noge i pazuhe, ne samo lice?",
        a: "Da. ICE COOL PRO tretira sve zone — noge, pazuhe, bikini zona, trbuh, lice, leđa, ruke. Jedan uređaj za sve zone, podešava intenzitet automatski prema zoni i tonu kože.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 175 KM umjesto 340 KM",
    subtitle: "Popust od 49% vrijedi dok traju zalihe. Besplatna dostava. Plaćanje pouzećem.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Površina bljeska", value: "3.5 cm²" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Brada, iznad usne, trbuh, noge, pazuhe, bikini zona, leđa" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Podrška", value: "Dostupna prije kupovine" },
  ],
  closingTitle: "Jutro bez čupkanja. Dan bez provjere. To je ono što se mijenja.",
  closingText:
    "ICE COOL PRO — 175 KM jednom, besplatna dostava u BiH, plaćanje pouzećem, plaćanje pouzećem.",
  highlights: [
    { value: "5–6 sed.", label: "do prvih vidljivih rezultata" },
    { value: "175 KM", label: "jednom, umjesto 1.800 KM godišnje" },
    { value: "sve zone", label: "lice, trbuh, noge, pazuhe" },
  ],
};

export default async function KratkiRukaviPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: proConfidenceContent.articleHeadline,
    description: proConfidenceContent.articleDeck,
    author: {
      "@type": "Organization",
      name: "Aurora Shop",
    },
    publisher: {
      "@type": "Organization",
      name: "Aurora Style",
      url: "https://aurorashop.ba",
    },
    datePublished: "2026-04-20",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://aurorashop.ba/l/kratki-rukavi",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-kratki-rukavi"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLandingV2
        product={product}
        content={proConfidenceContent}
        comparisonProducts={comparisonProducts}
        theme="confident"
      />
      <Footer />
    </>
  );
}
