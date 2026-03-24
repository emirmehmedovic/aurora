# SEO Analiza — aurorashop.ba
*Audit na osnovu izvornog koda + keyword istraživanja | 24. mart 2026*

---

## EXECUTIVE SUMMARY

aurorashop.ba ima solidnu tehničku osnovu (Next.js SSR, sitemap, robots.txt, structured data na LP-ovima) ali ima **dva kritična buga koji aktivno sabotiraju SEO**, plus niz propuštenih prilika. Stranica vjerovatno nije rangirana ni za jednu ciljnu ključnu riječ jer ju Google još nije indeksirao ili je indeksira pod pogrešnim domenom.

**Ocjena:** 4/10 — Osnova postoji, ali kritični problemi sprečavaju organski rast.

---

## 🔴 KRITIČNI PROBLEMI (Popraviti ODMAH)

### Problem 1 — Domain mismatch između robots.ts i sitemap.ts

**Ovo je #1 SEO bug na sajtu.**

`robots.ts` pokazuje Google botu na sitemap ovdje:
```
sitemap: "https://icecoolpro.ba/sitemap.xml"
```

Ali `sitemap.ts` koristi potpuno drugačiji domain:
```
const baseUrl = "https://aurorashop.ba";
```

A svi canonical URL-ovi na landing pageovima koriste **još jedan** domain:
```
canonical: "https://icecoolpro.ba/l/profesionalni-ipl-epilator"
canonical: "https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica"
canonical: "https://icecoolpro.ba/l/kompaktni-ipl-uredjaj"
```

**Rezultat:** Google dobija kontradiktornu informaciju. Robots.txt ga šalje na icecoolpro.ba/sitemap.xml koji vjerovatno ne postoji. Canonical tagovi kažu da je "originalni" sadržaj na icecoolpro.ba. Google može zaključiti da je aurorashop.ba duplikat sadržaja s drugog domena i penalizovati ga.

**Ispravka u robots.ts:**
```typescript
sitemap: "https://aurorashop.ba/sitemap.xml",
```

**Ispravka u svim LP-ovima** — promijeniti sve canonicale:
- `"https://icecoolpro.ba/l/profesionalni-ipl-epilator"` → `"https://aurorashop.ba/l/profesionalni-ipl-epilator"`
- `"https://icecoolpro.ba/l/ipl-aparat-protiv-dlacica"` → `"https://aurorashop.ba/l/ipl-aparat-protiv-dlacica"`
- `"https://icecoolpro.ba/l/kompaktni-ipl-uredjaj"` → `"https://aurorashop.ba/l/kompaktni-ipl-uredjaj"`

---

### Problem 2 — FAQ stranica je "use client" — nevidljiva Googleu

`src/app/faq/page.tsx` počinje s `"use client"` direktiva. Ovo znači da se sav FAQ sadržaj (12 pitanja i odgovora!) renderira isključivo u browseru putem JavaScripta.

Google može imati probleme s indeksiranjem JavaScript-renderovanog sadržaja, a FAQ stranice su zlatna mina za **Featured Snippets** — istaknute isječke koji se pojavljuju na vrhu Google rezultata za pitanja poput "da li IPL boli", "kada se vide rezultati IPL-a", itd.

**Ispravka:** Pretvoriti FAQ u Server Component (ukloniti `"use client"`, izmjestiti state logiku) ili koristiti statički HTML za sadržaj FAQ-a sa Accordion komponentom koja ne zahtijeva SSR.

---

## 🟡 SREDNJE OZBILJNI PROBLEMI

### Problem 3 — Homepage nema vlastite metadata (koristi fallback)

`src/app/page.tsx` nema `export const metadata` — koristi globalni fallback iz `layout.tsx`:

```
Title: "Ice Cool PRO™ — IPL Uređaji za Trajno Uklanjanje Dlačica | Dostava u BiH"
Description: "Profesionalno IPL uklanjanje dlačica iz udobnosti vašeg doma..."
```

Ovaj title je previše brend-fokusiran i ne cilja ključne riječi koje ljudi traže. Niko ne traži "Ice Cool PRO" — traže "IPL epilator BiH" ili "kućna laserska depilacija".

**Preporučeni homepage title:**
```
IPL Epilator za Kućnu Upotrebu | Trajno Uklanjanje Dlačica — Besplatna Dostava BiH
```

**Preporučeni homepage description:**
```
Kućni IPL epilator s ugrađenim hlađenjem — bez salona, bez boli. 3 modela od 165 KM. Besplatna dostava u BiH, plaćanje pouzećem. Vidljivi rezultati za 8 sedmica.
```

---

### Problem 4 — Nema Open Graph / Twitter Card tagova

