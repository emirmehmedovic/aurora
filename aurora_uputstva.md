# Aurora Shop — Akcioni plan i uputstva
> Verzija: Mart 2026 | Status: Kampanja aktivna od 22.3.2026.

---

## 1. FACEBOOK KAMPANJA — Šta uraditi odmah

### ✅ Već urađeno
- Budget povećan na 15€/dan
- Conversion event: "Kupi" (Purchase) ✅
- Advantage+ kampanja: ON ✅
- Geo: Bosna i Hercegovina ✅
- Landing page URL: `/l/ipl-aparat-protiv-dlacica` ✅

### 🔴 Kritično — uradi u narednih 48h

**1. Izmijeni primary tekst carousel oglasa ("PRVI VIDEO IPL - Copy")**

Trenutni tekst:
```
Prestani se brijati svaka 2 dana.
Bez iritacije. Bez uraslih dlačica. Bez stalnog trošenja na britvice i salone.
Sa IPL epilatorom dobijaš: ✔ glatku kožu ✔ sporiji rast dlačica ✔ dugoročno rješenje
Sve iz udobnosti vlastitog doma.
👉 Naruči danas i kreni već ove sedmice
```

Preporučeni novi tekst (za carousel):
```
175 KM jednom. Za zauvijek.

Prosječna žena troši 200+ KM godišnje na britvice i salone — i ponovo se brije za 3 dana.

Sa Aurora ICE COOL epilatorom:
✔ 8 sedmica tretmana — pa sloboda
✔ Bez bola zahvaljujući ice cooling tehnologiji
✔ 500.000 bljeskova = 10+ godina korišćenja

Besplatna dostava u BiH · Plaćanje pouzećem
👉 Naruči danas
```

**2. Popuni opise (Opis) na svakoj carousel kartici**

Kartica 1 — "Glatka koža bez svakodnevnog brijanja":
```
Ice cooling tehnologija štiti kožu. Bez iritacije, bez urastanja.
```

Kartica 2 — "Profesionalna depilacija kod kuće":
```
Isti rezultati kao salon — bez termina, bez čekanja, bez troška.
```

Kartica 3 — "Zaboravi na brijanje zauvijek":
```
165–190 KM jednom. Dostavaljamo sutra, plaćaš pouzećem.
```

**3. Pogledaj Facebook preporuku na carousel oglasu**

U Ads Manageru → Oglasi → "PRVI VIDEO IPL - Copy" → vidiš "1 recommendation" žuti badge. Klikni na njega i procijeni da li je relevantno.

### 🟡 Uradi ove sedmice

**4. Kreiraj treći oglas — čista slika s tekstom overlay-om**

Format: Jedna slika (ne video, ne carousel)
Visual: Bijeli ICE COOL uređaj na čistoj pozadini + tekst overlay:
```
"175 KM jednom.
Zauvijek glatka koža."
```
Primary tekst: fokus na socialni dokaz — "Hiljade žena u BiH već koristi"

**5. Prati ove metrike svaki dan**

| Metrika | Alarm signal |
|---|---|
| CPM (cijena 1000 prikaza) | > 8€ — audience je presitni ili oglas loš |
| CTR (klik na link) | < 1% — kreativ ne privlači |
| CPC (cijena po kliku) | > 0.50€ — potrebna optimizacija |
| Cost per Purchase | > 50 KM (25€) — kampanja nije profitabilna |
| Learning phase status | Ako ostane "Learning" > 2 sedmice = problem |

**6. Kada izađe iz Learning Phase (~sedmica 2–3)**

Provijeri koji od 2 oglasa ima bolji CPP (cost per purchase). Isključi lošijeg. Uloži budget u boljeg i dodaj 3. varijant.

---

## 2. KOD — Šta treba commitati

### ✅ Već commitano i u produkciji
- Canonical URLovi ispravni (aurorashop.ba, ne icecoolpro.ba)
- robots.ts i sitemap.ts ispravni
- metadataBase, OpenGraph, Twitter card u layout.tsx
- FAQ page kao Server Component s JSON-LD
- Svi copywriting popravci na landing stranicama
- Homepage hero badge — evergreen
- UrgencyCTA bar popravljen

### 🔴 Treba commitati ODMAH

**Hero sekcija — klikabilne slike (upravo urađeno):**
```
src/components/HeroSectionClient.tsx
```
Promjena: hero slike su sada klikabilne i vode na stranicu proizvoda.

**JSON-LD fix u blog postovima (upravo urađeno):**
```
src/app/blog/ipl-depilacija-kod-kuce-vs-salon-laser/page.tsx
src/app/blog/philips-lumea-alternativa-bih/page.tsx
```
Promjena: @graph struktura ispravljena — Google sada može čitati FAQPage rich results.

**Git komanda:**
```bash
git add src/components/HeroSectionClient.tsx
git add src/app/blog/ipl-depilacija-kod-kuce-vs-salon-laser/page.tsx
git add src/app/blog/philips-lumea-alternativa-bih/page.tsx
git commit -m "Fix: hero images clickable, JSON-LD blog structure corrected"
git push
```

