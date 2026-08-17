"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StorefrontProduct } from "@/lib/storefront-products";
import LandingOrderForm from "@/components/LandingOrderForm";

interface IntimnostLandingProps {
  product: StorefrontProduct;
}

export default function IntimnostLanding({ product }: IntimnostLandingProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');

        :root {
          --rose-gold: #A65D6B;
          --soft-gold: #C9A28F;
          --warm-beige: #F8F4ED;
          --cream: #FDF9F3;
          --taupe: #3F2E2A;
          --muted-brown: #6B5C52;
          --light-border: #EDE4D8;
        }

        html {
          scroll-behavior: smooth;
        }

        .intimnost-wrapper {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--cream);
          color: var(--taupe);
          line-height: 1.7;
        }

        .heading-serif {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          line-height: 1.05;
        }

        .section-header {
          font-size: 2.15rem;
          line-height: 1.1;
          font-weight: 700;
          color: var(--taupe);
        }

        .hero-bg {
          background: linear-gradient(135deg, var(--cream) 0%, var(--warm-beige) 100%);
        }

        .cta-button {
          background-color: var(--rose-gold);
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 15px -3px rgb(166 93 107 / 0.3), 0 4px 6px -4px rgb(166 93 107 / 0.3);
        }

        .cta-button:hover {
          background-color: #8F4E5B;
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgb(166 93 107 / 0.35), 0 8px 10px -6px rgb(166 93 107 / 0.35);
        }

        .premium-card {
          background-color: rgba(253, 249, 243, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(201, 162, 143, 0.35);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.12);
        }

        .testimonial-card {
          background-color: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 162, 143, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--soft-gold), var(--soft-gold), transparent);
          opacity: 0.45;
        }

        .intimnost-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--light-border);
        }

        .how-it-works-card {
          background: white;
          border: 1px solid var(--light-border);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .how-it-works-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--rose-gold);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .intimnost-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 16px 48px !important;
            gap: 36px !important;
          }
          .intimnost-problem-grid {
            grid-template-columns: 1fr !important;
          }
          .intimnost-testi-grid {
            grid-template-columns: 1fr !important;
          }
          .intimnost-math-grid {
            grid-template-columns: 1fr !important;
          }
          .intimnost-section-bg {
            margin: 0 12px !important;
            padding: 40px 24px !important;
          }
        }
      `}} />
      <div className="intimnost-wrapper min-h-screen">

      {/* Navigation */}
      <nav className="intimnost-nav sticky top-0 z-50">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
              alt="Ice Cool PRO™"
              width={80}
              height={80}
              className="rounded-xl"
            />
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="https://wa.me/38761904759?text=Zdravo%2C%20zanima%20me%20ICE%20COOL%20PRO%20ure%C4%91aj"
              className="hidden md:flex"
              style={{
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--taupe)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>

            <a href="#naruci" style={{
              padding: "10px 24px",
              background: "white",
              border: "1px solid var(--light-border)",
              borderRadius: "24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--taupe)",
              textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Naruči odmah
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
        <div className="intimnost-hero-grid" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "40px",
          alignItems: "center",
        }}>

          <div style={{ maxWidth: "640px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "white",
              padding: "6px 16px",
              borderRadius: "24px",
              border: "1px solid var(--light-border)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              marginBottom: "24px",
            }}>
              <div style={{ display: "flex", marginLeft: "-4px" }}>
                <div style={{ width: "24px", height: "24px", background: "var(--soft-gold)", borderRadius: "50%", border: "2px solid white" }}></div>
                <div style={{ width: "24px", height: "24px", background: "var(--rose-gold)", borderRadius: "50%", border: "2px solid white", marginLeft: "-8px" }}></div>
                <div style={{ width: "24px", height: "24px", background: "#D4B8A8", borderRadius: "50%", border: "2px solid white", marginLeft: "-8px" }}></div>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--taupe)" }}>Preko 300 žena iz BiH već koristi</span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.02,
              letterSpacing: "-1.8px",
              fontWeight: 700,
              color: "var(--taupe)",
              marginBottom: "24px",
            }}>
              Urasle dlačice i iritacije<br/>na bikini zoni te<br/>sprječavaju da uživaš.
            </h1>

            <p style={{
              fontSize: "20px",
              color: "var(--muted-brown)",
              marginBottom: "32px",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}>
              Kada koža postane glatka i mirnija, to se primijeti, čak i bez riječi.<br/>
              <span style={{ fontWeight: 600 }}>„Četvrta sedmica — muž je primijetio prije mene."</span>
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="#naruci" className="cta-button" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px 40px",
                borderRadius: "24px",
                fontSize: "18px",
                fontWeight: 600,
                textDecoration: "none",
              }}>
                <span>Želim intimnost bez brige — Naruči za {product.price} KM</span>
              </a>

              <a href="#intimnost-sekcija" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px 28px",
                border: "1px solid var(--light-border)",
                borderRadius: "24px",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--taupe)",
                textDecoration: "none",
                background: "transparent",
                transition: "background 0.2s",
              }}>
                <span>Pročitaj priču</span>
              </a>
            </div>

            <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--muted-brown)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--rose-gold)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <span>Besplatna dostava • Pouzećem • plaćanje pouzećem</span>
            </div>
          </div>

          <div>
            <div style={{
              background: "white",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              border: "1px solid var(--light-border)",
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{
                aspectRatio: "9/16",
                background: "linear-gradient(135deg, var(--warm-beige) 0%, var(--cream) 50%, #F5F0E6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source src="/slike/Hero.mp4" type="video/mp4" />
                  <div style={{ textAlign: "center", padding: "32px" }}>
                    <div style={{
                      width: "96px",
                      height: "96px",
                      margin: "0 auto 24px",
                      background: "rgba(255,255,255,0.8)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(201, 162, 143, 0.4)",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
                    }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--rose-gold)"><path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 00-1.41 0L1.29 18.96a.996.996 0 000 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05a.996.996 0 000-1.41l-2.33-2.35zm-1.03 5.49l-2.12-2.12 2.44-2.44 2.12 2.12-2.44 2.44z"/></svg>
                    </div>
                    <div style={{ color: "var(--rose-gold)", fontWeight: 600, letterSpacing: "-0.5px", fontSize: "20px" }}>Ice Cool PRO™</div>
                    <div style={{ fontSize: "12px", color: "#8C7668", marginTop: "6px", letterSpacing: "0.5px" }}>UGRAĐENO HLAĐENJE • 999.999 BLJESKOVA</div>
                  </div>
                </video>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(63, 46, 42, 0.75)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(201, 162, 143, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    zIndex: 10,
                  }}
                  aria-label={isMuted ? "Uključi zvuk" : "Isključi zvuk"}
                >
                  {isMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EDD9B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EDD9B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
          <span style={{ textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", fontWeight: 600, color: "var(--rose-gold)" }}>Intimnost bez nelagode</span>
          <h2 className="section-header" style={{ marginTop: "12px" }}>
            Kada te iritacije i urasle dlačice<br/>sprječavaju da se opustiš.
          </h2>
        </div>

        <div className="intimnost-problem-grid" style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="premium-card" style={{ borderRadius: "24px", padding: "28px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "18px", marginBottom: "12px", color: "var(--taupe)" }}>Urasle dlačice na bikini zoni</h4>
            <p style={{ fontSize: "14px", color: "var(--muted-brown)", lineHeight: 1.7 }}>
              One te bole kada te partner dodiruje. Crvenilo i iritacija traju danima nakon depilacije.
              Zbog toga često izbjegavaš intimnost ili se osjećaš napeto umjesto opušteno.
            </p>
          </div>
          <div className="premium-card" style={{ borderRadius: "24px", padding: "28px" }}>
            <h4 style={{ fontWeight: 600, fontSize: "18px", marginBottom: "12px", color: "var(--taupe)" }}>Crvenilo i peckanje nakon depilacije</h4>
            <p style={{ fontSize: "14px", color: "var(--muted-brown)", lineHeight: 1.7 }}>
              Tri do četiri dana nakon salona zona je osjetljiva. Zbog toga se osjećaš napeto u intimnim trenucima, umjesto da uživaš bez brige.
            </p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}><div className="gold-line"></div></div>

      {/* Key Section - Intimacy */}
      <section id="intimnost-sekcija" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div className="premium-card" style={{ borderRadius: "24px", padding: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ color: "var(--rose-gold)", fontSize: "14px", fontWeight: 600, letterSpacing: "1px" }}>KADA ON PRIMIJETI PRIJE TEBE</span>
            </div>

            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "24px", textAlign: "center", color: "var(--taupe)" }}>
                „Četvrta sedmica — muž je primijetio prije mene."
              </h3>

              <div style={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
                padding: "28px",
                borderRadius: "16px",
                border: "1px solid var(--light-border)",
              }}>
                <p style={{ fontSize: "18px", lineHeight: 1.7, fontStyle: "italic", color: "var(--taupe)" }}>
                  „Nisam ni govorila da koristim nešto novo. On je samo rekao da mi koža izgleda drugačije.
                  Tada sam shvatila kolika je razlika."
                </p>
                <p style={{ marginTop: "16px", fontSize: "14px", fontWeight: 500, color: "var(--rose-gold)" }}>— jedna od naših korisnica</p>
              </div>

              <div style={{ marginTop: "32px", textAlign: "center" }}>
                <p style={{ color: "var(--muted-brown)", fontSize: "14px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto" }}>
                  Kada urasle dlačice i iritacije nestanu, intimni trenuci postaju opušteniji.
                  Bez straha, bez peckanja, bez izbjegavanja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}><div className="gold-line"></div></div>

      {/* Math Section */}
      <section style={{ background: "var(--warm-beige)", padding: "56px 0", borderTop: "1px solid var(--light-border)", borderBottom: "1px solid var(--light-border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-1.5px", marginBottom: "32px", color: "var(--taupe)" }}>
              Koliko te košta svaki mjesec<br/>kad izbjegavaš intimnost?
            </h2>

            <div className="intimnost-math-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "32px" }}>
              <div className="premium-card" style={{ borderRadius: "24px", padding: "28px", textAlign: "left" }}>
                <div style={{ fontSize: "14px", color: "#8C7668" }}>12 odlazaka u salon godišnje</div>
                <div style={{ fontSize: "48px", fontWeight: 700, letterSpacing: "-2px", marginTop: "4px", color: "var(--taupe)" }}>1.440 KM</div>
              </div>

              <div className="premium-card" style={{ borderRadius: "24px", padding: "28px", textAlign: "left", borderWidth: "2px", borderColor: "var(--rose-gold)" }}>
                <div style={{ fontSize: "14px", color: "var(--rose-gold)", fontWeight: 500 }}>Ice Cool PRO — jednom</div>
                <div style={{ fontSize: "48px", fontWeight: 700, letterSpacing: "-2px", marginTop: "4px", color: "var(--rose-gold)" }}>{product.price} KM</div>
                <div style={{ fontSize: "12px", marginTop: "12px", color: "#059669", fontWeight: 500 }}>999.999 bljeskova — traje godinama</div>
              </div>

              <div className="premium-card" style={{ borderRadius: "24px", padding: "28px", textAlign: "left" }}>
                <div style={{ fontSize: "14px", color: "#8C7668" }}>Ušteda u prvoj godini</div>
                <div style={{ fontSize: "48px", fontWeight: 700, letterSpacing: "-2px", marginTop: "4px", color: "#059669" }}>1.265 KM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={{ color: "var(--rose-gold)", fontWeight: 600 }}>Ovo kažu žene koje su prestale ići u salon</span>
        </div>

        <div className="intimnost-testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          <div className="testimonial-card" style={{ padding: "24px", borderRadius: "24px", border: "1px solid var(--light-border)" }}>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--taupe)" }}>„Nakon 6 sedmica pazuhe su mi potpuno čiste. Više ne idem u salon. Uštedjela sam preko 400 KM u prva dva mjeseca."</p>
            <p style={{ marginTop: "16px", fontSize: "12px", fontWeight: 500, color: "var(--rose-gold)" }}>— Lejla, Zenica</p>
          </div>

          <div className="testimonial-card" style={{ padding: "24px", borderRadius: "24px", border: "1px solid var(--light-border)" }}>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--taupe)" }}>„Platila sam {product.price} KM umjesto 1.200 za Philips Lumeu. Isti IPL efekat, samo 8 puta jeftinije + ugrađeno hlađenje."</p>
            <p style={{ marginTop: "16px", fontSize: "12px", fontWeight: 500, color: "var(--rose-gold)" }}>— Maida, Tuzla</p>
          </div>

          <div className="testimonial-card" style={{ padding: "24px", borderRadius: "24px", border: "1px solid var(--light-border)" }}>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--taupe)" }}>„Nakon mjesec i po više nemam urasle dlačice. Koža se hladi na svakom impulsu — ne osjećam peckanje čak ni na bikini zoni."</p>
            <p style={{ marginTop: "16px", fontSize: "12px", fontWeight: 500, color: "var(--rose-gold)" }}>— jedna od naših korisnica</p>
          </div>
        </div>
      </section>

      {/* Order Section with How It Works Button */}
      <section id="naruci" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px" }}>
        {/* How It Works Button */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "white",
              border: "1px solid var(--light-border)",
              borderRadius: "24px",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--taupe)",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--rose-gold)" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Kako funkcioniše Ice Cool PRO?</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--muted-brown)"
              strokeWidth="2"
              style={{ transform: showHowItWorks ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* How It Works Content */}
        {showHowItWorks && (
          <div style={{
            maxWidth: "800px",
            margin: "0 auto 32px",
            padding: "32px",
            background: "white",
            borderRadius: "24px",
            border: "1px solid var(--light-border)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--taupe)", marginBottom: "24px", textAlign: "center" }}>
              Kako funkcioniše Ice Cool PRO
            </h3>

            {/* How to use */}
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Korištenje — 10 minuta sedmično
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div className="how-it-works-card">
                  <div className="how-it-works-number">1</div>
                  <div>
                    <strong style={{ color: "var(--taupe)" }}>Obrij zonu</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted-brown)", marginTop: "4px" }}>Čista, suha koža. 2-3 minute pripreme.</p>
                  </div>
                </div>
                <div className="how-it-works-card">
                  <div className="how-it-works-number">2</div>
                  <div>
                    <strong style={{ color: "var(--taupe)" }}>Primijeni tretman</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted-brown)", marginTop: "4px" }}>Prisloni uređaj, pritisni dugme. Koža se hladi na svakom impulsu — ne osjećaš peckanje čak ni na bikini zoni.</p>
                  </div>
                </div>
                <div className="how-it-works-card">
                  <div className="how-it-works-number">3</div>
                  <div>
                    <strong style={{ color: "var(--taupe)" }}>Ponovi jednom sedmično</strong>
                    <p style={{ fontSize: "14px", color: "var(--muted-brown)", marginTop: "4px" }}>10 minuta dok gledaš seriju. Noge 8 min, pazuhe 2 min, bikini zona 3 min.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results timeline */}
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Rezultati — sedmica po sedmicu
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                <div style={{ padding: "16px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--light-border)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "4px" }}>SEDMICA 1-2</div>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}>Dlake rastu sporije. Možeš brijati rjeđe.</p>
                </div>
                <div style={{ padding: "16px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--light-border)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "4px" }}>SEDMICA 3-4</div>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}>Primjetan pad gustine. Nema više iritacije.</p>
                </div>
                <div style={{ padding: "16px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--light-border)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "4px" }}>SEDMICA 5-6</div>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}>Bikini zona mirna. Noge glatke 10+ dana bez brijanja.</p>
                </div>
                <div style={{ padding: "16px", background: "var(--cream)", borderRadius: "12px", border: "1px solid var(--light-border)" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "4px" }}>SEDMICA 7-8</div>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}>Većina žena prestaje brijati pazuhe i bikini zonu.</p>
                </div>
              </div>
            </div>

            {/* Key benefits */}
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--rose-gold)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" }}>
                Zašto Ice Cool PRO
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}><strong>999.999 bljeskova</strong> — ne mijenjaš lampicu godinama, traje cijelu porodicu</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}><strong>Ice Cooling™ hlađenje</strong> — koža se hladi na svakom impulsu, bez peckanja i crvenila</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}><strong>Isti IPL efekat kao Philips Lumea</strong> — samo 8 puta jeftinije ({product.price} KM vs 1.200 KM)</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--rose-gold)" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  <p style={{ fontSize: "14px", color: "var(--taupe)" }}><strong>Tretman uveče kod kuće</strong> — bez zakazivanja, bez vožnje, bez neugodnih poza u salonu</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <LandingOrderForm product={product} />
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "20px 24px", borderTop: "1px solid var(--light-border)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted-brown)" }}>
          © 2026 Ice Cool PRO™ · Aurora Shop · <a href="https://aurorashop.ba/politika-privatnosti" style={{ color: "var(--rose-gold)", textDecoration: "none" }}>Politika privatnosti</a> · <a href="https://aurorashop.ba/politika-dostave" style={{ color: "var(--rose-gold)", textDecoration: "none" }}>Politika dostave</a>
        </p>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/38761904759?text=Zdravo%2C%20zanima%20me%20ICE%20COOL%20PRO%20ure%C4%91aj"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#10B981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.5)",
          zIndex: 50,
          transition: "transform 0.2s, background 0.2s",
        }}
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      </div>
    </>
  );
}
