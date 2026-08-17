"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { StorefrontProduct } from "@/lib/storefront-products";
import LandingOrderForm from "@/components/LandingOrderForm";

interface IceCoolProMaxLandingProps {
  product: StorefrontProduct;
}

const PRODUCT_IMAGES = [
  "/slike/ELITE/cover.png",
  "/slike/intimnost-product.png",
  "/slike/ELITE/koristenje1.png",
  "/slike/ELITE/koristenje2.png",
];

export default function IceCoolProMaxLanding({ product }: IceCoolProMaxLandingProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --bg: #fff8f6;
          --soft: #fdecea;
          --soft-2: #f8dedb;
          --text: #241816;
          --muted: #705d59;
          --accent: #d96b68;
          --accent-dark: #b94f4c;
          --white: #ffffff;
          --border: #ead1cd;
          --green: #4f8a6a;
          --shadow: 0 18px 50px rgba(80, 35, 30, 0.12);
          --radius: 28px;
          --max: 1160px;
        }

        .icpm-wrapper * {
          box-sizing: border-box;
        }

        .icpm-wrapper {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.55;
        }

        .icpm-wrapper img {
          max-width: 100%;
          display: block;
        }

        .icpm-wrapper a {
          text-decoration: none;
          color: inherit;
        }

        .icpm-container {
          width: min(var(--max), calc(100% - 36px));
          margin: 0 auto;
        }

        .icpm-top-bar {
          background: #241816;
          color: #fff;
          text-align: center;
          padding: 10px 16px;
          font-size: 14px;
        }

        .icpm-nav {
          padding: 20px 0;
          background: rgba(255, 248, 246, 0.9);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 20;
          border-bottom: 1px solid rgba(234, 209, 205, 0.7);
        }

        .icpm-nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }

        .icpm-brand {
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.03em;
        }

        .icpm-brand span {
          color: var(--accent);
        }

        .icpm-nav-links {
          display: flex;
          gap: 22px;
          font-size: 14px;
          color: var(--muted);
        }

        .icpm-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--accent);
          color: white;
          border-radius: 999px;
          padding: 15px 26px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(217, 107, 104, 0.28);
          transition: 0.2s ease;
        }

        .icpm-btn:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
        }

        .icpm-btn.secondary {
          background: white;
          color: var(--text);
          border: 1px solid var(--border);
          box-shadow: none;
        }

        .icpm-hero {
          padding: 70px 0 54px;
          overflow: hidden;
        }

        .icpm-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          align-items: center;
        }

        .icpm-eyebrow {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          background: var(--soft);
          color: var(--accent-dark);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .icpm-wrapper h1 {
          font-size: clamp(42px, 6vw, 72px);
          line-height: 0.95;
          letter-spacing: -0.07em;
          margin: 0 0 22px;
        }

        .icpm-hero p {
          font-size: 20px;
          color: var(--muted);
          max-width: 620px;
          margin: 0 0 28px;
        }

        .icpm-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          margin-bottom: 22px;
        }

        .icpm-mini-proof {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          color: var(--muted);
          font-size: 14px;
        }

        .icpm-mini-proof span {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 12px;
        }

        .icpm-hero-card {
          position: relative;
          background: linear-gradient(145deg, #fff, #fbe4e1);
          border-radius: 42px;
          box-shadow: var(--shadow);
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .icpm-product-media {
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), transparent 30%),
            linear-gradient(160deg, #f8c8c5, #fff7f5);
          border-radius: 34px;
          aspect-ratio: 9 / 16;
          max-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--muted);
          overflow: hidden;
          position: relative;
        }

        .icpm-floating-note {
          background: rgba(255,255,255,0.88);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 16px;
          box-shadow: 0 16px 34px rgba(80, 35, 30, 0.1);
          margin-top: 18px;
          font-size: 15px;
        }

        .icpm-price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 18px;
          background: #241816;
          color: white;
          border-radius: 24px;
          padding: 18px;
        }

        .icpm-price {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .icpm-section {
          padding: 72px 0;
        }

        .icpm-section-head {
          max-width: 760px;
          margin-bottom: 38px;
        }

        .icpm-section-head.center {
          text-align: center;
          margin: 0 auto 44px;
        }

        .icpm-wrapper h2 {
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.02;
          letter-spacing: -0.055em;
          margin: 0 0 16px;
        }

        .icpm-section-head p {
          font-size: 18px;
          color: var(--muted);
          margin: 0;
        }

        .icpm-pain {
          background: white;
        }

        .icpm-pain-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .icpm-pain-card,
        .icpm-feature-card,
        .icpm-proof-card,
        .icpm-faq-item {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 26px;
          box-shadow: 0 10px 30px rgba(80, 35, 30, 0.05);
        }

        .icpm-pain-card {
          background: #fff8f6;
        }

        .icpm-pain-card .num {
          width: 42px;
          height: 42px;
          background: var(--soft);
          color: var(--accent-dark);
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 900;
          margin-bottom: 18px;
        }

        .icpm-pain-card h3,
        .icpm-feature-card h3,
        .icpm-proof-card h3 {
          font-size: 22px;
          line-height: 1.15;
          margin: 0 0 12px;
          letter-spacing: -0.03em;
        }

        .icpm-pain-card p,
        .icpm-feature-card p,
        .icpm-proof-card p,
        .icpm-faq-item p {
          color: var(--muted);
          margin: 0;
        }

        .icpm-quote-section {
          background: #241816;
          color: white;
          padding: 86px 0;
        }

        .icpm-quote-box {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .icpm-quote-box h2 {
          color: white;
          font-size: clamp(36px, 5vw, 64px);
        }

        .icpm-quote-box p {
          color: rgba(255,255,255,0.74);
          font-size: 20px;
          margin: 0 auto 28px;
          max-width: 700px;
        }

        .icpm-scenario-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .icpm-scenario {
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 20px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .icpm-check {
          width: 28px;
          height: 28px;
          background: var(--soft);
          color: var(--accent-dark);
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          font-weight: 900;
        }

        .icpm-solution {
          background: linear-gradient(180deg, var(--bg), #fff);
        }

        .icpm-solution-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 36px;
          align-items: center;
        }

        .icpm-device-box {
          background: var(--soft);
          border-radius: 38px;
          display: flex;
          flex-direction: column;
          text-align: center;
          color: var(--muted);
          padding: 20px;
          overflow: hidden;
          position: relative;
        }

        .icpm-gallery {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
        }

        .icpm-gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .icpm-gallery-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.05);
        }

        .icpm-gallery-nav.prev {
          left: 10px;
        }

        .icpm-gallery-nav.next {
          right: 10px;
        }

        .icpm-gallery-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .icpm-gallery-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icpm-gallery-dot.active {
          background: var(--accent);
          transform: scale(1.2);
        }

        .icpm-gallery-dot:hover {
          background: var(--accent-dark);
        }

        .icpm-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .icpm-comparison {
          background: white;
        }

        .icpm-compare-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .icpm-compare-card {
          border-radius: 32px;
          padding: 30px;
          border: 1px solid var(--border);
        }

        .icpm-compare-card.before {
          background: #fff8f6;
        }

        .icpm-compare-card.after {
          background: #f4fbf7;
          border-color: #cbe6d7;
        }

        .icpm-compare-card h3 {
          font-size: 26px;
          letter-spacing: -0.04em;
          margin: 0 0 18px;
        }

        .icpm-compare-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 14px;
          color: var(--muted);
        }

        .icpm-compare-card li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .icpm-offer {
          background: linear-gradient(145deg, #241816, #4b2925);
          color: white;
        }

        .icpm-offer-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          gap: 36px;
          align-items: center;
        }

        .icpm-offer h2 {
          color: white;
        }

        .icpm-offer p {
          color: rgba(255,255,255,0.74);
          font-size: 18px;
        }

        .icpm-faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .icpm-faq-item h3 {
          margin: 0 0 10px;
          font-size: 19px;
          letter-spacing: -0.02em;
        }

        .icpm-final-cta {
          text-align: center;
          padding: 90px 0;
          background: var(--soft);
        }

        .icpm-final-cta h2 {
          max-width: 820px;
          margin: 0 auto 18px;
        }

        .icpm-final-cta p {
          max-width: 680px;
          margin: 0 auto 28px;
          color: var(--muted);
          font-size: 18px;
        }

        .icpm-footer {
          padding: 32px 0;
          background: #241816;
          color: rgba(255,255,255,0.65);
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .icpm-hero-grid,
          .icpm-solution-grid,
          .icpm-offer-grid,
          .icpm-compare-grid {
            grid-template-columns: 1fr;
          }

          .icpm-pain-grid,
          .icpm-feature-grid,
          .icpm-scenario-list,
          .icpm-faq-grid {
            grid-template-columns: 1fr;
          }

          .icpm-nav-links {
            display: none;
          }

          .icpm-hero {
            padding: 32px 0 40px;
          }

          .icpm-hero-grid {
            gap: 28px;
          }

          .icpm-wrapper h1 {
            font-size: 36px;
            letter-spacing: -0.04em;
          }

          .icpm-hero p {
            font-size: 17px;
          }

          .icpm-eyebrow {
            font-size: 12px;
            padding: 6px 12px;
          }

          .icpm-hero-actions {
            flex-direction: column;
            gap: 12px;
          }

          .icpm-hero-actions .icpm-btn {
            width: 100%;
            justify-content: center;
          }

          .icpm-mini-proof {
            justify-content: center;
          }

          .icpm-mini-proof span {
            font-size: 12px;
            padding: 6px 10px;
          }

          .icpm-hero-card {
            padding: 16px;
            border-radius: 28px;
          }

          .icpm-product-media {
            aspect-ratio: 9 / 16;
            max-height: 400px;
            border-radius: 20px;
          }

          .icpm-floating-note {
            font-size: 14px;
            padding: 14px;
            border-radius: 18px;
            margin-top: 14px;
          }

          .icpm-price-box {
            padding: 14px;
            border-radius: 18px;
            margin-top: 14px;
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

          .icpm-price {
            font-size: 28px;
          }

          .icpm-price-box .icpm-btn {
            width: 100%;
          }

          .icpm-section {
            padding: 48px 0;
          }

          .icpm-wrapper h2 {
            font-size: 28px;
            letter-spacing: -0.03em;
          }

          .icpm-section-head p {
            font-size: 16px;
          }

          .icpm-pain-card,
          .icpm-feature-card,
          .icpm-proof-card,
          .icpm-faq-item {
            padding: 20px;
            border-radius: 20px;
          }

          .icpm-pain-card h3,
          .icpm-feature-card h3,
          .icpm-proof-card h3 {
            font-size: 18px;
          }

          .icpm-pain-card p,
          .icpm-feature-card p,
          .icpm-proof-card p,
          .icpm-faq-item p {
            font-size: 14px;
          }

          .icpm-quote-section {
            padding: 56px 0;
          }

          .icpm-quote-box h2 {
            font-size: 28px;
          }

          .icpm-quote-box p {
            font-size: 16px;
          }

          .icpm-scenario {
            padding: 16px;
            border-radius: 18px;
            font-size: 15px;
          }

          .icpm-check {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }

          .icpm-device-box {
            border-radius: 24px;
            padding: 16px;
          }

          .icpm-gallery {
            aspect-ratio: 4 / 3;
          }

          .icpm-gallery-nav {
            width: 36px;
            height: 36px;
          }

          .icpm-gallery-nav.prev {
            left: 6px;
          }

          .icpm-gallery-nav.next {
            right: 6px;
          }

          .icpm-gallery-dots {
            margin-top: 12px;
            gap: 6px;
          }

          .icpm-gallery-dot {
            width: 8px;
            height: 8px;
          }

          .icpm-compare-card {
            padding: 24px;
            border-radius: 24px;
          }

          .icpm-compare-card h3 {
            font-size: 22px;
          }

          .icpm-compare-card li {
            font-size: 14px;
          }

          .icpm-faq-item h3 {
            font-size: 17px;
          }

          .icpm-final-cta {
            padding: 56px 0;
          }

          .icpm-final-cta h2 {
            font-size: 26px;
          }

          .icpm-final-cta p {
            font-size: 16px;
          }

          .icpm-btn {
            padding: 14px 22px;
            font-size: 15px;
          }

          .icpm-top-bar {
            font-size: 12px;
            padding: 8px 12px;
          }

          .icpm-nav {
            padding: 14px 0;
          }

          .icpm-container {
            width: calc(100% - 24px);
          }
        }

        @media (max-width: 480px) {
          .icpm-wrapper h1 {
            font-size: 30px;
          }

          .icpm-wrapper h2 {
            font-size: 24px;
          }

          .icpm-product-media {
            max-height: 360px;
          }

          .icpm-hero p {
            font-size: 16px;
          }

          .icpm-section {
            padding: 40px 0;
          }

          .icpm-pain-card .num {
            width: 36px;
            height: 36px;
            font-size: 14px;
          }
        }
      `}} />

      <div className="icpm-wrapper">

        <div className="icpm-top-bar">
          Ice Cool Pro Max IPL uređaj — tretman kod kuće, bez salona i bez stalnog brijanja
        </div>

        <nav className="icpm-nav">
          <div className="icpm-container icpm-nav-inner">
            <Link href="/" className="icpm-brand">
              <Image
                src="/slike/Black White Minimal Modern Simple Bold Business Mag Logo.png"
                alt="Ice Cool Pro Max"
                width={70}
                height={70}
                className="rounded-xl"
              />
            </Link>

            <div className="icpm-nav-links">
              <a href="#problem">Problem</a>
              <a href="#rjesenje">Rješenje</a>
              <a href="#cijena">Cijena</a>
              <a href="#faq">FAQ</a>
            </div>

            <a href="#cijena" className="icpm-btn">Naruči za {product.price} KM</a>
          </div>
        </nav>

        <header className="icpm-hero">
          <div className="icpm-container icpm-hero-grid">

            <div>
              <div className="icpm-eyebrow">Za žene koje žele manje brijanja i više spontanosti</div>

              <h1>Intimnost ne bi trebala čekati da se koža smiri.</h1>

              <p>
                Ako ti se desilo da izbjegavaš dodir jer ti je koža crvena, osjetljiva
                ili puna sitnih tačkica nakon brijanja — znaš da problem nisu samo dlačice.
                Problem je osjećaj da nikad nisi potpuno spremna.
              </p>

              <div className="icpm-hero-actions">
                <a href="#cijena" className="icpm-btn">Naruči Ice Cool Pro Max</a>
                <a href="#problem" className="icpm-btn secondary">Vidi kako radi</a>
              </div>

              <div className="icpm-mini-proof">
                <span>IPL tretman kod kuće</span>
                <span>Bez voska i čupanja</span>
                <span>Za bikini zonu, noge, ruke i pazuhe</span>
              </div>
            </div>

            <div className="icpm-hero-card">
              <div className="icpm-product-media">
                <Image
                  src="/slike/intimnost-hero.png"
                  alt="Ice Cool Pro Max IPL uređaj"
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "24px",
                  }}
                  priority
                />
              </div>

              <div className="icpm-floating-note">
                <strong>Ne prodajemo &quot;premium uređaj&quot;.</strong><br/>
                Prodajemo trenutak kad se ne moraš pitati: &quot;Jesam li se obrijala? Da li se vidi crvenilo? Hoće li me peći ako me dodirne?&quot;
              </div>

              <div className="icpm-price-box">
                <div>
                  <small>Cijena uređaja</small>
                  <div className="icpm-price">{product.price} KM</div>
                </div>
                <a href="#cijena" className="icpm-btn">Naruči</a>
              </div>
            </div>

          </div>
        </header>

        <section className="icpm-section icpm-pain" id="problem">
          <div className="icpm-container">
            <div className="icpm-section-head">
              <h2>Nije najgore ukloniti dlačice. Najgore je ono poslije.</h2>
              <p>
                Brijanje i depilacija često riješe jedan problem, ali odmah naprave drugi:
                crvenilo, osjetljivost, peckanje, urasle dlačice i osjećaj da koža izgleda gore nego prije.
              </p>
            </div>

            <div className="icpm-pain-grid">
              <div className="icpm-pain-card">
                <div className="num">1</div>
                <h3>Koža je &quot;sređena&quot;, ali nije opuštena.</h3>
                <p>
                  Obavila si brijanje ili salon, ali zona ostane toliko osjetljiva da dodir ne prija.
                </p>
              </div>

              <div className="icpm-pain-card">
                <div className="num">2</div>
                <h3>Izgleda uredno samo jedan trenutak.</h3>
                <p>
                  Dan poslije već osjetiš sitne dlačice, tačkice ili hrapavost pod rukom.
                </p>
              </div>

              <div className="icpm-pain-card">
                <div className="num">3</div>
                <h3>Spontanost nestane.</h3>
                <p>
                  Umjesto da uživaš u trenutku, prvo razmišljaš kada si se zadnji put obrijala.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="icpm-quote-section">
          <div className="icpm-container icpm-quote-box">
            <h2>Želiš da budeš opuštena kad se skineš — ne da prvo provjeravaš kožu.</h2>
            <p>
              Nije poenta samo u glatkoj koži. Poenta je u osjećaju da ne moraš planirati dodir,
              izlazak, veš ili intimnost oko brijača, salona i iritacije.
            </p>
            <a href="#cijena" className="icpm-btn">Želim svoju rutinu kod kuće</a>
          </div>
        </section>

        <section className="icpm-section">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <h2>Znaš da ti treba drugačije rješenje kad...</h2>
              <p>
                Ovo nisu &quot;velike marketinške tvrdnje&quot;. Ovo su stvarni trenuci zbog kojih žene traže bolju rutinu.
              </p>
            </div>

            <div className="icpm-scenario-list">
              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Obriješ se navečer, a sutra već osjetiš sitne dlačice pod rukom.</div>
              </div>

              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Nakon salona izgledaš crvenije i iziritiranije nego prije tretmana.</div>
              </div>

              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Izbjegneš dodir jer te strah da će peći ili da će partner primijetiti iritaciju.</div>
              </div>

              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Prije intimnosti prvo razmišljaš: &quot;Jesam li glatka?&quot;</div>
              </div>

              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Biraš veš prema tome šta će sakriti, a ne prema tome šta ti se nosi.</div>
              </div>

              <div className="icpm-scenario">
                <div className="icpm-check">✓</div>
                <div>Imaš osjećaj da zona nije njegovana, iako si se tuširala i sve uradila &quot;kako treba&quot;.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="icpm-section icpm-solution" id="rjesenje">
          <div className="icpm-container icpm-solution-grid">

            <div className="icpm-device-box">
              <div className="icpm-gallery">
                <Image
                  src={PRODUCT_IMAGES[currentImageIndex]}
                  alt={`Ice Cool Pro Max uređaj - slika ${currentImageIndex + 1}`}
                  fill
                  style={{
                    objectFit: "contain",
                    borderRadius: "20px",
                  }}
                />

                <button
                  className="icpm-gallery-nav prev"
                  onClick={prevImage}
                  aria-label="Prethodna slika"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  className="icpm-gallery-nav next"
                  onClick={nextImage}
                  aria-label="Sljedeća slika"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <div className="icpm-gallery-dots">
                {PRODUCT_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    className={`icpm-gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Idi na sliku ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="icpm-eyebrow">Rješenje</div>
              <h2>Ice Cool Pro Max mijenja rutinu — ne preko noći, nego postepeno.</h2>

              <p style={{ color: "var(--muted)", fontSize: "18px" }}>
                IPL tehnologija koristi svjetlosne impulse koji ciljaju korijen dlačice i vremenom
                pomažu da rast bude sporiji i rjeđi. To znači manje stalnog brijanja, manje borbe
                s iritacijom i više osjećaja da je koža pod tvojom kontrolom.
              </p>

              <div className="icpm-feature-grid" style={{ marginTop: "24px" }}>
                <div className="icpm-feature-card">
                  <h3>Bez čupanja</h3>
                  <p>Nema voska, traka i onog osjećaja da koža &quot;gori&quot; poslije tretmana.</p>
                </div>

                <div className="icpm-feature-card">
                  <h3>Kod kuće</h3>
                  <p>Nema zakazivanja salona, čekanja termina i skidanja pred nepoznatom osobom.</p>
                </div>

                <div className="icpm-feature-card">
                  <h3>Ice Cool osjećaj</h3>
                  <p>Funkcija hlađenja pomaže da tretman bude prijatniji na osjetljivijim zonama.</p>
                </div>

                <div className="icpm-feature-card">
                  <h3>Postepena rutina</h3>
                  <p>Koristiš ga redovno i vremenom smanjuješ potrebu za stalnim brijanjem.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="icpm-section">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <h2>Neke tretmane jednostavno želiš raditi sama.</h2>
              <p>
                Posebno kada su u pitanju osjetljive zone. Privatnost nije luksuz — to je razlog zašto kućni IPL ima smisla.
              </p>
            </div>

            <div className="icpm-proof-card" style={{ maxWidth: "850px", margin: "0 auto", textAlign: "center" }}>
              <h3>Ne moraš zakazivati termin. Ne moraš se skidati u salonu. Ne moraš objašnjavati šta želiš tretirati.</h3>
              <p>
                Uradiš tretman kod kuće, kad si spremna, u prostoru gdje ti je najugodnije.
                Bez žurbe, bez neugodnosti i bez osjećaja da moraš planirati cijeli dan oko depilacije.
              </p>
            </div>
          </div>
        </section>

        <section className="icpm-section icpm-comparison">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <h2>Prije: brijač svaka 2–3 dana. Poslije: rutina koju kontrolišeš ti.</h2>
            </div>

            <div className="icpm-compare-grid">
              <div className="icpm-compare-card before">
                <h3>Prije Ice Cool Pro Max</h3>
                <ul>
                  <li>✕ Brijanje u žurbi prije izlaska</li>
                  <li>✕ Crvenilo poslije žileta</li>
                  <li>✕ Urasle dlačice i sitne tačkice</li>
                  <li>✕ Planiranje oko salona</li>
                  <li>✕ Osjećaj nelagode kod dodira</li>
                </ul>
              </div>

              <div className="icpm-compare-card after">
                <h3>Uz Ice Cool Pro Max</h3>
                <ul>
                  <li>✓ Tretman kod kuće</li>
                  <li>✓ Bez voska i čupanja</li>
                  <li>✓ Manje potrebe za stalnim brijanjem</li>
                  <li>✓ Više privatnosti</li>
                  <li>✓ Postepeno jednostavnija rutina</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="icpm-section">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <h2>Razlika koju prvo primijetiš nije uvijek u ogledalu.</h2>
              <p>
                Prvo primijetiš da se ne briješ toliko često. Onda primijetiš da ne razmišljaš o koži prije svakog izlaska.
                A onda dođe onaj trenutak kad shvatiš da si opuštenija kada te partner dodirne.
              </p>
            </div>
          </div>
        </section>

        <section className="icpm-section" id="cijena">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <div className="icpm-eyebrow" style={{ background: "rgba(217, 107, 104, 0.1)", marginBottom: "16px" }}>Ponuda</div>
              <h2>Jedan uređaj. Tvoja rutina. Kod kuće.</h2>
              <p>
                Umjesto da stalno plaćaš termine, čekaš salon i ponavljaš isti ciklus iritacije,
                Ice Cool Pro Max ostaje kod tebe i koristiš ga kad god ti odgovara.
              </p>
            </div>

            <LandingOrderForm product={product} />
          </div>
        </section>

        <section className="icpm-section" id="faq">
          <div className="icpm-container">
            <div className="icpm-section-head center">
              <h2>Najčešća pitanja</h2>
            </div>

            <div className="icpm-faq-grid">

              <div className="icpm-faq-item">
                <h3>Da li se može koristiti na intimnoj zoni?</h3>
                <p>
                  Može se koristiti na bikini zoni, uz pažljivo praćenje uputstva. Ne koristi se direktno na sluznici,
                  povrijeđenoj, iziritiranoj ili tamno pigmentisanoj koži.
                </p>
              </div>

              <div className="icpm-faq-item">
                <h3>Da li boli?</h3>
                <p>
                  IPL nije isto što i vosak jer ne čupa dlačice iz korijena. Osjećaj zavisi od osjetljivosti kože,
                  a Ice Cool funkcija pomaže da tretman bude prijatniji.
                </p>
              </div>

              <div className="icpm-faq-item">
                <h3>Kada se vide rezultati?</h3>
                <p>
                  Rezultati nisu trenutni. Cilj IPL tretmana je postepeno smanjenje rasta dlačica kroz redovno korištenje.
                </p>
              </div>

              <div className="icpm-faq-item">
                <h3>Da li potpuno uklanja dlačice zauvijek?</h3>
                <p>
                  IPL pomaže da dlačice rastu sporije i rjeđe, ali rezultati zavise od tipa kože, boje dlačica,
                  redovnosti korištenja i hormonskih faktora.
                </p>
              </div>

              <div className="icpm-faq-item">
                <h3>Ko ne bi trebao koristiti IPL?</h3>
                <p>
                  Trudnice, osobe s određenim kožnim stanjima, osobe koje koriste lijekove koji povećavaju osjetljivost
                  na svjetlo i osobe s vrlo tamnom kožom trebaju se prije korištenja posavjetovati s ljekarom.
                </p>
              </div>

              <div className="icpm-faq-item">
                <h3>Na kojim dlačicama najbolje djeluje?</h3>
                <p>
                  IPL obično najbolje djeluje na tamnije dlačice i svjetliju do srednje tamnu kožu. Na vrlo svijetlim,
                  sijedim ili crvenim dlačicama rezultati mogu biti slabiji.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="icpm-final-cta">
          <div className="icpm-container">
            <h2>Prestani planirati dodire oko brijača, salona i iritacije.</h2>
            <p>
              Ice Cool Pro Max ti daje privatniju, jednostavniju i dugoročno praktičniju rutinu za uklanjanje dlačica kod kuće.
            </p>
            <a href="#cijena" className="icpm-btn">Naruči Ice Cool Pro Max za {product.price} KM</a>
          </div>
        </section>

        <footer className="icpm-footer">
          <div className="icpm-container">
            © Ice Cool Pro Max. Informacije na stranici ne zamjenjuju medicinski savjet. Prije korištenja obavezno pročitati uputstvo.
            <br/><br/>
            <a href="https://aurorashop.ba/politika-privatnosti" style={{ color: "var(--accent)", marginRight: "16px" }}>Politika privatnosti</a>
            <a href="https://aurorashop.ba/politika-dostave" style={{ color: "var(--accent)" }}>Politika dostave</a>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/38761904759?text=Zdravo%2C%20zanima%20me%20Ice%20Cool%20Pro%20Max%20ure%C4%91aj"
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
