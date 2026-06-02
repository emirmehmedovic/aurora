import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import SocialProofLandingV2 from "@/components/SocialProofLandingV2";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";
// Real customer testimonials - photos they sent us
import aminaImg from "../../../../public/novi-landing/testimonials/amina.png";
import danielaImg from "../../../../public/novi-landing/testimonials/daniela.png";
import ivanaImg from "../../../../public/novi-landing/testimonials/ivana.png";
import maricaImg from "../../../../public/novi-landing/testimonials/marica.png";
import saraImg from "../../../../public/novi-landing/testimonials/sara.png";
import tinaImg from "../../../../public/novi-landing/testimonials/tina.png";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Žao mi je što nisam ranije probala - Ice Cool PRO | Aurora Shop",
  description: "300+ žena iz BiH dijeli isto iskustvo. Prestani gubiti vrijeme i novac na stalno brijanje. Ice Cool PRO - 175 KM.",
  keywords: "Ice Cool PRO BiH, IPL uređaj iskustva, prestanak brijanja, dugotrajno glatka koža",
  alternates: {
    canonical: "https://aurorashop.ba/l/zao-mi-je-v2",
  },
};

const testimonials = [
  {
    name: "Tina",
    age: 25,
    location: "Tuzla",
    quote: "Prvi put u životu mogu spontano ići na bazen ili plažu. Nema više planiranja danima unaprijed.",
    story: "Moj najveći kompleks kroz srednju školu i fakultet su bile dlačice. Morala sam planirati svaki odlazak na plažu ili bazen najmanje 2-3 dana unaprijed - depilacija, čekanje da prođu iritacije, molitva da se ne vide urasle dlačice. Često sam odbijala pozive prijatelja jer nisam bila 'spremna'. To me je koštalo toliko lijepih trenutaka. Nakon što sam kupila Ice Cool PRO i redovno ga koristila 2 mjeseca, došla je promjena - dlačice su postale toliko rijetke da praktički i ne rastu. Sad mogu spontano reći 'ajmo na bazen' bez straha. Ta sloboda je ono što me najviše raduje. Trebala sam ovo probati prije 5 godina.",
    image: tinaImg.src,
    monthsUsing: 3,
    favoriteFeature: "Samopouzdanje",
  },
  {
    name: "Ivana",
    age: 31,
    location: "Banja Luka",
    quote: "Uštedila sam preko 800 KM u prvih 6 mjeseci. Ice Cool PRO se sam isplatio za tri mjeseca.",
    story: "Godinama sam redovno išla na laser depilaciju - 80 KM mjesečno, što je bilo skoro 1.000 KM godišnje. Bila sam vezana za termine, salon, putovanje tamo i nazad... A rezultati su bili dobri, ali kad sam slučajno preskočila par mjeseci, sve bi se vratilo. Kada sam vidjela Ice Cool PRO, izračunala sam - ovo će se isplatiti za 2-3 mjeseca! I nisam pogriješila. Osim novca, dobila sam i slobodu. Ne moram više zakazivati, prilagođavati raspored, trošiti sat vremena na put do salona. Radim kod kuće, kada hoću, kako hoću. Investicija koja se isplatila nakon mjesec dana korištenja.",
    image: ivanaImg.src,
    monthsUsing: 6,
    favoriteFeature: "Finansijska ušteda",
  },
  {
    name: "Sara",
    age: 29,
    location: "Sarajevo",
    quote: "Dva mjeseca nakon što sam počela koristiti Ice Cool PRO, prestala sam potpuno brijati pazuhe. Jednostavno više nema potrebe.",
    story: "Radim u banci i svaki dan se moram urediti. Prije sam svako jutro gubila 15 minuta na brijanje, a već poslije posla bi mi se vidjele dlačice. Bila sam očajna. Prijateljica mi je pokazala Ice Cool PRO i rekla 'probaj, nećeš požaliti'. Nakon samo mjesec dana redovne upotrebe, dlake su postale toliko tanke i rijetke da sam mogla nositi majice bez rukava bez ikakve brige. Sada tretman radim jednom sedmično uz Netflix. To je najboljih 175 KM koje sam potrošila.",
    image: saraImg.src,
    monthsUsing: 4,
    favoriteFeature: "Brzi rezultati",
  },
  {
    name: "Daniela",
    age: 27,
    location: "Zenica",
    quote: "Zaboravila sam kada sam zadnji put morala žuriti u salon. Ice Cool PRO radi po mom rasporedu.",
    story: "Imam dvoje djece i puno radno vrijeme - nemoguće je bilo zakazati redovne termine za depilaciju. Stalno sam bila u situaciji da mi se vidi korijenje, a kad bih se konačno riješila otići u salon, nakon 3 dana sve bi bilo isto. Ciklus bez kraja. Moja sestra mi je kupila Ice Cool PRO za rođendan i rekla 'ovo će ti promijeniti život'. Nije pretjerala! Sada tretman radim kod kuće dok djeca spavaju ili nedjeljom dok gledam film. 10 minuta tjedno i gotovo. Nakon 6 sedmica tretmana, skoro da i ne trebam više brijati pazuhe. Preporučila sam ga već desetak prijateljica.",
    image: danielaImg.src,
    monthsUsing: 5,
    favoriteFeature: "Fleksibilnost",
  },
  {
    name: "Marica",
    age: 34,
    location: "Mostar",
    quote: "Konačno sam prestala skrivati noge ljeti. Ova sloboda je neprocjenjiva.",
    story: "Imam jako osjetljivu kožu i sve metode depilacije su mi izazivale grozne iritacije - crvene mrlje, urasle dlačice, svrab koji je trajao danima. Pokušala sam sa voskom, depilatorom, pa čak i laserom u salonu koji je koštao 120 KM po tretmanu. Ništa nije bilo dovoljno nježno za moju kožu. Kada sam pročitala da Ice Cool PRO ima ugrađeno hlađenje, bila sam skeptična ali htjela sam još jednom pokušati. I ovo je bilo to! Nikakvih iritacija, koža mi je glatka i zdrava. Prvi put u životu mogu spontano obući šorts bez planiranja danima unaprijed.",
    image: maricaImg.src,
    monthsUsing: 3,
    favoriteFeature: "Nježno hlađenje",
  },
  {
    name: "Amina",
    age: 28,
    location: "Sarajevo",
    quote: "Nikad mi koža nije bila glatđa. Prijateljice me pitaju koji salon idem - a radim sve kod kuće!",
    story: "Radim kao fitness instruktorica i uvijek sam bila svjesna kako izgledam. Prije sam išla na laser svaka 3-4 sedmice, što je bilo skupo i naporno za zakazivati. Kada sam vidjela Ice Cool PRO na promociji, pomislila sam 'hajde da probam, u najgorem slučaju vraćam za 14 dana'. Nisam očekivala da će biti toliko dobro! Već nakon mjesec dana tretmana, dlačice su postale skoro nevidljive. Sad radim tretman jednom sedmično dok gledam seriju, 10-15 minuta maksimum. Jednostavno i efikasno. Preporučila sam ga već pola teretane!",
    image: aminaImg.src,
    monthsUsing: 4,
    favoriteFeature: "Jednostavnost",
  },
];

