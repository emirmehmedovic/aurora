import { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans } from "next/font/google";
import RetargetingLanding from "@/components/RetargetingLanding";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

// Slike korisnica koje su poslale na WhatsApp
import testimonial1 from "../../../../public/novi-landing/testimonials/testimonial.png";
import testimonial2 from "../../../../public/novi-landing/testimonials/testimonial2.png";
import testimonial3 from "../../../../public/novi-landing/testimonials/testimonial3.png";
import testimonial4 from "../../../../public/novi-landing/testimonials/testimonial4.png";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ice Cool PRO™ — Žao mi je što nisam ranije probala",
  description: "Već si nas vidjela. Stvarne poruke žena koje su se odlučile. Bez filtera, bez uređivanja. 175 KM - plaćanje pouzećem - 14 dana povrat.",
  keywords: "Ice Cool PRO, IPL uređaj BiH, epilacija kod kuće, bez salona, prestanak brijanja",
  alternates: {
    canonical: "https://aurorashop.ba/l/retargeting",
  },
};

// WhatsApp poruke korisnica - stvarne, needitovane
const whatsappMessages = [
  {
    name: "Amina",
    location: "Sarajevo",
    time: "Prije 3 dana",
    message: "hej samo sam htjela rec vrh radi ovaj uredjaj. pazuhe ne brijem vec skoro mjesec dana. hladjenje se stvarno osjeti nisam se bojala ni bola ni nista. hvala!!",
    zone: "pazuhe"
  },
  {
    name: "Jasmina",
    location: "Tuzla",
    time: "Prije 5 dana",
    message: "Super je ovo stvarno 😊 noge su mi ko svila a nisam ni brijac uzela ove sedmice.. rekla sam mami i sestri pa i one narucuju :)",
    zone: "noge"
  },
  {
    name: "Nikolina",
    location: "Mostar",
    time: "Prije sedmicu",
    message: "nisam vjerovala da ce raditi za bikini zonu jer imam stvarno osjetljivu kozu.. nula iritacije nula uraslih. jedina stvar koja mi je ikad odgovarala odlicno radi",
    zone: "bikini zona · osjetljiva koža"
  },
  {
    name: "Selma",
    location: "Zenica",
    time: "Prije 9 dana",
    message: "radim smjene pa mi salon nikad nije isao. sad radim 10 min navečer i to je to. odlično radi preporucujem svim curama koje nemaju vremena za salone",
    zone: "pazuhe · noge"
  },
  {
    name: "Dina",
    location: "Banja Luka",
    time: "Prije 2 sedmice",
    message: "narucila sam jer pise 14 dana povrat pa sam rekla probam. nisam ga vratila 😅 moja kuma vec narucila nakon sto je vidjela moje noge lol",
    zone: "noge"
  },
  {
    name: "Lejla",
    location: "Sarajevo",
    time: "Prije 11 dana",
    message: "gledala sam philips lumeu ali 1500km je previse.. ovo je 175 i radi isto. dlacice nestaju isto tako jedino sto nema ime na kutiji al meni to nije vazno",
    zone: "noge · alternativa Lumea"
  },
  {
    name: "Sara",
    location: "Sarajevo",
    time: "Jučer",
    message: "iskreno vrh. bila sam skepticna al moja drugarica me nagovorila. sad i ja nagvaram nju da naruci max verziju hahaha hladjenje je game changer stvarno",
    zone: "sve zone"
  },
  {
    name: "Maida",
    location: "Tuzla",
    time: "Prije 4 dana",
    message: "svaka preporuka! bikini zona i pazuhe kao da ih nema.. nisam mislila da ce se tolko brzo vidjeti razlika al vec drugi tretman sam primijetila da sporije raste",
    zone: "bikini zona · pazuhe"
  },
  {
    name: "Ivana",
    location: "Banja Luka",
    time: "Prije sedmicu",
    message: "moja koza je jako osjetljiva na sve. ovaj uredjaj jedini nije dao iritaciju.. ni crvenila ni uraslih napokon nesto sto mi odgovara",
    zone: "osjetljiva koža"
  },
  {
    name: "Daniela",
    location: "Zenica",
    time: "Prije 3 dana",
    message: "koristim 6 sedmica. pazuhe vise uopce ne brijem noge brijem rijetko. zao mi je sto nisam ranije probala bukvalno 😭",
    zone: "pazuhe · noge"
  }
];

// Slike koje su poslale korisnice
const customerPhotos = [
  testimonial1.src,
  testimonial2.src,
  testimonial3.src,
  testimonial4.src,
  aminaImg.src,
  danielaImg.src,
  ivanaImg.src,
  maricaImg.src,
  saraImg.src,
  tinaImg.src,
];

// Prigovori - česta pitanja
const objections = [
  {
    question: "A što ako ne bude radilo za mene?",
    answer: "14 dana povrat, bez pitanja. Pošalješ nazad, dobiješ novac nazad. Bez objašnjavanja, bez problema. Dina iz Banje Luke je naručila baš zbog toga — i nije ga vratila."
  },
  {
    question: "Bojim se da će boliti.",
    answer: "Nikolina ima najosjetljiviju kožu i bikini zonu — kaže nula iritacije. Hlađenje je tu upravo zbog toga. Nije marketing, žene to pišu same od sebe."
  },
  {
    question: "Nije mi jasno kako plaćam.",
    answer: "Popuniš ime, telefon i adresu. To je sve. Kurir ti donese paket, platiš ga na vrata. Nema kartice, nema online plaćanja, nema rizika."
  },
  {
    question: "Ima li rezultata stvarno?",
    answer: "Daniela — 6 sedmica, pazuhe više ne brije. Maida — drugi tretman, već sporiji rast. Nije instant, ali je stvarno. Redovna upotreba = promjena."
  },
  {
    question: "Zašto je jeftinije od Philips Lumee?",
    answer: "Jer ne plaćaš brend. IPL tehnologija je ista. Lejla iz Sarajeva je usporedila — kaže radi isto, samo nema ime na kutiji. Za dlačice, ime na kutiji ne znači ništa."
  }
];

export default async function RetargetingPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: "Kućni IPL uređaj sa ugrađenim hlađenjem - stvarna iskustva korisnica iz BiH",
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

      <RetargetingLanding
        product={product}
        whatsappMessages={whatsappMessages}
        customerPhotos={customerPhotos}
        objections={objections}
      />
    </div>
  );
}