### 🟡 Treba implementirati (narednih 7–14 dana)

**Nove SEO landing stranice** (copywriting je spreman u `aurora_seo_copywriting.md`):

| Stranica | Model | Prioritet |
|---|---|---|
| `/l/ipl-epilator-za-lice` | LITE | Visok |
| `/l/ipl-za-bikini-zonu` | LITE/PRO | Visok |
| `/l/trajna-depilacija-potkolenice` | PRO | Srednji |
| `/l/ipl-za-osjetljivu-kozu` | Max | Srednji |

**Blog stranice** (copywriting spreman u `aurora_seo_copywriting.md`):

| Stranica | Targetira upit | Prioritet |
|---|---|---|
| `/blog/ipl-depilacija-kod-kuce-vs-salon-laser` | "IPL vs salon laser" | Visok |
| `/blog/philips-lumea-alternativa-bih` | "Philips Lumea BiH" | Visok |

> Napomena: Nove landing stranice su stavljene u `/l/` folder — URL-ovi su konzistentni s aktivnom Facebook kampanjom, ne mijenjaj dok kampanja traje.

---

## 3. SEO — Šta uraditi

### 🔴 Odmah (ova sedmica)

**Google Search Console setup:**
1. Idi na [search.google.com/search-console](https://search.google.com/search-console)
2. Dodaj property: `https://aurorashop.ba`
3. Verifikacija: HTML tag metod → dodaj tag u `src/app/layout.tsx` u `<head>`
4. Nakon verifikacije: Sitemaps → Submit → `https://aurorashop.ba/sitemap.xml`

**Isključi admin iz Clarity praćenja:**
1. Microsoft Clarity → Settings → IP blocking ili URL filters
2. Dodaj filter: Exclude URL contains `/admin`
3. Ovo sprječava da tvoje vlastite posjete kvare podatke

### 🟡 Ova sedmica

**Implementiraj nove stranice iz `aurora_seo_copywriting.md`**

Za svaku stranicu provjeri da ima:
- [ ] `export const metadata` sa naslovom i opisom (Server Component — bez "use client")
- [ ] Canonical URL: `https://aurorashop.ba/[putanja]`
- [ ] JSON-LD Product schema (za landing) ili Article+FAQPage (za blog)
- [ ] Dodata u `src/app/sitemap.ts`

---

## 4. PERFORMANCE — INP problem (1000ms)

Clarity pokazuje INP od 1000ms (trebalo bi biti < 200ms). To znači da korisnici čekaju cijelu sekundu na odgovor stranice pri kliku — direktno ubija konverzije na mobitelu.

**Uzroci (Next.js specifični):**
- Heavy client-side JavaScript u `"use client"` komponentama
- Nedovoljno lazy loading velikih komponenti
- Nekomprimirane slike

**Šta provjeriti:**
```
- Koliko "use client" komponenti se učitava na landing stranici?
- Da li su slike u WebP formatu i komprimirane?
- Da li se heavy biblioteke (npr. animacije) učitavaju odmah ili lazy?
```

Reci mi kada budeš spreman — mogu pogledati kod i identificirati bottleneck.

---

## 5. WEEKLY CHECKLIST — Svaki ponedeljak

### Facebook
- [ ] Provjeri cost per purchase i CTR
- [ ] Isključi oglas s lošijim performansama ako razlika > 30%
- [ ] Provjeri budget iskorištenost (90%+ = ok, < 70% = problem s audicijom)
- [ ] Provjeri da li je kampanja izašla iz Learning Phase

### Website (Clarity)
- [ ] Provjeri scroll depth na landing stranici (trebalo bi biti > 60%)
- [ ] Provjeri dead clicks — postoji li nešto što korisnici klikaju a ne funkcionira
- [ ] Provjeri quick backs (> 20% = problem s relevance ili brzinom učitavanja)
- [ ] Pogledaj 2–3 session recording za razumijevanje korisničkog ponašanja

### SEO (Google Search Console)
- [ ] Provjeri indexiranost novih stranica
- [ ] Provjeri Core Web Vitals izvještaj
- [ ] Provjeri Coverage errors (nije indexirano, 404 greške)

---

## 6. KPI DASHBOARD — Ciljevi

| Metrika | Trenutno | Cilj (30 dana) | Cilj (90 dana) |
|---|---|---|---|
| CPP (cost per purchase) | nepoznato | < 25€ | < 15€ |
| CTR (link click) | nepoznato | > 1.5% | > 2.5% |
| Landing CVR (conversion rate) | nepoznato | > 1.5% | > 3% |
| Organski posjeti/mj | ~5 | 50+ | 200+ |
| Google indeksirane stranice | ~5 | 15+ | 25+ |

---

*Dokument generisan: Mart 2026 | Aurora Shop — aurorashop.ba*
