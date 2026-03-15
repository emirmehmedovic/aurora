# Tracking & Analytics — Ice Cool PRO™ Webshop

## Pregled

Ovaj dokument opisuje sve implementirane sisteme za praćenje metrika, analitiku i konverzije na webshop-u.

---

## 1. Integrirani servisi

### Google Analytics 4 (GA4)
- **ENV varijabla:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Lokacija:** `src/app/layout.tsx`
- **Aktivacija:** Automatska nakon dodavanja Measurement ID-a u `.env`
- **Prati:** PageView, sve custom evente (scroll, CTA, form, purchase)

### Meta Pixel (Facebook/Instagram Ads)
- **ENV varijabla:** `NEXT_PUBLIC_META_PIXEL_ID`
- **Lokacija:** `src/app/layout.tsx`
- **Aktivacija:** Automatska nakon dodavanja Pixel ID-a u `.env`
- **Standard eventi:** PageView, AddToCart, ViewContent, InitiateCheckout, Purchase, Lead
- **Custom eventi:** ScrollDepth, CtaClick, FormStart, FormAbandon, Contact

### Microsoft Clarity (Heatmaps & Session Recordings)
- **ENV varijabla:** `NEXT_PUBLIC_CLARITY_ID`
- **Lokacija:** `src/app/layout.tsx`
- **Aktivacija:** Automatska nakon dodavanja Clarity ID-a u `.env`
- **Besplatno:** https://clarity.microsoft.com — registruj se, dodaj sajt, kopiraj ID
- **Pruža:** Heatmaps, session recordings, dead click detection, rage click detection, scroll depth vizualizacija

### TikTok Pixel
- **ENV varijabla:** `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- **Lokacija:** `src/app/layout.tsx`
- **Aktivacija:** Automatska nakon dodavanja Pixel ID-a u `.env`

---

## 2. Custom Eventi (GA4 + Meta Pixel)

Svi eventi su definirani u `src/lib/analytics.ts` i šalju se paralelno na GA4 i Meta Pixel.

### E-commerce eventi

| Event | Kad se okida | Parametri |
|-------|-------------|-----------|
| `view_item` / `ViewContent` | Pregled proizvoda | product name, id, price |
| `add_to_cart` / `AddToCart` | Dodavanje u korpu | product name, id, price |
| `begin_checkout` / `InitiateCheckout` | Početak checkout-a | value |
| `purchase` / `Purchase` | Uspješna narudžba | orderId, value, items |
| `generate_lead` / `Lead` | Kreiran lead | leadId |

### Engagement eventi

| Event | Kad se okida | Parametri |
|-------|-------------|-----------|
| `scroll_depth` / `ScrollDepth` | Korisnik skroluje 25%, 50%, 75%, 90%, 100% | page, depth_percentage |
| `cta_click` / `CtaClick` | Klik na CTA dugme | ctaName, ctaLocation, page |
| `form_start` / `FormStart` | Korisnik počne popunjavati formu | formName, productId |
| `form_abandon` / `FormAbandon` | Korisnik napusti stranicu bez slanja forme | formName, lastField, productId |
| `whatsapp_click` / `Contact` | Klik na WhatsApp dugme | location (floating-button, footer, kontakt) |

---

## 3. Detalji implementacije

### Scroll Depth Tracking
- **Hook:** `src/hooks/useScrollDepth.ts`
- **Koristi se u:** `DirectResponseLanding.tsx` (sve 3 landing stranice)
- **Pragovi:** 25%, 50%, 75%, 90%, 100%
- **Svaki prag se okida samo jednom** po sesiji

### CTA Click Tracking
- **Funkcija:** `trackCtaClick(ctaName, ctaLocation, page)`
- **Koristi se u:** `DirectResponseLanding.tsx`
- **Lokacije:** `navbar`, `urgency-cta` (sredina stranice), `hero`
- **Korisno za:** A/B testiranje — koji CTA pozicija konvertira najbolje

### Form Abandonment Tracking
- **Funkcije:** `trackFormStart()`, `trackFormAbandon()`
- **Koristi se u:** `LandingOrderForm.tsx`
- **Kako radi:**
  1. `FormStart` — okida se kad korisnik prvi put počne tipkati u formu
  2. `FormAbandon` — okida se ako korisnik napusti stranicu (beforeunload) bez slanja forme
  3. Bilježi **zadnje polje** koje je korisnik popunjavao — pomaže identificirati gdje odustaju
- **Primjer insight-a:** "70% korisnika koji odustanu, odustanu na polju 'adresa'" → pojednostavi formu

### WhatsApp Click Tracking
- **Funkcija:** `trackWhatsAppClick(location)`
- **Koristi se u:** `WhatsAppButton.tsx` (floating button)
- **Lokacija parametar:** `floating-button`, `footer`, `kontakt`

### UTM Parameter Capture
- **Funkcije:** `getUtmParams()`, `getUtmString()`
- **Koristi se u:** `LandingOrderForm.tsx`
- **Kako radi:**
  1. Čita UTM parametre iz URL-a (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
  2. Čuva ih u `sessionStorage` da prežive navigaciju između stranica
  3. Šalje ih zajedno s narudžbom na `/api/orders`
- **Primjer linka:** `https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica?utm_source=meta&utm_medium=cpc&utm_campaign=ipl-pro-ljeto`

---

## 4. Kako aktivirati servise

### Korak 1: Google Analytics 4
1. Idi na https://analytics.google.com
2. Kreiraj GA4 property
3. Kopiraj Measurement ID (format: `G-XXXXXXXXXX`)
4. Dodaj u `.env`: `NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"`