const problems = [
  { text: 'Svako jutro 15 minuta gubiš na brijanje, a već do večeri se vidi korijenje' },
  { text: 'Pazusi stalno crveni i iziritarani - nosiš rukave čak i po najvećoj vrućini' },
  { text: 'Salon depilacija košta 60-120 KM mjesečno - to je preko 1.000 KM godišnje' },
  { text: 'Moraš planirati plažu 3 dana unaprijed samo zbog depilacije' },
  { text: 'Urasle dlačice i tamne tačkice ti kvare samopouzdanje' },
  { text: 'Zakazivanje salona, čekanje termina, putovanje - sat vremena mjesečno izgubljeno' },
  { text: 'Vosk, laser, žileti - pokušala si sve, ali ništa ne traje' },
  { text: 'Ne možeš spontano obući šorts ili majicu bez rukava' },
];

const features = [
  { text: "Ice Cool™ hlađenje - tretman je ugodan, bez bola koji imaš sa voskom ili epilatorom" },
  { text: "Vidljivi rezultati nakon 4-6 sedmice - dlačice postaju rijeđe, tanje, sporije rastu" },
  { text: "10 minuta sedmično kod kuće - umjesto 2 sata mjesečno u salonu" },
  { text: "175 KM jednokratno - vs. 80-120 KM mjesečno za salon (ušteda 1.000+ KM godišnje)" },
  { text: "Radi po tvom rasporedu - ne čekaš termine, ne prilagođavaš se rasporeda salona" },
  { text: "Za sve zone tijela - lice, pazuhe, noge, bikini zona, ruke - jedan uređaj za sve" },
  { text: "999.999 tretmana u uređaju - dovoljna garancija za cijeli život korištenja" },
  { text: "Bez iritacija i urasle dlačice - koža ti je glatkija i zdravija nego ikad prije" },
];

export default async function ZaoMiJeV2Page() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kućni IPL uređaj sa ugrađenim hlađenjem za dugotrajno glatku kožu",
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: testimonials.length,
    },
  };

  return (
    <div className={`${inter.variable} ${playfair.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        body { font-family: var(${inter.variable}), sans-serif; }
        .font-serif { font-family: var(${playfair.variable}), serif; }
      `}} />

      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SocialProofLandingV2
        product={product}
        testimonials={testimonials}
        heroTitle="300+ žena iz BiH kaže: 'Trebala sam ranije probati Ice Cool PRO'"
        heroSubtitle="Prestani gubiti sate na brijanje, stotine KM na salone, i slobodu da spontano nosiš što želiš. Jedna investicija od 175 KM za godinu dana bez brige o dlačicama."
        problems={problems}
        features={features}
        ctaText="Želim prestati gubiti vrijeme i novac"
      />
    </div>
  );
}
