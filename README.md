# Ice Cool PRO™ - IPL Webshop za BiH tržište

Brz, skalabilan i SEO-optimizovan webshop fokusiran na **performance marketing i visoku konverziju** za BiH tržište.

## 🎨 Dizajn

Projekat koristi **identičan dizajn sistem** kao Zerina projekat:
- **Glassmorphism** efekti sa backdrop blur
- **Bento Grid** layout
- **Soft pastel** boje (violet, rose, teal, pink)
- **Aurora** animirani background
- **Responsive** dizajn (mobile-first)

## 🚀 Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS** (v4 sa @theme inline)

### Backend
- **Node.js**
- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### Autentikacija
- **NextAuth / Auth.js** (za admin panel)

## 📦 Instalacija

```bash
# Kloniraj projekat
cd /Users/emir_mw/epilator/webshop

# Instaliraj dependencije
npm install

# Kopiraj .env.example u .env
cp .env.example .env

# Podesi DATABASE_URL u .env fajlu
# DATABASE_URL="postgresql://user:password@localhost:5432/epilator_db"

# Pokreni Prisma migracije
npx prisma migrate dev --name init

# Generiši Prisma Client
npx prisma generate

# Pokreni development server
npm run dev
```

Otvori [http://localhost:3000](http://localhost:3000) u browseru.

## 📁 Struktura Projekta

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── proizvod/[slug]/      # Product landing pages
│   ├── naruci/               # Checkout page
│   └── globals.css           # Glassmorphism design system
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── FeaturedProducts.tsx
│   ├── TestimonialsSection.tsx
│   ├── ProductLanding.tsx
│   └── CheckoutForm.tsx
└── lib/
    └── prisma.ts             # Prisma singleton

prisma/
└── schema.prisma             # Database schema
```

## 🎯 Funkcionalni Moduli

### ✅ Implementirano (MVP)

- **Homepage** sa hero sekcijom, product cards i testimonials
- **Product Landing Pages** za 3 IPL proizvoda (Ice Cool PRO™, Max, Lite)
- **Checkout Flow** sa formom za narudžbe
- **Responsive Navbar & Footer**
- **Glassmorphism Design System** (identičan Zerina projektu)
- **Prisma Database Schema** za orders, leads, products, customers

### 🔜 Za Implementaciju

- **Admin Panel** (dashboard, orders, leads, products)
- **Marketing Dashboard** (ad spend import, CPL, CPA, ROAS)
- **Label Printing** (PDF generisanje za shipping)
- **Meta Pixel & GA4** tracking
- **UTM Parameter** tracking
- **Email/SMS** notifikacije
- **Blog** za SEO content

## 🗄️ Database Schema

Prisma schema uključuje:
- `User` - admin korisnici sa role-based access
- `Product` - proizvodi sa SEO poljima
- `Order` - narudžbe sa UTM tracking
- `Lead` - leadovi iz checkout forme
- `Customer` - kupci
- `AdSpendImport` - CSV import troškova oglašavanja
- `Campaign`, `Review`, `FAQ`, `Settings`

## 🎨 Boje i Design Tokens

```css
/* Light Mode */
--color-light-background: #F7F8FA
--color-light-text: #111827
--color-light-accent: #007AFF

/* Glassmorphism */
background: rgba(255,255,255,0.30)
backdrop-filter: blur(16px)
border: 1px solid rgba(255, 255, 255, 0.3)
```

## 📄 Stranice

- `/` - Homepage
- `/proizvod/ice-cool-pro` - Ice Cool PRO™ landing page
- `/proizvod/ice-cool-pro-max` - Ice Cool PRO™ Max landing page
- `/proizvod/ice-cool-lite` - Ice Cool Lite™ landing page
- `/naruci` - Checkout page
- `/faq` - FAQ (TODO)
- `/kontakt` - Kontakt (TODO)

## 🔧 Prisma Commands

```bash
# Kreiraj novu migraciju
npx prisma migrate dev --name migration_name

# Generiši Prisma Client
npx prisma generate

# Otvori Prisma Studio (GUI za bazu)
npx prisma studio

# Reset baze (OPASNO - briše sve podatke)
npx prisma migrate reset
```

## 🚀 Deployment

### Vercel (Preporučeno)

```bash
# Instaliraj Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Environment Variables (Vercel)

Dodaj u Vercel dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret key
- `NEXTAUTH_URL` - Production URL
- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID

## 📊 SEO Strategija

### Primarni Keywords
- IPL aparat BiH
- IPL epilator
- lasersko uklanjanje dlačica kod kuće
- IPL uređaj za žene
- epilator sa hlađenjem

### On-Page SEO
- ✅ Jedinstveni title i meta description po stranici
- ✅ Semantic HTML (H1, H2, H3)
- ✅ Alt tagovi na slikama
- 🔜 Schema markup (Product, FAQPage, Review)
- 🔜 Canonical URLs
- 🔜 Sitemap.xml

## 🎯 Conversion Optimization (CRO)

- **Hero sekcija** - jasna value proposition
- **Trust badges** - besplatna dostava, povrat, garancija
- **Social proof** - testimonials sa pravim imenima
- **Urgency** - ograničena ponuda, popust
- **Sticky CTA** - "Naruči odmah" dugme
- **Jednostavan checkout** - minimalan broj polja

## 📝 TODO Lista

### Prioritet 1 (MVP)
- [ ] Zamijeniti placeholder slike sa pravim slikama proizvoda
- [ ] Kreirati API route za checkout form submission
- [ ] Implementirati email notifikacije za nove narudžbe
- [ ] Dodati Meta Pixel tracking
- [ ] Dodati Google Analytics

### Prioritet 2 (Admin Panel)
- [ ] Admin login stranica
- [ ] Dashboard sa KPI metrikama
- [ ] Orders management
- [ ] Leads management
- [ ] CSV import za ad spend

### Prioritet 3 (Marketing)
- [ ] Blog sistem za SEO content
- [ ] FAQ stranica
- [ ] Politika dostave, povrata, privatnosti
- [ ] Kontakt forma

## 🎨 Zamjena Slika

Trenutno se koriste placeholder slike. Za zamjenu:

1. Dodaj prave slike u `/public/products/`
2. Update paths u:
   - `src/components/FeaturedProducts.tsx`
   - `src/components/ProductLanding.tsx`

## 📞 Podrška

Za pitanja i pomoć kontaktirajte:
- Email: info@icecoolpro.ba
- Telefon: +387 XX XXX XXX

## 📄 Licenca

Sva prava zadržana © 2025 Ice Cool PRO™
