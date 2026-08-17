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
import sectionImage from "../../../../testimonials/dizajn-bez-naslova-3.png";
import testimonial3Image from "../../../../testimonials/3.png";
import testimonial4Image from "../../../../testimonials/4.png";
import testimonial8Image from "../../../../testimonials/8.png";
import testimonial9Image from "../../../../testimonials/9.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prije nego platiš 1.500 KM za kućni IPL uređaj — Pogledaj pristupačniju alternativu | Aurora Style",
  description: "Pristupačna alternativa s ugrađenim hlađenjem kože — za 175 KM. Ako razmišljaš o Philips Lumei, ali ti je cijena previsoka, postoji druga opcija.",
  keywords: "Philips Lumea alternativa BiH, pristupačan IPL uređaj, Ice Cool Pro, kućni IPL 175 KM, IPL sa hlađenjem",
  alternates: {
    canonical: "https://aurorashop.ba/l/philips-lumea-alternativa",
  },
};

const philipsAlternativeContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Pametna Kupovina",
  articleHeadline:
    "Prije nego platiš 1.500 KM za kućni uređaj za dlačice… Pogledaj pristupačniju alternativu s ugrađenim hlađenjem",
  articleDeck:
    "Ako si već gledala Philips Lumeu ili slične premium uređaje, vjerovatno znaš da kućni tretman za glatku kožu može biti jako skup. Neki uređaji koštaju preko 1.000 KM, a neki idu i do 1.500 KM. Ali pitanje je — da li stvarno moraš platiti premium cijenu?",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "31. maj 2026.",
  readingTime: "6 minuta čitanja",
  heroImageDesc:
    "Pristupačna alternativa premium IPL uređajima — isti princip, mnogo niža cijena",
  heroImageLeftSrc: heroLeftImage.src,
  heroImageLeftAlt: "Ice Cool Pro — pristupačna alternativa Philips Lumei",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt: "Kućni IPL uređaj sa hlađenjem za 175 KM",
  intro:
    "Mnoge žene odustanu prije nego uopšte probaju kućni IPL tretman — samo zbog cijene. Premium uređaji koštaju preko 1.000 KM, a mnoge ne žele platiti toliko prije nego što provjere da li im takav tretman odgovara. Zato postoji pristupačnija opcija: uređaj za smanjenje dlačica pomoću svjetlosnih impulsa, s ugrađenim hlađenjem kože, koji koristiš kod kuće — za 175 KM.",
  sections: [
    {
      heading: "Ako razmišljaš o Philips Lumei, vjerovatno tražiš ove 3 stvari",
      paragraphs: [
        "Većina žena koje gledaju Philips Lumeu ne traže samo 'uređaj'. One žele: manje brijanja, glatku kožu kod kuće i dugotrajnije smanjenje rasta dlačica.",
        "I to je potpuno razumljivo. Brijanje traje kratko. Vosak boli. Depilacija iritira kožu. Saloni koštaju i traže termine. A premium kućni uređaji često imaju cijenu koja nije mala odluka.",
        "Zato smo željeli ponuditi pristupačniju opciju za žene koje žele kućni tretman, ali ne žele platiti cijenu od preko 1.000 KM.",
      ],
    },
    {
      heading: "Šta je ovaj uređaj i kako radi?",
      paragraphs: [
        "Ovo je kućni uređaj za smanjenje dlačica pomoću svjetlosnih impulsa — tehnologija poznata kao IPL. Najjednostavnije rečeno: uređaj ne čupa dlačice kao vosak i ne siječe ih kao brijač. On koristi svjetlosne impulse koji ciljaju dlačicu pri korijenu. Redovnom upotrebom dlačice mogu postati rjeđe, tanje i sporije rasti.",
        "Koristi se kod kuće, na područjima kao što su noge, ruke, pazuhe, bikini zona i drugi dijelovi tijela, prema uputstvu za korištenje.",
        "Ali ono što ovaj uređaj posebno izdvaja je ugrađeno hlađenje kože tokom tretmana.",
      ],
      imageSrc: sectionImage.src,
      imageAlt: "Ice Cool Pro sa ugrađenim hlađenjem kože",
      imageAspect: "landscape",
      highlight:
        "Ugrađeno hlađenje kože čini tretman ugodnijim — manje peckanja, lakše korištenje na većim područjima, veća šansa za redovnu upotrebu.",
      calloutAfter: true,
    },
    {
      heading: "Nije stvar samo u cijeni. Stvar je u osjećaju.",
      paragraphs: [
        "Kod mnogih kućnih uređaja za dlačice, žene ne odustanu zato što ne žele rezultat. Odustanu zato što tretman zna biti neugodan. Koža se zagrije. Tretman pecka. Moraš praviti pauze. Osjetljivija područja postanu neprijatna. I onda uređaj završi u ladici.",
        "Zato je ugrađeno hlađenje velika prednost. Dok svjetlosni impulsi rade svoj dio, sistem hlađenja hladi površinu kože i pomaže da tretman bude ugodniji.",
        "To znači: manje neugodnog osjećaja tokom tretmana, lakše korištenje na većim područjima, veća šansa da tretman radiš redovno, ugodnije iskustvo za žene koje ne vole peckanje i bolji osjećaj kontrole kod kućne upotrebe.",
      ],
    },
    {
      heading: "Da li ti zaista treba uređaj od 1.500 KM?",
      paragraphs: [
        "Možda da. Ako želiš poznat brend, premium pakovanje, dodatke, aplikaciju i ime koje već znaš — to ima svoju cijenu.",
        "Ali ako ti je cilj praktičan kućni tretman za smanjenje dlačica, uređaj koji koristi svjetlosne impulse i ima ugrađeno hlađenje kože, onda postoji mnogo pristupačnija opcija.",
        "Ovaj uređaj košta 175 KM. To je manje od cijene nekoliko salonskih tretmana. I mnogo manje od većine premium kućnih uređaja za dlačice. Zato ga žene sve češće biraju kao pametniju opciju za kućnu upotrebu.",
      ],
    },
    {
      heading: "Ne plaćaš veliko ime. Plaćaš funkciju koju osjetiš.",
      paragraphs: [
        "Ovo je možda najvažnija razlika. Kod ovog uređaja fokus nije na skupom brendu. Fokus je na funkciji koju zaista osjetiš tokom korištenja: hlađenje kože.",
        "Mnoge korisnice kažu da su očekivale peckanje, ali ih je osjećaj hlađenja iznenadio. Jer kada je tretman ugodniji, lakše ga je završiti. Kada ga lakše završiš, veća je šansa da ga koristiš redovno. A redovna upotreba je ono što donosi promjenu u rastu dlačica.",
      ],
    },
    {
      heading: "Koliko novca zapravo možeš uštedjeti?",
      paragraphs: [
        "Razmisli koliko koštaju saloni, depilacije, brijači, pjene, kreme i stalno održavanje kroz godinu dana. Jedan salonski tretman može koštati značajan iznos. Više tretmana kroz nekoliko mjeseci lako pređe cijenu ovog uređaja.",
        "A premium kućni uređaji mogu koštati i nekoliko puta više. Zato cijena od 175 KM nije samo 'jeftinija opcija'. To je opcija koja mnogim ženama prvi put čini kućni tretman pristupačnim.",
      ],
    },
    {
      heading: "Zašto je cijena 175 KM?",
      paragraphs: [
        "Zato što ne plaćaš ogromno ime brenda. Ne plaćaš luksuznu maloprodajnu maržu. Ne plaćaš salonske termine. Plaćaš praktičan kućni uređaj s funkcijom koja ima smisla: svjetlosni impulsi + ugrađeno hlađenje kože.",
        "Zato je ovaj uređaj idealan za žene koje žele probati kućni tretman za smanjenje dlačica, ali ne žele potrošiti 1.000+ KM.",
      ],
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO™",
    subtitle: "Pristupačna alternativa premium IPL uređajima · 175 KM · Besplatna dostava",
    bullets: [
      "Svjetlosni impulsi (IPL tehnologija) — isti princip kao kod premium uređaja",
      "Ice Cool™ hlađenje — tretman ugodniji nego kod uređaja bez hlađenja",
      "999.999 bljeskova — doživotni uređaj bez zamjene lampice",
      "Sve zone: noge, pazuhe, bikini zona, ruke, lice",
      "plaćanje pouzećem · detaljno uputstvo · Plaćanje pouzećem",
    ],
  },
  articleClosingHighlight:
    "Glatka koža kod kuće ne mora koštati 1.500 KM. Ako si gledala skupe uređaje za dlačice, ali ti je cijena bila previsoka, sada imaš pristupačniju opciju.",
  reviews: [
    {
      name: "Sanela",
      age: 30,
      text: "Drago mi je da nisam dala preko 1.000 KM prije nego sam ovo probala. Ovaj uređaj radi isto što sam očekivala od skupih brendova, samo što sam platila skoro 7 puta manje.",
      date: "Maj 2026",
      location: "Zenica",
      imageSrc: testimonial3Image.src,
      imageAlt: "Sanela — zadovoljna pristupačnom alternativom",
    },
    {
      name: "Lejla",
      age: 26,
      text: "Bila sam skeptična zbog cijene — mislila sam da moram platiti više da bi dobila kvalitet. Ali hlađenje radi, dlačice su rjeđe, a platila sam samo 175 KM.",
      date: "Maj 2026",
      location: "Mostar",
      imageSrc: testimonial4Image.src,
      imageAlt: "Lejla — skeptična zbog cijene, sada zadovoljna",
    },
    {
      name: "Maida",
      age: 35,
      text: "Gledala sam Philips Lumeu mjesecima ali nisam mogla opravdati cijenu. Kad sam vidjela ovaj uređaj sa hlađenjem za 175 KM, probala sam. Tri mjeseca kasnije, ne kajem se.",
      date: "April 2026",
      location: "Tuzla",
      imageSrc: testimonial8Image.src,
      imageAlt: "Maida — razmišljala o Philips Lumei, odabrala ovu alternativu",
    },
    {
      name: "Amra",
      age: 29,
      text: "Ne moram više stalno brijati noge. Tretman radim kod kuće kad mi odgovara. Najbolja odluka je što nisam čekala da skupim novac za skupi brend.",
      date: "Mart 2026",
      location: "Sarajevo",
      imageSrc: testimonial9Image.src,
      imageAlt: "Amra — pametna odluka umjesto čekanja na skup brend",
    },
  ],
  vsSection: {
    label: "Usporedba",
    title: "Premium IPL uređaji vs. ICE COOL PRO",
    subtitle: "Isti cilj — glatka koža kod kuće. Različita cijena.",
    rows: [
      { salon: "Kućna upotreba|Da, koristiš kod kuće", ipl: "Da, koristiš kod kuće" },
      { salon: "Svjetlosni impulsi|Da, IPL tehnologija", ipl: "Da, IPL tehnologija" },
      { salon: "Smanjenje dlačica|Uz redovnu upotrebu", ipl: "Uz redovnu upotrebu" },
      { salon: "Hlađenje kože|Zavisi od modela", ipl: "Da, Ice Cool™ ugrađeno" },
      { salon: "Cijena|Često preko 1.000 KM", ipl: "175 KM" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o alternativama premium uređajima",
    items: [
      {
        q: "Da li je ovo Philips Lumea?",
        a: "Ne. Ovo nije Philips Lumea. Ovo je pristupačnija alternativa za žene koje žele kućni uređaj za smanjenje dlačica svjetlosnim impulsima, ali ne žele platiti premium cijenu.",
      },
      {
        q: "Da li je bolji od Philips Lumee?",
        a: "Ne tvrdimo da je bolji od Philips Lumee. Ono što možemo reći je da ovaj uređaj nudi kućnu upotrebu, svjetlosne impulse, ugrađeno hlađenje kože i cijenu od 175 KM. Ako ti je najvažnije poznato ime brenda, premium uređaj može biti dobar izbor. Ako želiš pristupačniju opciju s hlađenjem, ovaj uređaj je odličan izbor za razmotriti.",
      },
      {
        q: "Da li boli?",
        a: "Zahvaljujući ugrađenom hlađenju, tretman je ugodniji u odnosu na klasične uređaje bez hlađenja. Osjećaj može zavisiti od osjetljivosti kože, područja tretmana i odabrane jačine.",
      },
      {
        q: "Zašto je toliko jeftiniji?",
        a: "Zato što ne plaćaš premium brend i visoku cijenu poznatog imena. Plaćaš praktičan uređaj s ugrađenim hlađenjem za kućnu upotrebu.",
      },
      {
        q: "Da li dlačice nestaju odmah?",
        a: "Ne. Rezultati dolaze postepeno. Uz redovnu upotrebu, dlačice mogu postati rjeđe, tanje i sporije rasti.",
      },
      {
        q: "Da li se koristi kod kuće?",
        a: "Da. Uređaj je namijenjen za kućnu upotrebu — koristiš ga kada tebi odgovara, bez zakazivanja termina.",
      },
    ],
  },
  urgencySection: {
    title: "Ponuda — 175 KM umjesto 1.500 KM",
    subtitle: "Pristupačna alternativa premium uređajima. Besplatna dostava. Plaćanje pouzećem.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5" },
    { label: "Površina bljeska", value: "3.5 cm²" },
    { label: "Tehnologija hlađenja", value: "Ice Cool™ kontaktno hlađenje" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, ruke, pazuhe, bikini zona, lice" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, korisnički priručnik" },
    { label: "Podrška", value: "Dostupna prije kupovine" },
  ],
  closingTitle: "Kućna upotreba, ugodniji tretman, pristupačna cijena.",
  closingText:
    "ICE COOL PRO — 175 KM jednom, besplatna dostava u BiH, plaćanje pouzećem, plaćanje pouzećem.",
  highlights: [
    { value: "175 KM", label: "umjesto 1.000+ KM" },
    { value: "Ice Cool™", label: "ugrađeno hlađenje" },
    { value: "999.999", label: "bljeskova doživotno" },
  ],
};

export default async function PhilipsLumeaAlternativaPage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: philipsAlternativeContent.articleHeadline,
    description: philipsAlternativeContent.articleDeck,
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
      "@id": "https://aurorashop.ba/l/philips-lumea-alternativa",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-philips-lumea-alternativa"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLandingV2
        product={product}
        content={philipsAlternativeContent}
        comparisonProducts={comparisonProducts}
        theme="confident"
      />
      <Footer />
    </>
  );
}
