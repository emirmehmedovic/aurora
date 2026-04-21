"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  Copy,
  LayoutTemplate,
  Zap,
  Star,
  Package,
} from "lucide-react";
import { toast } from "sonner";

interface LandingPageEntry {
  slug: string;
  title: string;
  productName: string;
  productSlug: string;
  price: string;
  badge: string;
  description: string;
  tags: string[];
}

const LANDING_PAGES: LandingPageEntry[] = [
  {
    slug: "ipl-aparat-protiv-dlacica",
    title: "ICE COOL PRO™ — IPL Aparat za Trajno Uklanjanje Dlačica",
    productName: "ICE COOL PRO",
    productSlug: "ice-cool-pro",
    price: "175 KM",
    badge: "Najtraženiji model u BiH",
    description:
      "Glavni direct-response landing za ICE COOL PRO model. Targetira upit 'IPL aparat' i varijante. 5 nivoa intenziteta, Ice Cool™ hlađenje.",
    tags: ["PRO", "Glavni model", "SEO"],
  },
  {
    slug: "profesionalni-ipl-epilator",
    title: "ICE COOL Max™ — Profesionalni IPL Epilator",
    productName: "ICE COOL Max",
    productSlug: "ice-cool-pro-max",
    price: "190 KM",
    badge: "Za žene kojima je vrijeme najvažnije",
    description:
      "Landing za premium Max model. Naglasak na brzini (noge za 10 min), dvostrukom hlađenju Ice Cool+™ i salon rezultatima kod kuće.",
    tags: ["Max", "Premium", "SEO"],
  },
  {
    slug: "kompaktni-ipl-uredjaj",
    title: "ICE COOL LITE™ — Kompaktni IPL Uređaj",
    productName: "ICE COOL LITE",
    productSlug: "ice-cool-lite",
    price: "165 KM",
    badge: "Savršen prvi korak u IPL depilaciji",
    description:
      "Landing za kompaktni LITE model. Targetira putnice, lice i bikini zonu. Naglasak na veličini i prenosivosti.",
    tags: ["LITE", "Kompaktni", "SEO"],
  },
  {
    slug: "ipl-epilator-za-lice",
    title: "IPL Epilator za Lice — Gornja Usna, Brada, Zalisci",
    productName: "ICE COOL LITE",
    productSlug: "ice-cool-lite",
    price: "165 KM",
    badge: "Idealan za gornju usnu, bradu i zalistke",
    description:
      "Zonski landing targetira upit 'IPL za lice'. Naglasak na preciznosti LITE modela i ice cooling zaštiti osjetljive zone lica.",
    tags: ["LITE", "Zona: Lice", "SEO"],
  },
  {
    slug: "ipl-za-bikini-zonu",
    title: "IPL Depilacija Bikini Zone Kod Kuće",
    productName: "ICE COOL LITE",
    productSlug: "ice-cool-lite",
    price: "165 KM",
    badge: "Privatnost, preciznost, trajni rezultati",
    description:
      "Zonski landing targetira upit 'IPL bikini zona'. Naglasak na privatnosti kućnog tretmana i eliminaciji neugode od salona.",
    tags: ["LITE", "Zona: Bikini", "SEO"],
  },
  {
    slug: "trajna-depilacija-potkolenice",
    title: "Trajna Depilacija Nogu Kod Kuće",
    productName: "ICE COOL PRO",
    productSlug: "ice-cool-pro",
    price: "175 KM",
    badge: "Za žene koje su umorne od brijanja",
    description:
      "Zonski landing targetira upit 'trajna depilacija nogu'. Matematički argument: 175 KM jednom vs. 200 KM/god. na žilete.",
    tags: ["PRO", "Zona: Noge", "SEO"],
  },
  {
    slug: "ipl-za-osjetljivu-kozu",
    title: "IPL Depilacija za Osjetljivu Kožu",
    productName: "ICE COOL Max",
    productSlug: "ice-cool-pro-max",
    price: "190 KM",
    badge: "Prva metoda depilacije koja ne kažnjava kožu",
    description:
      "Specijalizirani landing za osjetljivu kožu (rosacea, ekzem, iritacije). Targetira upit 'IPL osjetljiva koža'. Preporučuje Max s dvostrukim hlađenjem.",
    tags: ["Max", "Osjetljiva koža", "SEO"],
  },
  {
    slug: "kako-sam-prestala-ici-u-salon",
    title: "1.440 KM godišnje za epilaciju u salonu — ili 175 KM jednom",
    productName: "ICE COOL PRO",
    productSlug: "ice-cool-pro",
    price: "175 KM",
    badge: "Šta se desi kad to jednom izračunaš",
    description:
      "Advertorial LP. Finansijski argument: trošak salona kroz godinu vs. jednokratna kupovina PRO uređaja. Targetira žene koje već idu redovno u salon.",
    tags: ["PRO", "Advertorial", "Finansijski kut"],
  },
  {
    slug: "10-minuta-sedmicno",
    title: "Imam dvoje djece, puno radno vrijeme i nikad slobodnog sata",
    productName: "ICE COOL Max",
    productSlug: "ice-cool-pro-max",
    price: "190 KM",
    badge: "Evo kako sam riješila epilaciju za 10 minuta sedmično",
    description:
      "Advertorial LP. Targetira zaposlene mame — naglasak na brzini (10 min/sed.), dvostrukom hlađenju Max modela i uštedi vremena vs. salona.",
    tags: ["Max", "Advertorial", "Mame & Stil"],
  },
  {
    slug: "moj-najveci-kompleks",
    title: "Gornja usna mi je bila najveći kompleks 10 godina",
    productName: "ICE COOL LITE",
    productSlug: "ice-cool-lite",
    price: "165 KM",
    badge: "Evo šta ga je konačno riješilo",
    description:
      "Advertorial LP. Empatijski kut — kompleks gornje usne, brade i lica. Targetira žene koje godinama skrivaju problematičnu zonu. Preporučuje LITE za preciznost.",
    tags: ["LITE", "Advertorial", "Zona: Lice"],
  },
  {
    slug: "priprema-za-more",
    title: "Priprema za more: šta žene mijenjaju kad izračunaju stvarni trošak epilacije",
    productName: "ICE COOL PRO",
    productSlug: "ice-cool-pro",
    price: "175 KM",
    badge: "April je pravo vrijeme — do mora ima dovoljno",
    description:
      "Advertorial V2 (split hero, roze tema). Sezonski LP za ljetovanje — finansijska kalkulacija salon vs. IPL, UV pauza, april kao idealan start.",
    tags: ["PRO", "Advertorial V2", "Ljetovanje"],
  },
  {
    slug: "iritacija-nakon-epilacije",
    title: "Iritacija i urasle dlačice nakon epilacije nisu neizbježne",
    productName: "ICE COOL PRO",
    productSlug: "ice-cool-pro",
    price: "175 KM",
    badge: "Obrazovni kut — zašto brijanje i vosak iritiraju",
    description:
      "Advertorial V2 (band hero, lavanda tema). Objašnjava uzrok iritacije (mikrotrauma, narezani vrh dlačice) i kako IPL rješava problem na korijenu.",
    tags: ["PRO", "Advertorial V2", "Koža & Iritacija"],
  },
  {
    slug: "kratki-rukavi",
    title: "Kratki rukavi. Bazen. Fotka bez razmišljanja. To nije privilegija, to je odluka.",
    productName: "ICE COOL Max",
    productSlug: "ice-cool-pro-max",
    price: "190 KM",
    badge: "Samopouzdanje kut — pazuhe i kompleks oblačenja",
    description:
      "Advertorial V2 (centered hero, mauve tema). Targetira žene koje svakodnevno prilagođavaju odijevanje zbog pazuha. Max s dvostrukim hlađenjem.",
    tags: ["Max", "Advertorial V2", "Samopouzdanje"],
  },
];

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://aurorashop.ba";

