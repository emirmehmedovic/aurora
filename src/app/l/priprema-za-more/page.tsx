import { Metadata } from "next";
import Script from "next/script";
import AdvertorialLandingV2 from "@/components/AdvertorialLandingV2";
import type { AdvertorialContent } from "@/components/AdvertorialLanding";
import Footer from "@/components/Footer";
import {
  getStorefrontProductBySlugOrFallback,
  getStorefrontProducts,
} from "@/lib/storefront-products";
import heroRightImage from "../../../../testimonials/grok-image-ae000368-b51a-412b-b3e2-c9b3d4770e22.png";
import heroLeftImage from "../../../../testimonials/4-copy.png";
import sectionImage from "../../../../testimonials/dizajn-bez-naslova-3.png";
import testimonial3Image from "../../../../testimonials/grok-image-38679112-dde2-49e7-98dd-61ff3f037e4a.png";
import testimonial4Image from "../../../../testimonials/grok-image-55183ea9-62be-4fee-8228-27393c304311.png";
import testimonial8Image from "../../../../testimonials/grok-image-e0bc76be-bfec-4140-93bf-834fc64120ff.png";
import testimonial9Image from "../../../../testimonials/grok-image-58632458-e48f-42e3-9efc-5fc50910695a.png";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ove godine na plaži više neću skrivati noge… mnoge žene su to promijenile ovim načinom | Aurora Style",
  description: "Stalno vuku ručnik preko nogu, biraju duge haljine i osjećaju se nelagodno čak i same na plaži. Onda su počele koristiti ICE COOL PRO MAX i za 5–6 sedmica noge i bikini zona su im bile znatno glatkije.",
  keywords: "IPL noge bikini zona, epilacija za more, ICE COOL PRO MAX, glatke noge plaža, urasle dlake bikini, kućna epilacija BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/priprema-za-more",
  },
};

