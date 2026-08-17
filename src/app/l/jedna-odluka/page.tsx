import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans } from "next/font/google";
import JednaOdlukaLanding from "@/components/JednaOdlukaLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jedna odluka. To je sve. — Ice Cool PRO™ | Aurora Shop",
  description: "Nije u genima. Nije u salonu. 175 KM - jedna odluka koja mijenja sve. Besplatna dostava - plaćanje pouzećem.",
  keywords: "Ice Cool PRO, IPL epilator, jedna odluka, trajna depilacija, Ice Cooling, epilator BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/jedna-odluka",
  },
};

// Reviews data
const reviews = [
  {
    text: "Koristim 6 sedmica. Pazuhe više uopće ne brijem. Žao mi je što nisam ranije probala.",
    author: "Daniela",
    location: "Zenica",
    duration: "6 sedmica korištenja",
    zone: "pazuhe · noge",
  },
  {
    text: "Nisam vjerovala da će raditi za bikini zonu jer imam osjetljivu kožu. Nula iritacije, nula uraslih. Jedina stvar koja mi je ikad odgovarala.",
    author: "Nikolina",
    location: "Mostar",
    duration: "5 sedmica korištenja",
    zone: "bikini · osjetljiva koža",
  },
  {
    text: "Gledala sam Philips Lumeu ali 1.500 KM je previše. Ovo radi isto. Dlačice nestaju isto tako.",
    author: "Lejla",
    location: "Sarajevo",
    duration: "2 mjeseca korištenja",
    zone: "noge",
  },
  {
    text: "Radim smjene, nemam vremena za salon. Sad radim 10 minuta navečer. Odlično radi.",
    author: "Selma",
    location: "Zenica",
    duration: "7 sedmica korištenja",
    zone: "pazuhe · noge",
  },
  {
    text: "Naručila sam jer piše plaćanje pouzećem. Nisam ga vratila. Moja kuma već naručila nakon što je vidjela moje noge.",
    author: "Dina",
    location: "Banja Luka",
    duration: "3 sedmice korištenja",
    zone: "noge",
  },
];

// FAQ/Objections data
const objections = [
  {
    question: "Hoće li boliti?",
    answer: "Uređaj ima ugrađeno hlađenje baš zbog toga. Nikolina ima jako osjetljivu kožu i bikini zonu — kaže nula iritacije, nula uraslih. To nije marketing, cure to pišu same od sebe.",
  },
  {
    question: "Hoće li raditi za moju kožu?",
    answer: "Radi na svim tipovima kože osim na jako tamnoj (fototipi V–VI). Nisi sigurna? Javi nam se na WhatsApp prije narudžbe — odgovaramo u roku od sat vremena.",
  },
  {
    question: "Zašto je toliko jeftiniji od Philips Lumee?",
    answer: "Jer ne plaćaš brend. IPL tehnologija je ista. Lejla iz Sarajeva je usporedila — kaže radi isto, samo nema ime na kutiji. Kad su u pitanju dlačice, ime na kutiji ne znači apsolutno ništa.",
  },
];

export default async function JednaOdlukaPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kućni IPL epilator sa Ice Cooling™ tehnologijom za trajno glatku kožu",
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
      reviewCount: 300,
    },
  };

  return (
    <div className={`${dmSans.variable} ${playfair.variable}`}>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <JednaOdlukaLanding
        product={product}
        reviews={reviews}
        objections={objections}
      />
    </div>
  );
}
