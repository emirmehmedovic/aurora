"use client";

import Link from "next/link";
import type { StorefrontProduct } from "@/lib/storefront-products";
import LandingOrderForm from "@/components/LandingOrderForm";

interface SpontanostLandingProps {
  product: StorefrontProduct;
}

export default function SpontanostLanding({ product }: SpontanostLandingProps) {
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

        .spontanost-wrapper {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--cream);
          color: var(--taupe);
          line-height: 1.7;
        }

        .section-header {
          font-size: 2.2rem;
          line-height: 1.1;
          font-weight: 700;
          color: var(--taupe);
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

        .gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--soft-gold), var(--soft-gold), transparent);
          opacity: 0.45;
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

        .spontanost-nav {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--light-border);
        }

        @media (max-width: 768px) {
          .spontanost-problem-grid {
            grid-template-columns: 1fr !important;
          }
          .section-header {
            font-size: 1.75rem !important;
          }
        }
      `}} />
      <div className="spontanost-wrapper min-h-screen">

      {/* Navigation */}
      <nav className="spontanost-nav sticky top-0 z-50">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{
              width: "36px",
              height: "36px",
              background: "var(--rose-gold)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: "bold", fontSize: "20px", letterSpacing: "-1px" }}>A</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: "24px", letterSpacing: "-0.5px", color: "var(--taupe)" }}>Aurora Shop</span>
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
      <section style={{ background: "linear-gradient(to bottom, var(--cream), var(--warm-beige))", paddingTop: "56px", paddingBottom: "64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "white",
              padding: "6px 16px",
              borderRadius: "24px",
              border: "1px solid var(--light-border)",
              marginBottom: "24px",
            }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--rose-gold)" }}>Preko 300 žena iz BiH već koristi</span>
            </div>

            <h1 style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-1.8px",
              fontWeight: 700,
              color: "var(--taupe)",
              marginBottom: "24px",
            }}>
              Kad skineš veš,<br/>prvo što primijetiš su<br/>urasle dlačice i crvenilo.
            </h1>

            <p style={{
              fontSize: "20px",
              color: "var(--muted-brown)",
              marginBottom: "32px",
              maxWidth: "480px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}>
              I odmah ti padne raspoloženje — iako si se tuširala.<br/>
              Imaš osjećaj da zona nije glatka i uredna.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
              <a href="#naruci" className="cta-button" style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "16px 36px",
                borderRadius: "24px",
                fontSize: "18px",
                fontWeight: 600,
                textDecoration: "none",
              }}>
                <span>Želim da se osjećam uredno — Naruči za {product.price} KM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto", textAlign: "center", marginBottom: "40px" }}>
          <span style={{ color: "var(--rose-gold)", fontSize: "14px", fontWeight: 600, letterSpacing: "1px" }}>OVO JE REALNOST</span>
          <h2 className="section-header" style={{ marginTop: "12px" }}>
            Ne možeš biti spontana.<br/>I uvijek imaš osjećaj da zona nije uredna.
          </h2>
        </div>

        <div className="spontanost-problem-grid" style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="premium-card" style={{ borderRadius: "24px", padding: "32px" }}>
            <h3 style={{ fontWeight: 600, fontSize: "20px", marginBottom: "16px", color: "var(--taupe)" }}>Kad skineš veš...</h3>
            <p style={{ color: "var(--muted-brown)", lineHeight: 1.7 }}>
              Prvo što primijetiš su urasle dlačice i crvenilo. I odmah ti padne raspoloženje — iako si se tuširala.
              Imaš osjećaj da zona nije glatka i uredna, čak i kada nisi depilirala.
            </p>
          </div>

          <div className="premium-card" style={{ borderRadius: "24px", padding: "32px" }}>
            <h3 style={{ fontWeight: 600, fontSize: "20px", marginBottom: "16px", color: "var(--taupe)" }}>Ne možeš biti spontana</h3>
            <p style={{ color: "var(--muted-brown)", lineHeight: 1.7 }}>
              Moraš planirati intimnost oko termina u salonu. A kad dođe trenutak, ipak se osjećaš napeto jer zona nije
              glatka i njegovana kako bi željela.
            </p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}><div className="gold-line"></div></div>

      {/* Emotional Impact Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div className="premium-card" style={{ borderRadius: "24px", padding: "36px" }}>
            <h3 style={{ fontWeight: 600, fontSize: "24px", marginBottom: "24px", textAlign: "center", color: "var(--taupe)" }}>Zbog čega to najviše boli?</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--muted-brown)" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ color: "var(--rose-gold)", marginTop: "4px", fontWeight: 600 }}>→</div>
                <p><strong style={{ color: "var(--taupe)" }}>Osjećaš se neuredno</strong> — iako si se tuširala, zona ti djeluje neuredno i zapušteno.</p>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ color: "var(--rose-gold)", marginTop: "4px", fontWeight: 600 }}>→</div>
                <p><strong style={{ color: "var(--taupe)" }}>Gubiš spontanost</strong> — moraš planirati intimnost oko salona, umjesto da uživaš kad god želiš.</p>
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ color: "var(--rose-gold)", marginTop: "4px", fontWeight: 600 }}>→</div>
                <p><strong style={{ color: "var(--taupe)" }}>Padne ti raspoloženje</strong> — kad vidiš urasle dlačice i crvenilo, odmah ti se pokvari osjećaj.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}><div className="gold-line"></div></div>

      {/* Testimonial Section */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ color: "var(--rose-gold)", fontSize: "14px", fontWeight: 600, letterSpacing: "1px" }}>KADA ON PRIMIJETI PRIJE TEBE</span>
          </div>

          <div className="premium-card" style={{ borderRadius: "24px", padding: "36px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", lineHeight: 1.7, fontStyle: "italic", color: "var(--taupe)" }}>
              „Četvrta sedmica — muž je primijetio prije mene. Nisam ni govorila da koristim nešto novo.
              On je samo rekao da mi koža izgleda drugačije. Tada sam shvatila kolika je razlika."
            </p>
            <p style={{ marginTop: "20px", fontSize: "14px", fontWeight: 500, color: "var(--rose-gold)" }}>— jedna od naših korisnica</p>
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="naruci" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 64px" }}>
        <LandingOrderForm product={product} />
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "20px 24px", borderTop: "1px solid var(--light-border)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted-brown)" }}>
          © 2026 Ice Cool PRO™ · Aurora Shop · <a href="https://aurorashop.ba/politika-privatnosti" style={{ color: "var(--rose-gold)", textDecoration: "none" }}>Politika privatnosti</a> · <a href="https://aurorashop.ba/politika-povrata" style={{ color: "var(--rose-gold)", textDecoration: "none" }}>Politika povrata</a>
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
