# Setup Instrukcije

## ✅ Šta je urađeno

1. ✅ Next.js projekat kreiran
2. ✅ Dizajn sistem kopiran iz Zerina (glassmorphism)
3. ✅ Homepage, Product pages, Checkout kreiran
4. ✅ Prisma schema definisan
5. ✅ `.env` fajl kreiran sa Neon bazom

## 🔧 Sledeći koraci

### 1. Pokreni Prisma migracije

Kada bude dostupna internet konekcija ili Neon baza:

```bash
cd /Users/emir_mw/epilator/webshop
npx prisma migrate dev --name init
```

Ova komanda će:
- Kreirati tabele u Neon bazi
- Generisati Prisma Client

### 2. Testiranje

```bash
npm run dev
```

Otvori http://localhost:3000

### 3. Dodaj prave slike

Zamijeni placeholder slike u:
- `/public/products/ice-cool-pro.jpg`
- `/public/products/ice-cool-pro-max.jpg`
- `/public/products/ice-cool-lite.jpg`

Ili update URLs u:
- `src/components/FeaturedProducts.tsx`
- `src/components/ProductLanding.tsx`

## 🗄️ Database Schema

Prisma schema sadrži sve potrebne tabele:
- **User** - admin korisnici
- **Product** - proizvodi sa SEO
- **Order** - narudžbe sa UTM tracking
- **Lead** - leadovi iz forme
- **Customer** - kupci
- **AdSpendImport** - CSV import ad spend
- **Campaign**, **Review**, **FAQ**, **Settings**

## 📝 Napomene

- Neon baza trenutno nije dostupna (network issue)
- Migracije će se pokrenuti kada bude konekcija
- Aplikacija radi bez baze (frontend only)
- Za production dodaj Meta Pixel i GA4 IDs u `.env`

## 🚀 Production Deploy

```bash
# Vercel deploy
vercel

# Dodaj environment variables u Vercel dashboard:
# - DATABASE_URL
# - NEXTAUTH_SECRET
# - NEXTAUTH_URL
```