### Korak 2: Meta Pixel
1. Idi na https://business.facebook.com/events_manager
2. Kreiraj novi Pixel
3. Kopiraj Pixel ID (samo brojevi)
4. Dodaj u `.env`: `NEXT_PUBLIC_META_PIXEL_ID="1234567890"`

### Korak 3: Microsoft Clarity
1. Idi na https://clarity.microsoft.com
2. Kreiraj novi projekat
3. Kopiraj Project ID
4. Dodaj u `.env`: `NEXT_PUBLIC_CLARITY_ID="abc123xyz"`

### Korak 4: TikTok Pixel (opcionalno)
1. Idi na https://ads.tiktok.com
2. Kreiraj Pixel
3. Kopiraj Pixel ID
4. Dodaj u `.env`: `NEXT_PUBLIC_TIKTOK_PIXEL_ID="C1234567890"`

---

## 5. Ključne metrike za praćenje

### Konverzijski funnel
```
Pregled stranice → Scroll 50%+ → CTA klik → Form Start → Purchase
```

### KPI-evi (Key Performance Indicators)
- **Bounce rate** — koliko posjetilaca ode bez interakcije
- **Scroll depth distribucija** — koliko % korisnika dođe do forme
- **CTA click rate** — koji CTA dugmad konvertiraju (navbar vs mid-page vs final)
- **Form start rate** — koliko korisnika koji vide formu počnu je popunjavati
- **Form abandonment rate** — koliko ih odustane i na kojem polju
- **Conversion rate** — posjetilac → narudžba
- **WhatsApp engagement** — koliko korisnika traži podršku prije kupovine
- **Cost per acquisition (CPA)** — iz Meta/TikTok ads managera

### Preporučeni dashboard
U GA4 napravi custom dashboard sa:
1. **Landing page performance** — konverzija po landing stranici
2. **UTM campaign performance** — koja kampanja donosi najjeftinije kupce
3. **Device breakdown** — mobile vs desktop konverzija
4. **Scroll funnel** — 25% → 50% → 75% → 90% → form_start → purchase

---

## 6. Fajlovi

| Fajl | Opis |
|------|------|
| `src/lib/analytics.ts` | Sve tracking funkcije (GA4 + Meta Pixel eventi) |
| `src/hooks/useScrollDepth.ts` | React hook za scroll depth tracking |
| `src/app/layout.tsx` | Script tagovi za GA4, Meta Pixel, Clarity, TikTok |
| `src/components/LandingOrderForm.tsx` | Form abandonment + UTM forwarding |
| `src/components/DirectResponseLanding.tsx` | Scroll depth + CTA click tracking |
| `src/components/WhatsAppButton.tsx` | WhatsApp click tracking |
| `.env.example` | Template za sve ENV varijable |