const maxBeachContent: AdvertorialContent = {
  publicationLabel: "Aurora Style · Partnerski sadržaj",
  articleCategory: "Ljepota & Ljetovanje",
  articleHeadline:
    "Ove godine na plaži više neću skrivati noge… mnoge žene su to promijenile ovim načinom",
  articleDeck:
    "Stalno vuku ručnik preko nogu, biraju duge haljine umjesto kratkih i osjećaju se nelagodno čak i same na plaži. Onda su počele koristiti ICE COOL PRO MAX i za 5–6 sedmica noge i bikini zona su im bile znatno glatkije.",
  authorName: "Aurora Style",
  authorTitle: "Redakcija",
  publishDate: "20. april 2026.",
  readingTime: "4 minute čitanja",
  heroImageDesc:
    "Glatke noge i bikini zona na plaži — bez brijanja, bez crvenila, bez skrivanja",
  heroImageLeftSrc: heroLeftImage.src,
  heroImageLeftAlt: "Rezultat tretmana za more — glatka koža bez iritacije i skrivanja",
  heroImageRightSrc: heroRightImage.src,
  heroImageRightAlt: "ICE COOL PRO MAX — najjača verzija kućnog IPL epilatora, 190 KM",
  intro:
    "Mnogim ženama ljeto zna biti prava noćna mora. Umjesto da se raduju moru i suncu, one se brinu hoće li im dlake na nogama i bikiniju izbijati već drugi dan. Stalno vuku ručnik preko nogu, biraju duge haljine umjesto kratkih i osjećaju se nelagodno čak i kad su same na plaži.",
  sections: [
    {
      heading: "Brijanje svaka dva dana, crvenilo i urasle dlake — i to zauvijek ponavljati",
      paragraphs: [
        "Svaki dan brijanje, svaka tri dana ponovo. Crvenilo, urasle dlake, bubuljice — a opet nikad nije glatko kako treba. Saloni? Bolno, skupo i treba zakazivati mjesecima unaprijed. Na kraju ljeta račun lako pređe 800 do 1.000 KM samo za noge i bikini — a dlake se vrate čim prestaneš ići.",
        `Skoro svaka žena koja nam piše kaže isto na početku: „Bila sam skeptična, mislila sam da ništa neće pomoći na ovim dlakama koje mi brzo rastu." Ali onda naprave računicu. Jedno ljeto u salonu = 800–1.000 KM. Ili ICE COOL PRO MAX jednom za 190 KM.`,
        "Razlika je u tome što salon tretira dlake privremeno. IPL djeluje na folikul iznutra — svaki tretman ga slabi, dlaka raste sve sporije i tanja, dok na kraju ne prestane. Ne resetuje se. Ne vraća se kao poslije brijanja.",
      ],
      highlight:
        "Jedno ljeto u salonu = 800–1.000 KM. Ili ICE COOL PRO MAX jednom za 190 KM. Računica je jednostavna.",
    },
    {
      heading: "Šta se dešava sedmica po sedmicu",
      paragraphs: [
        "Prvih 10 dana ništa dramatično. Koristiš ga jednom sedmično. Hlađenje je toliko prijatno da čak i na bikiniju osjetiš samo blagu toplinu, bez bola. PRO MAX ima dvostruko Ice Cool+™ hlađenje — hladi kožu i prije i poslije svakog bljeska, što tretman čini ugodnim čak i na najosetljivijim zonama.",
        "Između 4. i 6. sedmice dlake počinju da se rjeđe pojavljuju. Noge ostaju glatke tri, četiri, pet dana umjesto jednog. Bikini zona bez uraslih dlaka i bez bubuljica. Crvenilo koje je pratilo svako brijanje — nestaje.",
        "Nakon dva do tri mjeseca većina žena zaboravi kad je zadnji put uzela brijač. Plaža im više nije stres. Ručnik stoji na stolici, ne na nogama.",
      ],
      imagePlaceholder:
        "Žena na plaži, noge slobodne, bez ručnika, bez skrivanja",
      imageSrc: sectionImage.src,
      imageAlt:
        "Glatke noge na plaži — nema brijanja u torbi, nema provjere, nema skrivanja",
      highlight:
        "Nakon 5–6 sedmica noge i bikini zona su im bile znatno glatkije. Prvi put nakon puno godina mogle su obući kupaći kostim i ne brinuti se hoće li ih neko pogledati.",
      calloutAfter: true,
    },
    {
      heading: "Zašto PRO MAX a ne PRO ili LITE",
      paragraphs: [
        "PRO MAX je najjača verzija u ICE COOL liniji. Dvostruko Ice Cool+™ hlađenje hladi i prije i poslije svakog bljeska — što znači da se tretman radi na punom intenzitetu bez neugodnosti čak i na bikiniju. PRO model ima jedno hlađenje, LITE nema.",
        "Najveća glava za tretman u liniji: obje noge za 15 minuta. Za ženu koja ne želi da tretman bude projekt nego rutina — ovo je bitna razlika. Jednom sedmično, 20 minuta ukupno, i gotovo.",
        "999.999 bljeskova. Nećeš ih potrošiti ni za deset godina normalnog korištenja. Uređaj se ne zamjenjuje, ne servisira, ne naplaćuje dalje. Jednom i gotovo.",
      ],
    },
  ],
  callout: {
    badge: "Partnerski sadržaj · Sponzorirano",
    title: "ICE COOL PRO MAX™",
    subtitle: "Najjači kućni IPL epilator · Dvostruko hlađenje · 190 KM · Besplatna dostava",
    bullets: [
      "Ice Cool+™ dvostruko hlađenje — ugodan tretman čak i na bikiniju i najosjetljivijim zonama",
      "Najveća glava za tretman — obje noge za 15 minuta",
      "999.999 bljeskova — doživotni uređaj, bez zamjene lampice",
      "5+ razina intenziteta, ugrađeni senzor tona kože",
      "plaćanje pouzećem · detaljno uputstvo · Plaćanje pouzećem",
    ],
  },
  articleClosingHighlight:
    "Nije u pitanju savršena koža. U pitanju je ljeto bez ručnika na nogama, bez brijača u torbi i bez brige hoće li neko pogledati.",
  reviews: [
    {
      name: "Amra",
      age: 29,
      text: "Svako ljeto isti ritual — brijanje dan pred more, crvenilo na plaži, brijanje opet za tri dana. Sa ICE COOL PRO MAX počela sam u aprilu i do jula noge su bile glatke cijeli odmor. Brijač nisam uzela u torbu. Nisam ni mislila na to.",
      date: "August 2025",
      location: "Sarajevo",
      imageSrc: testimonial3Image.src,
      imageAlt: "Amra — brijač nije bio u torbi za more po prvi put",
    },
    {
      name: "Emina",
      age: 34,
      text: "Bikini zona mi je bila noćna mora svako ljeto. Urasle dlake, bubuljice, crvenilo — i to traje dok si na plaži. PRO MAX s dvostrukim hlađenjem — ništa od toga ovog ljeta. Nisam jednom pogledala prema bikiniju na plaži.",
      date: "Septembar 2025",
      location: "Zenica",
      imageSrc: testimonial4Image.src,
      imageAlt: "Emina — bikini zona bez uraslih dlaka i crvenila po prvi put",
    },
    {
      name: "Lejla",
      age: 26,
      text: "Bila sam skeptična jer imam tamne i guste dlake na nogama i mislila sam da kućni uređaj neće biti dovoljno jak. PRO MAX je jak. Nakon 6 sedmica razlika je bila nevjerovatna. Do ljeta su noge bile čiste i nisam ni jednom vukla ručnik preko njih.",
      date: "August 2025",
      location: "Mostar",
      imageSrc: testimonial8Image.src,
      imageAlt: "Lejla — tamne guste dlake, PRO MAX, 6 sedmica, ručnik više nije bio na nogama",
    },
    {
      name: "Maja",
      age: 31,
      text: "Tri ljeta sam išla u salon pred more i svaki put ista priča — skupo, bolno i za deset dana opet isto. Sa PRO MAX radim tretman dok gledam seriju, jednom sedmično. Jedno ljeto je prošlo bez jednog odlaska u salon i bez jednog brijanja na odmoru.",
      date: "Juli 2025",
      location: "Banja Luka",
      imageSrc: testimonial9Image.src,
      imageAlt: "Maja — tri ljeta salona, jedno ljeto ICE COOL PRO MAX, nema poređenja",
    },
  ],
  vsSection: {
    label: "Poređenje",
    title: "Brijanje i salon svako ljeto vs. ICE COOL PRO MAX jednom",
    subtitle: "Isti cilj, ali samo jedno od ova dva znači da na plaži nisi više u stresu.",
    rows: [
      { salon: "Na plaži|Brijanje svaka 2–3 dana, ručnik na nogama, provjera bikinija", ipl: "Glatko cijeli odmor, bez brijača u torbi" },
      { salon: "Bikini zona|Urasle dlake i bubuljice sedmicu-dvije poslije voska", ipl: "Bez uraslih, bez crvenila, bez neugodnosti" },
      { salon: "Cijena ljeto|800–1.000 KM samo za noge i bikini, i opet sljedeće ljeto", ipl: "190 KM jednom za sva buduća ljetovanja" },
      { salon: "Zakazivanje|Termini puni pred sezonu, čekanje sedmicama", ipl: "15 minuta kod kuće jednom sedmično, bez termina" },
      { salon: "Iritacija|Crvenilo i bubuljice 2–3 dana poslije svakog brijanja", ipl: "Dvostruko hlađenje, bez iritacije, bez crvenila" },
    ],
  },
  skepticSection: {
    label: "Česta pitanja",
    title: "Pitanja o ICE COOL PRO MAX i ljetnim rezultatima",
    items: [
      {
        q: "Ima li dovoljno vremena ako počnem sad?",
        a: "Da, april je idealan početak. 6 do 8 tretmana jednom sedmično — vidljivi rezultati do juna, završen kurs do jula. Koža tretirana IPL-om treba pauzu od 2 sedmice prije intenzivnog sunčanja, što se savršeno uklapa ako se krene odmah.",
      },
      {
        q: "Je li bolan tretman na bikiniju?",
        a: "PRO MAX ima dvostruko Ice Cool+™ hlađenje — hladi kožu i prije i poslije svakog bljeska. Bikini zona je osjetljiva zona, ali korisnice opisuju tretman kao blag toplinski osjećaj, bez bola čak i na punom intenzitetu. To je ključna prednost PRO MAX modela u odnosu na PRO i LITE.",
      },
      {
        q: "Radi li na tamnim i gustim dlakama na nogama?",
        a: "Da. ICE COOL PRO MAX je najefikasniji na kontrastu tamne dlačice i svjetlije kože — što je upravo slučaj kod većine žena s gustim tamnim dlakama. Ugrađen senzor tona kože automatski prilagođava intenzitet. Na sijede i bijele dlačice IPL tehnologija nije efikasna.",
      },
      {
        q: "Zašto PRO MAX a ne jeftiniji model?",
        a: "PRO MAX ima dvostruko hlađenje i najveću glavu za tretman u liniji. Obje noge za 15 minuta. Za nekoga ko želi da tretman bude brz i udoban čak i na bikiniju — MAX je jedini logičan izbor. PRO je solidan uređaj, MAX je za one kojima je svaki detalj bitan.",
      },
      {
        q: "Šta ako ne budu rezultati?",
        a: "Prije narudžbe možeš nas pitati da li PRO MAX odgovara tvom tipu kože i dlačica. Plaćanje pouzećem znači da plaćaš tek kada primiš uređaj na vrata.",
      },
    ],
  },
  urgencySection: {
    title: "⚡ Akcija: 190 KM umjesto 380 KM",
    subtitle: "PRO MAX s 50% popusta dok traju zalihe. Besplatna dostava. Plaćanje pouzećem.",
  },
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5+ (pojačana snaga)" },
    { label: "Površina bljeska", value: "4.5 cm² (najveća u liniji)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool+™ dvostruko hlađenje (prije i poslije bljeska)" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Noge, pazuhe, bikini zona, ruke, lice, leđa" },
    { label: "Tip kože", value: "Fitzpatrick I–V (svijetla do tamna; V uz oprez)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, nastavci, korisnički priručnik" },
    { label: "Podrška", value: "Dostupna prije kupovine" },
  ],
  closingTitle: "Ručnik na stolici. Brijač kod kuće. Noge slobodne. To je ljeto koje možeš imati.",
  closingText:
    "ICE COOL PRO MAX — 190 KM jednom, besplatna dostava u BiH, plaćanje pouzećem, plaćanje pouzećem.",
  highlights: [
    { value: "5–6 sed.", label: "do prvih vidljivih rezultata" },
    { value: "190 KM", label: "jednom, umjesto 800–1.000 KM po ljetu" },
    { value: "15 min", label: "jednom sedmično, obje noge" },
  ],
};

export default async function PripremaNaMorePage() {
  const [product, comparisonProducts] = await Promise.all([
    getStorefrontProductBySlugOrFallback("ice-cool-pro-max"),
    getStorefrontProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: maxBeachContent.articleHeadline,
    description: maxBeachContent.articleDeck,
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
      "@id": "https://aurorashop.ba/l/priprema-za-more",
    },
  };

  return (
    <>
      <Script
        id="article-jsonld-priprema-za-more"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdvertorialLandingV2
        product={product}
        content={maxBeachContent}
        comparisonProducts={comparisonProducts}
        theme="summer"
      />
      <Footer />
    </>
  );
}