`layout.tsx` nema niti jedan OG tag. Kad neko dijeli aurorashop.ba na Facebooku, Viberu ili WhatsAppu, nema nikakvu preview sliku ni naslov — samo goli URL.

**Ispravka u layout.tsx:**
```typescript
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: {
    title: "IPL Epilator za Kućnu Upotrebu | Aurora Shop",
    description: "Kućni IPL epilator od 165 KM. Besplatna dostava u BiH.",
    url: "https://aurorashop.ba",
    siteName: "Aurora Shop",
    images: [{ url: "https://aurorashop.ba/slike/PRO/cover-image.png", width: 1200, height: 630 }],
    locale: "bs_BA",
    type: "website",
  },
};
```

---

### Problem 5 — Product pages imaju slabu metadata

`src/app/proizvod/[slug]/page.tsx` ima generičke titleove:

```
"Ice Cool PRO™ - IPL Uklanjanje Dlačica | BiH"  ← nema ključnih riječi
"50% popust" u opisu ← ovo istekne, ne mijenjaj se automatski
```

**Preporučene zamjene:**
```
ice-cool-pro title: "ICE COOL PRO — IPL Epilator za Trajno Uklanjanje Dlačica | 175 KM | BiH"
ice-cool-pro description: "Bezbolni kućni IPL epilator s Ice Cool™ hlađenjem. Vidljivi rezultati za 8 sedmica. 999.999 bljeskova. Besplatna dostava u BiH — plaćanje pouzećem."

ice-cool-pro-max title: "ICE COOL Max — Najbrži IPL Epilator | Noge za 10 Minuta | BiH"
ice-cool-pro-max description: "Największa površina bljeska — noge gotove za 10 minuta. Dvostruko Ice Cool+™ hlađenje. 190 KM, besplatna dostava u BiH."

ice-cool-lite title: "ICE COOL LITE — Kompaktni IPL Epilator za Lice i Putovanja | 165 KM | BiH"
ice-cool-lite description: "Precizan IPL epilator za lice, bikini zonu i putovanja. Stane u torbicu. 165 KM, besplatna dostava u BiH, plaćanje pouzećem."
```

---

### Problem 6 — Nema blog/sadržajne sekcije

Direktorij `src/app` nema `/blog` ni `/clanci` folder. Organski SEO bez sadržaja je gotovo nemoguć za novu domenu.

Google rangira sajtove koji imaju autoritet, a autoritet se gradi sadržajem koji odgovara na pitanja korisnika. Svaki informativni članak je potencijalna ulazna tačka za novog posjetitelja.

---

## ✅ ŠTA RADI DOBRO

| Element | Status | Komentar |
|---|---|---|
| Structured Data (JSON-LD) | ✅ Dobro | Sva 3 LP-a imaju Product schema s cijenama, recenzijama, shipping detaljima |
| Sitemap | ✅ Postoji | 16 URL-ova, ali domain bug (vidi gore) |
| Robots.txt | ✅ Postoji | Ispravno blokira /admin i /api |
| HTML lang="bs" | ✅ Ispravno | Bošnjački jezik je označen |
| Landing page metadata | ✅ Solidni | Dobre ključne riječi u title/description/keywords |
| Next.js SSR | ✅ | Sadržaj se renderira server-side, Google ga može čitati |
| Canonical URL-ovi | ⚠️ Bug | Postoje ali pokazuju na krivi domain (icecoolpro.ba) |
| FAQ structured data | ❌ Nedostaje | FAQ stranica postoji ali nema FAQPage schema |
| Blog/sadržaj | ❌ Nedostaje | Nema nijednog članka |
| OG/Social tagovi | ❌ Nedostaje | Nema preview na dijeljenje |

---

## 2. KEYWORD MAPA

### 🎯 Primary Keywords — Direktna namjera kupovine

| Keyword | Search Intent | Težina rangiranja | Preporučena stranica |
|---|---|---|---|
| `IPL epilator BiH` | Transakcijska | Niska* | Homepage |
| `IPL aparat BiH` | Transakcijska | Niska* | Homepage |
| `IPL uređaj kupiti BiH` | Transakcijska | Niska* | /proizvodi |
| `kućna IPL depilacija BiH` | Transakcijska | Niska* | LP2 (/ipl-aparat-protiv-dlacica) |
| `IPL epilator cijena` | Transakcijska | Srednja | Homepage |
| `trajno uklanjanje dlačica kod kuće` | Transakcijska | Srednja | LP2 |

*Niska težina jer nema direktnih konkurenata koji SEO-optimiziraju za ove pojmove u BiH. eKupi i dm ne rade targeted SEO za BiH lokalne upite.

---

