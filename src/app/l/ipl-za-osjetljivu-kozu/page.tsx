import { Metadata } from "next";
import Script from "next/script";
import DirectResponseLanding from "@/components/DirectResponseLanding";
import type { LandingContent } from "@/components/DirectResponseLanding";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IPL Depilacija za Osjetljivu Kožu | Aurora ICE COOL",
  description: "Crveniš se nakon brijanja? Iritacija od voska? ICE COOL hlađenje štiti osjetljivu kožu — depilacija bez reakcije, napokon.",
  keywords: "IPL osjetljiva koža, depilacija osjetljiva koža, ICE COOL Max, IPL bez iritacije, IPL za ekzem kožu, epilator osjetljiva koža BiH",
  alternates: {
    canonical: "https://aurorashop.ba/l/ipl-za-osjetljivu-kozu",
  },
};

const osjetljivaContent: LandingContent = {
  badge: "Prva metoda depilacije koja ne kažnjava kožu",
  heroSubtitle: "Ne brijanje koje pali. Ne vosak koji peče. ICE COOL hladi kožu pri svakom tretmanu — i dlačice nestaju bez iritacije.",
  benefits: [
    "Hlađenje kao zaštitni mehanizam — jedina kućna metoda s aktivnim hlađenjem kože",
    "Nema kemije, nema trenja — IPL je svjetlost, ne dodiruje kožu na površini",
    "Nema urastanja — IPL uništava folikul, dlačice ne provokuju kožu ponovnim rastom",
    "Korisnice s rosacea, ekzemom i kroničnom iritacijom prijavljuju nula reakcije",
  ],
  empathyTitle: "Osjetljiva koža zaslužuje bolju depilaciju",
  empathySubtitle: "Nije problem u tvojoj koži. Problem je u metodi.",
  empathyParagraph1: "Ako imaš osjetljivu kožu, znaš kako to izgleda. Pobrijavaš noge i za sat-dva imaš crvenilo koje ne ide. Radiš vosak i koža ostane iritirana danima. Probaš depilatorne kreme — peckanje, miris, osip. Postalo je normalno živjeti s tim kompromisima.",
  empathyParagraph2: "Sve klasične metode su agresivne na kožu. Brijanje reže i draži folikule. Vosak lijepi se za kožu i odljepljuje je — mikrotrauma. Kemija depilatornih krema — reaktivna koža i kemija nisu saveznici. IPL s hlađenjem funkcionira na potpuno drugačijem principu: hladi kožu, pa bljeskaj ulazi u folikul iznutra. Površina ostaje hladna i neizdraženа.",
  empathyHighlight: "Hladna koža ne otpoušta histamin, ne reaktuje na toplinu. Osjetljiva koža konačno ima metodu koja je ne kažnjava.",
  story: {
    title: "'Imam rosacea. Ovo je prva metoda depilacije koja mi nije izazvala reakciju.'",
    text: "Bila sam sigurna da mi IPL nije opcija. Probala sam na manjem dijelu podlaktice i bukvalno ništa — nula reakcije. Sada koristim na cijelim nogama i licu. Dermatologinja mi je rekla da probam IPL kao alternativu jer moja koža ne podnosi brijanje. Kupila sam ICE COOL Max zbog dvostrukog hlađenja — i nema nijedne iritacije u 3 mjeseca korišćenja.",
    authorName: "Ana V.",
    authorSubtitle: "36 god. · Sarajevo · ima rosacea · koristi Max 3 mjeseca",
  },
  howItWorks: [
    {
      step: 1,
      title: "Hlađenje kao zaštitni sloj",
      desc: "Uređaj rashladuje kožu neposredno prije svakog bljeskanja. Rashladena koža je manje reaktivna na toplinu — bljeskaj prolazi kroz folikul, a koža na površini ostaje hladna i mirna.",
    },
    {
      step: 2,
      title: "IPL — bez fizičkog kontakta s kožom",
      desc: "Za razliku od brijanja ili voska, IPL svjetlost ne dodiruje kožu na površini. Nema trenja, nema kemije, nema mehaničke traume. Folikul se tretira iznutra — koža ne zna da se ičega desilo.",
    },
    {
      step: 3,
      title: "Dugoročno mirna koža",
      desc: "Nakon kursa tretmana — manje dlačica, manje tretmana, manje potencijalnih iritacija. Osjetljiva koža se odmori od kroničnog stresa klasičnih metoda. Nema urastanja, nema crvenila, nema kompromisa.",
    },
  ],
  reviews: [
    {
      name: "Ana",
      age: 36,
      text: "Imam rosacea i bila sam sigurna da mi IPL nije opcija. Probala sam na manjem dijelu podlaktice i bukvalno ništa — nula reakcije. Sada koristim na cijelim nogama i licu. Prva metoda depilacije koja mi nije izazvala probleme.",
      date: "Februar 2026",
      location: "Sarajevo",
    },
    {
      name: "Sanela",
      age: 30,
      text: "Moja koža reaguje na sve. Vosak — crvenilo 2 dana. Brijanje — urasle dlačice koje treba vaditi. ICE COOL — ništa. Doslovno ništa negativno. I dlačice nestaju.",
      date: "Mart 2026",
      location: "Zenica",
    },
    {
      name: "Marija",
      age: 38,
      text: "Dermatologinja mi je rekla da probam IPL. Kupila sam Max zbog dvostrukog hlađenja — nema nijedne iritacije u 3 mjeseca korišćenja. Jedina metoda koja mi je promijenila život.",
      date: "Januar 2026",
      location: "Banja Luka",
    },
  ],
  specs: [
    { label: "Napajanje", value: "Žičano (adapter uključen)" },
    { label: "Broj bljeskova", value: "999,999" },
    { label: "Nivoi intenziteta", value: "5+ (pojačana snaga)" },
    { label: "Površina bljeska", value: "Najveća u liniji (4.5 cm²)" },
    { label: "Tehnologija hlađenja", value: "Ice Cool+™ dvostruko hlađenje" },
    { label: "Posebnost za os. kožu", value: "Hladi kožu i prije i poslije svakog bljeskanja" },
    { label: "Modovi rada", value: "Automatski i manualni" },
    { label: "Pogodno za", value: "Sve zone — posebno preporučeno za osjetljivu kožu" },
    { label: "Tip kože", value: "Fitzpatrick I-V (world. do tamna; V uz oprez)" },
    { label: "Sadržaj pakovanja", value: "Uređaj, adapter, naočale, nastavci, priručnik" },
    { label: "Garancija", value: "12 mjeseci" },
  ],
  closingTitle: "Osjetljiva koža. Konačno — depilacija bez kompromisa.",
  closingText: "ICE COOL Max s dvostrukim hlađenjem je optimalan za najosjetljiviju kožu. Besplatna dostava u BiH · Plaćanje pouzećem · 14 dana povrat bez pitanja.",
};

