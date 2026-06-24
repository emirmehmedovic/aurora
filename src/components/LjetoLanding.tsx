"use client";

import Image from "next/image";
import Link from "next/link";
import type { StorefrontProduct } from "@/lib/storefront-products";
import LandingOrderForm from "@/components/LandingOrderForm";
import bikiniBeforeImage from "../../public/slike/bikini-before.jpg";
import bikiniAfterImage from "../../public/slike/bikini-after.jpg";
import pazuheBeforeImage from "../../public/slike/pazuhe-before.jpg";
import pazuheAfterImage from "../../public/slike/pazuhe-after.jpg";

interface LjetoLandingProps {
  product: StorefrontProduct;
}

export default function LjetoLanding({ product }: LjetoLandingProps) {

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg: #FAF3EE;
          --bg2: #F5E8DF;
          --rose: #F0D0D0;
          --rose2: #E8B8B8;
          --gold: #C8A26A;
          --gold2: #A8834A;
          --gold-pale: #EDD9B8;
          --choco: #2A180A;
          --choco2: #5C3D22;
          --muted: #9B7A62;
          --cream: #FFFAF7;
          --glass-bg: rgba(255,250,247,0.55);
          --glass-border: rgba(200,162,106,0.22);
          --r-sm: 16px;
          --r-md: 24px;
          --r-lg: 36px;
          --r-xl: 52px;
          --r-pill: 100px;
        }

        html {
          scroll-behavior: smooth;
        }

        .ljeto-landing-wrapper::before {
          content: '';
          position: fixed;
          top: -200px;
          right: -200px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,208,208,0.5) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ljeto-landing-wrapper::after {
          content: '';
          position: fixed;
          bottom: -300px;
          left: -200px;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,162,106,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .ljeto-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 16px 48px !important;
            min-height: auto !important;
            gap: 36px !important;
          }
          .ljeto-moments-grid {
            grid-template-columns: 1fr !important;
          }
          .ljeto-ba-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .ljeto-ba-grid > div > div > div {
            height: 200px !important;
          }
          .ljeto-ba-card-text {
            padding: 16px 20px !important;
          }
          .ljeto-ba-quote {
            font-size: 13px !important;
            line-height: 1.55 !important;
            margin-bottom: 8px !important;
          }
          .ljeto-testi-grid {
            grid-template-columns: 1fr !important;
          }
          .ljeto-how-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .ljeto-nav {
            margin: 10px !important;
            top: 10px !important;
            padding: 12px 20px !important;
          }
          .ljeto-section-bg {
            margin: 0 12px !important;
            padding: 40px 24px !important;
            max-width: calc(100% - 24px) !important;
          }
        }
      `}} />
      <div className="ljeto-landing-wrapper min-h-screen" style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#FAF3EE",
        color: "#2A180A",
        lineHeight: 1.7,
      }}>

      {/* Navigation */}
      <nav className="ljeto-nav" style={{
        position: "sticky",
        top: "16px",
        zIndex: 100,
        maxWidth: "1100px",
        margin: "16px auto 0",
        padding: "14px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "var(--r-pill)",
        background: "rgba(255,250,247,0.72)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 4px 24px rgba(42,24,10,0.07)",
      }}>
        <Link href="/" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "17px",
          fontWeight: 500,
          color: "var(--choco)",
          textDecoration: "none",
        }}>
          Ice Cool <span style={{ color: "var(--gold)" }}>PRO™</span>
        </Link>
        <a href="#naruci" style={{
          background: "var(--gold)",
          color: "var(--cream)",
          border: "none",
          cursor: "pointer",
          padding: "10px 24px",
          borderRadius: "var(--r-pill)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 500,
          textDecoration: "none",
          transition: "background 0.2s, transform 0.15s",
          boxShadow: "0 4px 16px rgba(200,162,106,0.3)",
        }}>
          Naruči — 175 KM
        </a>
      </nav>

      {/* Hero Section */}
      <div className="ljeto-hero-grid" style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "80px 24px 60px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        minHeight: "90vh",
      }}>
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--rose)",
            border: "1px solid var(--rose2)",
            borderRadius: "var(--r-pill)",
            padding: "6px 16px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--choco2)",
            marginBottom: "24px",
          }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--gold)" }}></span>
            Ice Cool PRO™ · Ljeto bez brige
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.12,
            color: "var(--choco)",
            marginBottom: "24px",
          }}>
            Koliko si ljetnih<br/>dana provela<br/><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>sjedeći ovako?</em>
          </h1>

          <p style={{
            fontSize: "17px",
            color: "var(--choco2)",
            lineHeight: 1.8,
            marginBottom: "36px",
            fontWeight: 300,
            maxWidth: "480px",
          }}>
            Peškir u krilu. Noge skupljene. Izbjegavaš ustati dok te ne vide. Taj osjećaj ima rješenje — i to trajno.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
            <div style={{
              background: "rgba(255,250,247,0.7)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--r-pill)",
              padding: "7px 16px",
              fontSize: "12px",
              color: "var(--choco2)",
              backdropFilter: "blur(8px)",
            }}>✓ Vidljivi rezultati za 4–6 sedmica</div>
            <div style={{
              background: "rgba(255,250,247,0.7)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--r-pill)",
              padding: "7px 16px",
              fontSize: "12px",
              color: "var(--choco2)",
              backdropFilter: "blur(8px)",
            }}>✓ Platiš kuriru kad stigne</div>
            <div style={{
              background: "rgba(255,250,247,0.7)",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--r-pill)",
              padding: "7px 16px",
              fontSize: "12px",
              color: "var(--choco2)",
              backdropFilter: "blur(8px)",
            }}>✓ 14 dana povrat</div>
          </div>

          <a href="#naruci" style={{
            display: "inline-block",
            background: "var(--gold)",
            color: "var(--cream)",
            padding: "18px 48px",
            borderRadius: "var(--r-pill)",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
            boxShadow: "0 4px 20px rgba(200,162,106,0.35)",
          }}>
            Naruči — 175 KM
          </a>

          <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--muted)" }}>
            <strong style={{ color: "var(--choco)", fontSize: "15px" }}>175 KM</strong> &nbsp;
            <s style={{ color: "var(--rose2)" }}>345 KM</s> &nbsp;· ušteda 170 KM
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          {/* Hero Video */}
          <div style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "var(--r-xl)",
            background: "var(--glass-bg)",
            backdropFilter: "blur(28px) saturate(1.5)",
            WebkitBackdropFilter: "blur(28px) saturate(1.5)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 8px 40px rgba(42,24,10,0.08), 0 2px 8px rgba(42,24,10,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
            overflow: "hidden",
            position: "relative",
          }}>
            <video
              autoPlay
              loop
              playsInline
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            >
              <source src="/slike/Hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", width: "100%", maxWidth: "420px" }}>
            {[
              { val: "300+", lbl: "korisnica" },
              { val: "4.9", lbl: "ocjena" },
              { val: "10 min", lbl: "sedmično" },
            ].map((stat, i) => (
              <div key={i} style={{
                borderRadius: "var(--r-md)",
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 8px 40px rgba(42,24,10,0.08), 0 2px 8px rgba(42,24,10,0.04)",
                padding: "16px 8px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  content: '',
                  position: "absolute",
                  top: 0,
                  left: "10px",
                  right: "10px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                }}></div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "var(--choco)",
                  display: "block",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>{stat.val}</span>
                <span style={{ fontSize: "10px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{stat.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recognition Section */}
      <section style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
        <div className="ljeto-section-bg" style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "linear-gradient(160deg, var(--bg2) 0%, var(--rose) 100%)",
          borderRadius: "var(--r-xl)",
          padding: "64px 52px",
        }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold2)",
            marginBottom: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--gold)" }}></span>
            Prepoznaješ li ovo
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.18,
            color: "var(--choco)",
            marginBottom: "40px",
          }}>
            Situacije koje niko<br/><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>ne govori naglas</em>
          </h2>

          <div className="ljeto-moments-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" }}>
            {[
              { emoji: "🏖️", title: "Na plaži uvijek sjedim", text: "Nikad ne ustajem spontano. Uvijek provjerim da li je sve u redu prije nego se pomaknem." },
              { emoji: "📅", title: "Planiram 3 dana unaprijed", text: "Svaki odlazak na bazen ili more zahtijeva pripremu. Spontanost ne postoji kad imaš dlake." },
              { emoji: "👙", title: "Biram kupaći po dlakama", text: "Ne po tome što mi se sviđa — nego po tome što više pokriva. Već godinama." },
              { emoji: "😤", title: "Iritacija nakon svakog brijanja", text: "Urasle dlake, crvene mrlje, peckanje. Bikini zona posebno. Ponavljaš to svake 3 sedmice." },
            ].map((moment, i) => (
              <div key={i} style={{
                borderRadius: "var(--r-lg)",
                background: "rgba(255,250,247,0.55)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 4px 20px rgba(42,24,10,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                padding: "22px 24px",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}>
                <div style={{ fontSize: "24px", flexShrink: 0, marginTop: "2px" }}>{moment.emoji}</div>
                <div style={{ fontSize: "14px", color: "var(--choco2)", lineHeight: 1.65, fontWeight: 300 }}>
                  <strong style={{ color: "var(--choco)", fontWeight: 500, display: "block", marginBottom: "3px" }}>{moment.title}</strong>
                  {moment.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "32px",
            borderRadius: "var(--r-lg)",
            background: "rgba(255,250,247,0.5)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(200,162,106,0.2)",
            padding: "24px 28px",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontStyle: "italic",
              color: "var(--choco)",
              lineHeight: 1.6,
            }}>
              Što ako ovo ljeto bude <span style={{ color: "var(--gold2)" }}>drugačije?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section style={{ background: "var(--cream)", padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold2)",
            marginBottom: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--gold)" }}></span>
            Stvarni rezultati
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.18,
            color: "var(--choco)",
            marginBottom: "20px",
          }}>
            Pre i posle —<br/><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>po zonama</em>
          </h2>
          <div style={{ maxWidth: "640px", marginBottom: "48px" }}>
            <p style={{ fontSize: "16px", color: "var(--choco2)", lineHeight: 1.8, fontWeight: 300 }}>
              Rezultati koje vidiš su od stvarnih korisnica Ice Cool PRO™ iz BiH. Sve fotografije su anonimne i objavljene uz pristanak korisnica.
            </p>
          </div>

          <div className="ljeto-ba-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {[
              { zone: "Pazuhe · 8 sedmica", quote: "Nisam brijala pazuhe od aprila. Dlake su gotovo nestale.", meta: "Anonimna korisnica · Sarajevo · April 2026", beforeImage: pazuheBeforeImage, afterImage: pazuheAfterImage },
              { zone: "Bikini zona · 6 sedmica", quote: "Jedino što mi je ikad odgovaralo za bikini zonu. Nikakve iritacije, nikakvih uraslih.", meta: "Nikolina · Mostar · Maj 2026", beforeImage: bikiniBeforeImage, afterImage: bikiniAfterImage },
            ].map((card, i) => (
              <div key={i} style={{
                borderRadius: "var(--r-xl)",
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 8px 40px rgba(42,24,10,0.08), 0 2px 8px rgba(42,24,10,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                overflow: "hidden",
                position: "relative",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
                  <div style={{
                    height: card.beforeImage ? "450px" : "240px",
                    background: card.beforeImage ? "transparent" : "linear-gradient(135deg, #e8d5c4 0%, #d4b896 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {card.beforeImage ? (
                      <Image
                        src={card.beforeImage}
                        alt={`${card.zone} - pre tretmana`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={{ fontSize: "32px", opacity: 0.4 }}>📸</div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", fontStyle: "italic", lineHeight: 1.5 }}>Fotografija<br/>dolazi uskoro</div>
                      </div>
                    )}
                    <span style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: "var(--r-pill)",
                      background: "rgba(42,24,10,0.6)",
                      color: "rgba(255,255,255,0.8)",
                      zIndex: 2,
                    }}>Pre</span>
                  </div>
                  <div style={{
                    height: card.afterImage ? "450px" : "240px",
                    background: card.afterImage ? "transparent" : "linear-gradient(135deg, #f0e6d8 0%, #e8d5c4 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {card.afterImage ? (
                      <Image
                        src={card.afterImage}
                        alt={`${card.zone} - posle tretmana`}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={{ fontSize: "32px", opacity: 0.4 }}>✨</div>
                        <div style={{ fontSize: "11px", color: "var(--muted)", fontStyle: "italic", lineHeight: 1.5 }}>Fotografija<br/>dolazi uskoro</div>
                      </div>
                    )}
                    <span style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: "var(--r-pill)",
                      background: "rgba(200,162,106,0.85)",
                      color: "var(--cream)",
                      zIndex: 2,
                    }}>Posle</span>
                  </div>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: "2px",
                    background: "rgba(255,255,255,0.8)",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}>
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "var(--cream)",
                      border: "2px solid var(--gold-pale)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      color: "var(--gold)",
                      fontWeight: 700,
                      zIndex: 2,
                    }}>→</div>
                  </div>
                </div>
                <div className="ljeto-ba-card-text" style={{ padding: "20px 24px" }}>
                  <div style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "6px",
                  }}>{card.zone}</div>
                  <div className="ljeto-ba-quote" style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "var(--choco2)",
                    lineHeight: 1.65,
                    marginBottom: "10px",
                  }}>"{card.quote}"</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>{card.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
        <div className="ljeto-section-bg" style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "linear-gradient(135deg, var(--bg2) 0%, rgba(240,208,208,0.35) 100%)",
          borderRadius: "var(--r-xl)",
          padding: "64px 52px",
        }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--gold2)",
            marginBottom: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--gold)" }}></span>
            Iskustva korisnica
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 500,
            lineHeight: 1.18,
            color: "var(--choco)",
            marginBottom: "44px",
          }}>
            Šta kažu žene koje<br/><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>su to promijenile</em>
          </h2>

          <div className="ljeto-testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[
              { zone: "Bikini zona", name: "Nikolina", location: "Mostar · Maj 2026", initial: "N", text: "Nisam vjerovala da će raditi za bikini zonu. Probala sam sve — vosak, brijanje, epilator. Svaki put ista priča: iritacija, urasle dlake, crvene mrlje. Nakon 6 sedmica sa Ice Cool PRO — kao da se ništa nije ni desilo. Glatko i mirno." },
              { zone: "Pazuhe · Noge", name: "Tina", location: "Tuzla · Juni 2026", initial: "T", text: "Ovo ljeto sam prvi put spontano rekla da idem na bazen. Bez planiranja, bez gledanja kalendara, bez provjere je li sve u redu. Uzela sam peškir i otišla. Zvuči glupo ali za mene je to bila ogromna stvar." },
              { zone: "Sve zone", name: "Selma", location: "Sarajevo · April 2026", initial: "S", text: "Prvih sedam dana — ništa. Druga sedmica — malo sporiji rast. Četvrta sedmica — pazuhe gotovo čiste. Šesta sedmica — noge glatke 10 dana bez brijanja. Koristim 10 minuta sedmično uz seriju. To je sve." },
            ].map((testi, i) => (
              <div key={i} style={{
                borderRadius: "var(--r-xl)",
                background: "rgba(255,250,247,0.6)",
                backdropFilter: "blur(24px) saturate(1.4)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.55)",
                boxShadow: "0 8px 32px rgba(42,24,10,0.07), inset 0 1px 0 rgba(255,255,255,0.7)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  display: "inline-block",
                  background: "rgba(200,162,106,0.12)",
                  border: "1px solid rgba(200,162,106,0.25)",
                  borderRadius: "var(--r-pill)",
                  padding: "4px 12px",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--gold2)",
                  marginBottom: "14px",
                  alignSelf: "flex-start",
                }}>{testi.zone}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "52px",
                  lineHeight: 0.8,
                  color: "var(--gold-pale)",
                  marginBottom: "8px",
                  userSelect: "none",
                }}>"</div>
                <div style={{
                  fontSize: "13px",
                  color: "var(--choco2)",
                  lineHeight: 1.75,
                  flex: 1,
                  marginBottom: "20px",
                  fontWeight: 300,
                }}>{testi.text}</div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(200,162,106,0.15)",
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--rose), var(--gold-pale))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--gold2)",
                    border: "1px solid rgba(200,162,106,0.25)",
                    flexShrink: 0,
                  }}>{testi.initial}</div>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--choco)", display: "block" }}>{testi.name}</span>
                    <span style={{ fontSize: "11px", color: "var(--muted)", display: "block" }}>{testi.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "80px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div className="ljeto-how-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div>
              <div style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold2)",
                marginBottom: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <span style={{ display: "block", width: "20px", height: "1px", background: "var(--gold)" }}></span>
                Kako funkcioniše
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 500,
                lineHeight: 1.18,
                color: "var(--choco)",
                marginBottom: "20px",
              }}>
                10 minuta nedeljom.<br/><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>To je sve što trebaš.</em>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { num: "1", title: "Pripremi kožu", text: "Obrij područje koje tretiraš. Čista, suha koža. Pet minuta pripreme." },
                  { num: "2", title: "Primijeni tretman", text: "Prisloni uređaj, pritisni dugme. Ice Cool™ hlađenje radi automatski. Deset minuta za noge, dvije za pazuhe, tri za bikini zonu." },
                  { num: "3", title: "Ponovi jednom sedmično", text: "Rezultati se grade. Nakon četiri sedmice počneš primjećivati razliku. Nakon osam — nova stvarnost." },
                ].map((step, i) => (
                  <div key={i} style={{
                    borderRadius: "var(--r-lg)",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: "0 8px 40px rgba(42,24,10,0.08), 0 2px 8px rgba(42,24,10,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                    padding: "20px 24px",
                    display: "flex",
                    gap: "18px",
                    alignItems: "flex-start",
                  }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--gold-pale), var(--rose))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "var(--gold2)",
                      flexShrink: 0,
                      border: "1px solid rgba(200,162,106,0.25)",
                    }}>{step.num}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--choco)", marginBottom: "4px" }}>{step.title}</div>
                      <div style={{ fontSize: "13px", color: "var(--choco2)", lineHeight: 1.65, fontWeight: 300 }}>{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              borderRadius: "var(--r-xl)",
              background: "linear-gradient(160deg, var(--rose) 0%, var(--bg2) 100%)",
              padding: "36px 32px",
              border: "1px solid rgba(200,162,106,0.15)",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "18px",
                fontWeight: 500,
                color: "var(--choco)",
                marginBottom: "24px",
                textAlign: "center",
              }}>Šta se dešava sedmica po sedmici</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { week: "Sedmica 1–2", result: "Sporiji rast", detail: "Dlake rastu sporije. Možeš brijati rjeđe." },
                  { week: "Sedmica 3–4", result: "Pazuhe gotovo čiste", detail: "Primjetan pad gustine. Nema više iritacije i uraslih." },
                  { week: "Sedmica 5–6", result: "Bikini zona mirna", detail: "Noge glatke 10+ dana. Bikini zona bez iritacije." },
                  { week: "Sedmica 7–8", result: "Spontano na bazen", detail: "Prestaneš planirati. Uzmeš peškir i ideš." },
                ].map((item, i, arr) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(200,162,106,0.12)" : "none",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "var(--gold)",
                        border: "2px solid var(--gold-pale)",
                        marginTop: "5px",
                      }}></div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 500, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>{item.week}</div>
                      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--choco)", marginBottom: "3px" }}>{item.result}</div>
                      <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.55, fontWeight: 300 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="naruci" style={{ padding: "0 0 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <LandingOrderForm product={product} />
        </div>
      </section>

      {/* Footer Trust */}
      <div style={{ textAlign: "center", padding: "72px 24px 48px", position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: "560px",
          margin: "0 auto",
          borderRadius: "var(--r-xl)",
          background: "rgba(42,24,10,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(200,162,106,0.2)",
          boxShadow: "0 20px 60px rgba(42,24,10,0.2)",
          padding: "52px 44px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--gold-pale)",
            marginBottom: "12px",
          }}>Ovo ljeto može biti drugačije.</div>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px", fontWeight: 300 }}>
            Preko 300 žena iz BiH je već odlučilo. Uzele su peškir i otišle — bez planiranja, bez provjere, bez brige. Jedna narudžba. Jedno ljeto slobode.
          </div>
          <a href="#naruci" style={{
            display: "inline-block",
            border: "1px solid var(--gold)",
            color: "var(--gold-pale)",
            padding: "14px 36px",
            borderRadius: "var(--r-pill)",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}>Naruči — 175 KM</a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "20px 24px", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "12px", color: "var(--muted)" }}>
          © 2026 Ice Cool PRO™ · Aurora Shop · <a href="https://aurorashop.ba/politika-privatnosti" style={{ color: "var(--gold)", textDecoration: "none" }}>Politika privatnosti</a> · <a href="https://aurorashop.ba/politika-povrata" style={{ color: "var(--gold)", textDecoration: "none" }}>Politika povrata</a>
        </p>
      </footer>
      </div>
    </>
  );
}