### 📌 Secondary Keywords — Manji volumen, lako rangirati

| Keyword | Search Intent | Preporučena stranica |
|---|---|---|
| `IPL epilator iskustva` | Informacijska | Blog članak |
| `kućni laser za dlačice` | Transakcijska | LP2 |
| `epilator laser kućni cijena` | Transakcijska | /proizvodi |
| `IPL aparat ili salon` | Komparativna | Blog članak |
| `Philips Lumea alternativa` | Komparativna | Blog članak |
| `IPL epilator bez boli` | Informacijska/Trans. | LP2 |
| `IPL za tamnu kožu` | Informacijska | FAQ / Blog |

---

### 🔍 Long-tail Keywords — Visoka konverzija, lako rangirati

| Keyword | Preporučena stranica |
|---|---|
| `IPL epilator za lice i bikini zonu` | LP3 (/kompaktni-ipl-uredjaj) |
| `IPL epilator za putovanja kompaktan` | LP3 |
| `profesionalni IPL epilator kućna upotreba` | LP1 (/profesionalni-ipl-epilator) |
| `IPL depilacija rezultati koliko dugo` | FAQ / Blog |
| `IPL epilator bikini zona sigurno` | FAQ / Blog |
| `IPL aparat dostava BiH pouzeće` | Homepage |
| `kućna depilacija bez boli trajno` | LP2 |
| `IPL aparat 200 KM BiH` | Homepage / LP2 |

---

### 📍 Lokalni Keywords

| Keyword | Preporučena stranica |
|---|---|
| `IPL epilator Sarajevo` | Homepage (dodati lokalni content) |
| `IPL epilator Banja Luka` | Homepage |
| `IPL aparat Tuzla dostava` | Homepage |
| `IPL epilator Mostar` | Homepage |

**Napomena:** Lokalni SEO je dostupan čak i bez Google My Business listinga — recenzije korisnica s lokacijama (Selma K. — Mostar, Emina — Mostar, Nina — Sarajevo) su već u kodu. Google to čita i koristi kao lokalni signal.

---

## 3. CONTENT STRATEGIJA — Blog članci koji nedostaju

### Prioritet 1 (Odmah pisati — visok SEO potencijal)

**Članak #1:** "IPL kod kuće vs salon laser: isplati li se kupiti uređaj?"
- Target keyword: `IPL aparat ili salon`, `isplati li se IPL kod kuće`
- Struktura: cijena salona × 12 mj × 3 god vs cijena ICE COOL PRO jednom
- CTA: link na LP2
- Procijenjeni ranking: Stranica 1 za BiH za 2–3 mj.

**Članak #2:** "Da li IPL boli? Iskustva korisnica i sve što trebate znati"
- Target keyword: `IPL epilator boli li`, `IPL iskustva`, `da li IPL boli`
- Struktura: mit vs realnost, objašnjenje hlađenja, tipovi kože
- CTA: link na sve LP-ove

**Članak #3:** "Koliko dugo traju rezultati IPL epilatora? (Realna iskustva)"
- Target keyword: `IPL rezultati`, `IPL koliko tretmana`, `IPL epilator rezultati`
- Struktura: tjedni timeline, maintenance faza, faktori koji utiču
- CTA: link na LP2

**Članak #4:** "Philips Lumea vs kućni IPL epilator: Razlika u cijeni i rezultatima"
- Target keyword: `Philips Lumea alternativa`, `Philips Lumea jeftinija opcija`
- Struktura: direktna usporedba, cijena, dostupnost, rezultati
- CTA: jasna preporuka ICE COOL PRO
- ⚠️ Ovo je najvrjedniji SEO članak — direktno hvata ljude koji razmatraju skuplje opcije

**Članak #5:** "Kako koristiti IPL epilator kod kuće — Kompletni vodič za početnike"
- Target keyword: `kako koristiti IPL epilator`, `IPL epilator vodič`
- Struktura: priprema, primjena, frekvencija, aftercare
- CTA: link na LITE LP (za početnike)

---

### FAQ Proširenja za Featured Snippets

Dodaj sljedeća pitanja u `/faq` stranicu (i pretvori u Server Component):

```
"Koliko tretmana IPL epilatora je potrebno?"
→ "Za vidljive rezultate potrebno je 6–8 tretmana u razmaku od 1–2 sedmice..."

"Može li se koristiti IPL na tamnijoj koži?"
→ "IPL je najučinkovitiji na Fitzpatrick tipu I–V (svijetla do maslinasta koža)..."

"Je li IPL siguran tokom trudnoće?"
→ "IPL tretmani se ne preporučuju tokom trudnoće i dojenja..."

"Koliko impulsa treba za cijelo tijelo?"
→ "Prosječan tretman cijelih nogu troši oko 150–200 impulsa..."

"IPL vs laser — koja je razlika?"
→ "IPL koristi široki spektar svjetlosti, dok laser koristi jednu talasnu dužinu..."
```