export default async function IplZaOsjetljivuKozuPage() {
  let dbProduct = null;
  try {
    dbProduct = await prisma.product.findUnique({
      where: { slug: "ice-cool-pro-max" },
      include: {
        galleryImages: { include: { media: true }, orderBy: { order: "asc" } },
        usageImages: { include: { media: true }, orderBy: { order: "asc" } },
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  const product = dbProduct
    ? {
        id: dbProduct.slug,
        name: dbProduct.name,
        price: dbProduct.price / 100,
        compareAtPrice: dbProduct.compareAtPrice
          ? dbProduct.compareAtPrice / 100
          : dbProduct.price / 100,
        images:
          dbProduct.galleryImages.length > 0
            ? dbProduct.galleryImages.map((gi) => gi.media.url)
            : [
                "/slike/ELITE/cover.png",
                "/slike/ELITE/slika1.png",
                "/slike/ELITE/slika2.png",
              ],
        usageImages:
          dbProduct.usageImages.length > 0
            ? dbProduct.usageImages.map((ui) => ui.media.url)
            : [
                "/slike/ELITE/koristenje1.png",
                "/slike/ELITE/koristenje2.png",
                "/slike/ELITE/koristenje3.png",
              ],
        image: dbProduct.galleryImages[0]?.media.url || "/slike/ELITE/cover.png",
      }
    : {
        id: "ice-cool-pro-max",
        name: "ICE COOL Max",
        price: 190.0,
        compareAtPrice: 380.0,
        images: [
          "/slike/ELITE/cover.png",
          "/slike/ELITE/slika1.png",
          "/slike/ELITE/slika2.png",
        ],
        usageImages: [
          "/slike/ELITE/koristenje1.png",
          "/slike/ELITE/koristenje2.png",
          "/slike/ELITE/koristenje3.png",
        ],
        image: "/slike/ELITE/cover.png",
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "ICE COOL Max",
    description: "IPL epilator za osjetljivu kožu — dvostruko hlađenje Ice Cool+™ štiti kožu pri svakom tretmanu.",
    brand: { "@type": "Brand", name: "Ice Cool PRO™" },
    image: "https://aurorashop.ba/slike/ELITE/cover.png",
    offers: {
      "@type": "Offer",
      price: "190.00",
      priceCurrency: "BAM",
      availability: "https://schema.org/InStock",
      url: "https://aurorashop.ba/l/ipl-za-osjetljivu-kozu",
      priceValidUntil: "2026-12-31",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "BAM" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "BA" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "BA",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "19" },
  };

  return (
    <>
      <Script
        id="product-jsonld-osjetljiva"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectResponseLanding product={product} content={osjetljivaContent} />
      <Footer />
    </>
  );
}