const tagColors: Record<string, string> = {
  PRO: "bg-violet-100 text-violet-700",
  Max: "bg-amber-100 text-amber-700",
  LITE: "bg-sky-100 text-sky-700",
  Premium: "bg-[#563435]/10 text-[#563435]",
  "Glavni model": "bg-green-100 text-green-700",
  Kompaktni: "bg-teal-100 text-teal-700",
  "Zona: Lice": "bg-pink-100 text-pink-700",
  "Zona: Bikini": "bg-rose-100 text-rose-700",
  "Zona: Noge": "bg-indigo-100 text-indigo-700",
  "Osjetljiva koža": "bg-orange-100 text-orange-700",
  SEO: "bg-gray-100 text-gray-600",
  Advertorial: "bg-purple-100 text-purple-700",
  "Advertorial V2": "bg-pink-100 text-pink-700",
  "Finansijski kut": "bg-emerald-100 text-emerald-700",
  "Mame & Stil": "bg-fuchsia-100 text-fuchsia-700",
  Ljetovanje: "bg-orange-100 text-orange-600",
  "Koža & Iritacija": "bg-violet-100 text-violet-700",
  Samopouzdanje: "bg-rose-100 text-rose-700",
};

export default function LandingPagesAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Link kopiran u clipboard!");
    });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#563435] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-50/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-[#563435]/10 rounded-lg">
              <LayoutTemplate className="w-5 h-5 text-[#563435]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            Svi direct-response landing pages — brzi pristup, pregled i
            kopiranje linka
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 shadow-sm">
          <Zap className="w-4 h-4 text-[#563435]" />
          <span>
            <strong className="text-gray-900">{LANDING_PAGES.length}</strong>{" "}
            landing page{LANDING_PAGES.length !== 1 ? "a" : ""}
          </span>
        </div>
      </div>

      {/* Landing Pages Grid */}
      <div className="grid grid-cols-1 gap-5">
        {LANDING_PAGES.map((lp) => {
          const fullUrl = `${BASE_URL}/l/${lp.slug}`;

          return (
            <div
              key={lp.slug}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Top stripe */}
              <div className="h-1 bg-[#563435]" />

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-[#563435]/10 rounded-xl flex items-center justify-center">
                    <LayoutTemplate className="w-6 h-6 text-[#563435]" />
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">
                        {lp.title}
                      </h2>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {lp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            tagColors[tag] ?? "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {lp.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-700">
                          {lp.productName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-gray-700">
                          {lp.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-[#563435]" />
                        <span className="italic text-gray-500">
                          &ldquo;{lp.badge}&rdquo;
                        </span>
                      </div>
                    </div>

                    {/* URL bar */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                      <code className="flex-1 text-xs text-gray-600 font-mono truncate">
                        /l/{lp.slug}
                      </code>
                      <button
                        onClick={() => copyToClipboard(fullUrl)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex-shrink-0"
                        title="Kopiraj link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Kopiraj
                      </button>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <Link
                      href={`/l/${lp.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#563435] text-white text-sm font-semibold rounded-xl hover:bg-[#6d4446] transition-colors shadow-sm whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Otvori
                    </Link>
                    <Link
                      href={`/admin/products?highlight=${lp.productSlug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      <Package className="w-4 h-4" />
                      Proizvod
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info footer */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">
              Kako dodati novi landing page
            </p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Svaki landing page je Next.js stranica u{" "}
              <code className="font-mono bg-amber-100 px-1 rounded">
                src/app/l/[slug]/page.tsx
              </code>
              . Kreiraj novi folder s odgovarajućim slugom, kopiraj strukturu iz
              postojećeg (npr.{" "}
              <code className="font-mono bg-amber-100 px-1 rounded">
                profesionalni-ipl-epilator
              </code>
              ), prilagodi{" "}
              <code className="font-mono bg-amber-100 px-1 rounded">
                LandingContent
              </code>{" "}
              objekt i dodaj unos u listu na ovoj stranici.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