---

## 4. QUICK WINS — 5 stvari za odmah

| # | Akcija | Fajl | Utjecaj | Trud |
|---|---|---|---|---|
| 1 | **Ispravi domain u robots.ts** — `icecoolpro.ba` → `aurorashop.ba` | `robots.ts` | 🔴 Kritičan | 2 minute |
| 2 | **Ispravi sve canonical URL-ove** na LP-ovima (3 fajla) | `l/*/page.tsx` | 🔴 Kritičan | 5 minuta |
| 3 | **Dodaj homepage metadata** u `page.tsx` s ciljnim keywords | `app/page.tsx` | 🟡 Visok | 10 minuta |
| 4 | **Dodaj Open Graph tagove** u `layout.tsx` | `layout.tsx` | 🟡 Srednji | 15 minuta |
| 5 | **Pretvori FAQ u Server Component** + dodaj FAQPage schema | `faq/page.tsx` | 🟡 Visok | 30 minuta |

---

## 5. DUGOROČNA SEO STRATEGIJA (3–6 mj.)

### Mjesec 1 — Tehnička osnova
- ✅ Ispraviti domain bug (robots + canonicali)
- ✅ Dodati homepage metadata
- ✅ Dodati OG tagove
- ✅ Pretvoriti FAQ u Server Component + FAQPage schema
- ✅ Poboljšati product page metadata
- Registrirati sajt u Google Search Console
- Verificirati indeksiranje svih stranica
- Provjeriti Core Web Vitals

### Mjesec 2 — Content osnova
- Napisati Članak #1 (IPL vs salon laser) — najveći potencijal
- Napisati Članak #4 (Philips Lumea alternativa) — hvata high-intent publiku
- Dodati lokalne ključne riječi na homepage
- Postaviti Google Analytics konverzijsko praćenje (Purchase event)
- Proširiti FAQ sa 5 novih pitanja

### Mjesec 3–4 — Content rast
- Napisati Članak #2 i #3
- Početi graditi backlinke: kontaktirati beauty blogere u BiH/HR/RS za recenzije
- No+Vello BiH forum threads — Aurora kao jeftinija alternativa
- Odgovarati na forum pitanja na Klix.ba o IPL depilaciji (sa linkom na Aurora)

### Mjesec 5–6 — Autoritet i lokalni SEO
- Google My Business listing za "Aurora Shop"
- Prikupljati Google recenzije od kupaca
- Pitching za spominjanje na lokalnim portali (Klix.ba, Fena.ba, ženski portali)
- Napisati preostale članke iz liste

---

## PROCJENJENI ORGANSKI RAST (Realan scenarij)

| Vremenski period | Pozicija za "IPL epilator BiH" | Organski posjeti/mj. |
|---|---|---|
| Danas | Nema rangiranja | ~0 |
| Mj. 1 (tehničke ispravke) | Indeksirana, pozicija 15–30 | 10–30 |
| Mj. 2–3 (blog članci) | Pozicija 5–15 | 50–150 |
| Mj. 4–6 (content + backlinki) | Pozicija 1–5 | 200–600 |

**Napomena:** BiH tržište je malo ali SEO konkurencija je praktički nula za ove ključne riječi. eKupi i dm ne rade targeted content marketing. Aurora ima realnu šansu biti **#1 na Googleu za "IPL epilator BiH"** za 3–6 mj. — ako se ispravi tehnički bug odmah i pokrene content strategija.

---

## APPENDIX: Ranking provjera — šta se trenutno pojavljuje

Za upit "IPL epilator BiH kupiti":
1. Tehnodepo.ba
2. dm.hr (Hrvatska verzija, ne BiH)
3. eKupi.ba
4. Bazzar.rs / Bazzar.hr
5. Philips.hr Lumea stranica

**Aurora nije vidljiva ni na jednoj stranici rezultata** — što potvrđuje da domain bug i nedostatak indeksiranja ozbiljno šteti vidljivosti.

Za upit "trajno uklanjanje dlačica kod kuće BiH":
- Klix.ba forum
- Nomasvello.ba (laserski saloni)
- Senzacionalno.hr (HR blog)

Opet — Aurora nije prisutna. Ovo je ujedno i **prilike** jer ovi upiti nemaju jaku konkurenciju.

---

*Izvještaj kreiran: 24. mart 2026*
*Analiza bazirana na: izvornom kodu projekta + Google pretraga za relevantne keywords*
