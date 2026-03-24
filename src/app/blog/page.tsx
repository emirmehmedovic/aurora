import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | IPL depilacija, savjeti i vodiči | Aurora Shop BiH",
  description: "Sve što trebaš znati o kućnoj IPL depilaciji — usporedbe, vodiči i savjeti za žene u BiH. Besplatni sadržaj od Aurora ICE COOL.",
  alternates: { canonical: "https://aurorashop.ba/blog" },
};

const posts = [
  {
    slug: "ipl-depilacija-kod-kuce-vs-salon-laser",
    title: "IPL kod kuće vs. salon laser — šta se isplati?",
    excerpt: "Usporedili smo kućni IPL epilator i salon laser po cijeni, bolu i rezultatima. Matematika je brutalno jasna — evo što treba znati prije nego odlučiš.",
    category: "Usporedba",
    readTime: "6 min čitanja",
    date: "Mart 2026",
    highlight: true,
  },
  {
    slug: "philips-lumea-alternativa-bih",
    title: "Tražiš Philips Lumea u BiH? Postoji bolji način",
    excerpt: "Philips Lumea ne možeš naći u BiH bez carine i čekanja. ICE COOL serija je lokalna alternativa — iste tehnologije, odmah, pouzećem.",
    category: "Vodič za kupovinu",
    readTime: "5 min čitanja",
    date: "Mart 2026",
    highlight: false,
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-100/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#563435]/10 text-[#563435] text-sm font-semibold mb-5">
            <BookOpen className="w-4 h-4" />
            <span>Blog i vodiči</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Sve o IPL depilaciji
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Vodiči, usporedbe i odgovori na prava pitanja — za žene koje žele znati šta kupuju.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white/40 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 hover:bg-white/60 hover:shadow-lg transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#563435]/10 text-[#563435]">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#563435] transition-colors leading-tight">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>

              <div className="flex items-center gap-2 text-[#563435] font-semibold text-sm">
                Čitaj članak
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
