import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import ElegantSocialProof from "@/components/ElegantSocialProof";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";
import testimonial2 from "../../../../testimonials/2.png";
import testimonial3 from "../../../../testimonials/3.png";
import testimonial4 from "../../../../testimonials/4.png";
import testimonial7 from "../../../../testimonials/7.png";
import testimonial8 from "../../../../testimonials/8.png";

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
    canonical: "https://aurorashop.ba/l/zao-mi-je-sto-nisam-ranije-probala",
  },
};

const testimonials = [
  {
    name: "Selma",
    age: 31,
    location: "Mostar",
    quote: "10 minuta nedjeljom uz seriju. To je sve. Više ne gubim sate u salonima.",
    story: "Radim smjene - nema šanse da zakažem salon. Trebala sam naći rješenje koje radi po mom rasporedu. Sada tretman radim nedjeljom uveče - 10 minuta za noge uz Netflix. Nakon mjesec dana, pazusi mi više ne trebaju ni brijanje. Dobila sam nazad 4+ sata mjesečno.",
    image: testimonial2.src,
    monthsUsing: 3,
    favoriteFeature: "Praktičnost",
  },
  {
    name: "Lejla",
    age: 29,
    location: "Tuzla",
    quote: "Moj muž je primijetio da mi je koža glatka. Nisam mu rekla da sam prestala ići na depilaciju.",
    story: "Bila sam skeptična - imala sam užasno iskustvo sa voskom koji je ostavio ožiljke. Ali Ice Cool PRO ne boli uopšte. Hlađenje zaista radi. Koža mi je sve glatđa svake sedmice. Kada je muž primijetio i pitao 'šta radiš drugačije?', znala sam da radi. Jedino što žalim je što nisam probala prije 3 godine.",
    image: testimonial3.src,
    monthsUsing: 5,
    favoriteFeature: "Bez bola",
  },
  {
    name: "Nejra",
    age: 26,
    location: "Zenica",
    quote: "Spontano sam otišla na more. Bez planiranja. Bez stresa. Prvi put u životu.",
    story: "Prije sam morala planirati plažu danima unaprijed - depilacija, čekanje da prođu iritacije, strah da će se dlačice vidjeti. Sada koristim Ice Cool PRO kod kuće kada god želim. Prošlog mjeseca sam spontano rekla 'ajmo na more' i jednostavno otišla. Ta sloboda nema cijenu.",
    image: testimonial4.src,
    monthsUsing: 6,
    favoriteFeature: "Sloboda",
  },
  {
    name: "Maja",
    age: 33,
    location: "Banja Luka",
    quote: "Potrošila sam 3.600 KM na laser kroz 3 godine. Ovaj uređaj je 175 KM.",
    story: "Tri godine sam išla na laser - 100 KM mjesečno, uvijek zakazivanje, uvijek čekanje. Ukupno preko 3.600 KM. Kada sam vidjela Ice Cool PRO za 175 KM, mislila sam 'ne može to isto biti'. Ali jeste. Doslovno isti rezultat, samo što ga radim kod kuće. Da sam znala da postoji ovo prije...",
    image: testimonial7.src,
    monthsUsing: 2,
    favoriteFeature: "Cijena",
  },
  {
    name: "Dina",
    age: 27,
    location: "Prijedor",
    quote: "Konačno mogu podići ruke bez razmišljanja. To je bio moj najveći kompleks.",
    story: "Pazusi su mi bili katastrofa - stalno crveni, iziritarani, tamne tačkice od žileta. Nosila sam samo majice sa rukavima, čak i ljeti. Nakon mjesec korištenja Ice Cool PRO, koža mi je konačno čista. Kupila sam prvu majicu bez rukava nakon 5 godina. Plakala sam kad sam je probala.",
    image: testimonial8.src,
    monthsUsing: 2,
    favoriteFeature: "Nježnost",
  },
];

const problems = [
  { text: '"Samo da se još brzinski obrijem..." - i kasniš 15 minuta jer je postalo hitna operacija' },
  { text: '"Ne mogu obući haljinu dok ne sredim noge" - i odričeš se omiljene garderobe zbog dlačica' },
  { text: '"Opet su mi pazusi iziritarani" - i nosiš rukave čak i ljeti jer se stidiš podići ruke' },
  { text: '"Bikini zona mi je katastrofa" - i otkazuješ plažu jer se ne osjećaš spremno' },
  { text: '"Moram zakazati salon, ali mi se ne da" - i onda ideš neobrijana jer nemaš izbora' },
  { text: '"Stalno razmišljam o dlačicama" - umjesto da uživaš u trenutku i živiš spontano' },
  { text: '"Urasle dlačice mi ne daju mira" - i svaki dan provjeravaš kožu u strahu od novih' },
  { text: '"Plaćam depilacije mjesecima" - a osjećaj glatke kože traje samo dan-dva' },
];

const features = [
  { text: "Vidljivi rezultati nakon mjesec dana - prestaneš brijati pazuhe, noge su sve glatđe" },
  { text: "Ugodniji tretman od voska - Ice Cool™ hlađenje znači nema bola, nema plakanja" },
  { text: "10 minuta sedmično uz seriju - ne 2 sata u salonu svaki mjesec" },
  { text: "Spontanost koju nisi imala - ne planiraš više plažu danima unaprijed" },
  { text: "Kod kuće po tvom rasporedu - ne čekaš termine, ne zakazuješ ništa" },
  { text: "175 KM jednom vs 100+ KM mjesečno - uštediš 1.200+ KM godišnje" },
  { text: "Sve zone koje te muče - noge, pazuhe, bikini zona, ruke, lice - sve glatko" },
  { text: "999.999 tretmana u jednom uređaju - nikad ne kupuješ ništa više" },
];

export default async function ZaoMiJeStranPage() {
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

      <ElegantSocialProof
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
