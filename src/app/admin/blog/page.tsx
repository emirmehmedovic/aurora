"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  Copy,
  BookOpen,
  Clock,
  Zap,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface BlogEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  keywords: string[];
  targetQuery: string;
}

const BLOG_POSTS: BlogEntry[] = [
  {
    slug: "ipl-depilacija-kod-kuce-vs-salon-laser",
    title: "IPL kod kuće vs. salon laser — šta se isplati?",
    excerpt:
      "Usporedba kućnog IPL epilatora i salon laser tretmana po cijeni, bolu, praktičnosti i rezultatima. Tabela troškova 5-godišnji period.",
    category: "Usporedba",
    readTime: "6 min",
    date: "Mart 2026",
    keywords: ["IPL kod kuće vs salon laser", "razlika IPL laser", "kućni epilator vs salon"],
    targetQuery: "IPL kod kuće vs salon laser",
  },
  {
    slug: "philips-lumea-alternativa-bih",
    title: "Tražiš Philips Lumea u BiH? Postoji bolji način",
    excerpt:
      "Zašto Philips Lumea nije dostupna u BiH bez muke i troškova carinjenja — i kako je ICE COOL serija lokalna alternativa s ugrađenim hlađenjem.",
    category: "Vodič za kupovinu",
    readTime: "5 min",
    date: "Mart 2026",
    keywords: ["Philips Lumea BiH", "Lumea alternativa Bosna", "ICE COOL vs Philips Lumea"],
    targetQuery: "Philips Lumea BiH",
  },
];

const categoryColors: Record<string, string> = {
  "Usporedba": "bg-violet-100 text-violet-700",
  "Vodič za kupovinu": "bg-sky-100 text-sky-700",
  "Savjeti": "bg-green-100 text-green-700",
  "Rezultati": "bg-amber-100 text-amber-700",
};

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://aurorashop.ba";

export default function AdminBlogPage() {
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
              <BookOpen className="w-5 h-5 text-[#563435]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            Svi SEO blog postovi — brzi pristup, pregled i kopiranje linka
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 shadow-sm">
          <FileText className="w-4 h-4 text-[#563435]" />
          <span>
            <strong className="text-gray-900">{BLOG_POSTS.length}</strong>{" "}
            blog {BLOG_POSTS.length === 1 ? "post" : "postova"}
          </span>
        </div>
      </div>

      {/* Blog index quick link */}
      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">Blog index stranica</p>
            <code className="text-xs text-gray-500 font-mono">/blog</code>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(`${BASE_URL}/blog`)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            Kopiraj
          </button>
          <Link
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#563435] text-white rounded-lg text-xs font-semibold hover:bg-[#6d4446] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Otvori
          </Link>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-5">
        {BLOG_POSTS.map((post) => {
          const fullUrl = `${BASE_URL}/blog/${post.slug}`;

          return (
            <div
              key={post.slug}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-1 bg-[#563435]" />

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-[#563435]/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#563435]" />
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                      {post.title}
                    </h2>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        <Clock className="w-3 h-3" />
                        {post.readTime} čitanja
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        {post.date}
                      </span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Target keywords */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                        Target keywords
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-[#563435]/8 text-[#563435] font-medium border border-[#563435]/15"
                          >
                            <Zap className="w-2.5 h-2.5" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* URL bar */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                      <code className="flex-1 text-xs text-gray-600 font-mono truncate">
                        /blog/{post.slug}
                      </code>
                      <button
                        onClick={() => copyToClipboard(fullUrl)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex-shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Kopiraj
                      </button>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#563435] text-white text-sm font-semibold rounded-xl hover:bg-[#6d4446] transition-colors shadow-sm whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Otvori
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
              Kako dodati novi blog post
            </p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Blog postovi su Next.js stranice u{" "}
              <code className="font-mono bg-amber-100 px-1 rounded">
                src/app/blog/[slug]/page.tsx
              </code>
              . Kreiraj novi folder s odgovarajućim slugom, dodaj sadržaj i
              JSON-LD structured data, zatim dodaj unos u listu{" "}
              <code className="font-mono bg-amber-100 px-1 rounded">
                BLOG_POSTS
              </code>{" "}
              na ovoj admin stranici.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
