# Landing Page V2 - Changelog & A/B Test Plan

## 📊 Clarity Data Insights (Osnova za optimizacije)

### Trenutna Performance (31.05 - 02.06.2026)
- **Total Sessions:** 378
- **Avg Duration:** 1.99 min (119s)
- **Bounce Rate (≤10s):** 31.0% ✅ (normalno za cold traffic)
- **Critical Drop-off (11-60s):** 27.1% ⚠️ (gubi se interes)
- **Engaged (1-3min):** 24.1%
- **High Engagement (>3min):** 17.8%
- **Conversion Rate:** ~4-5% (sesije sa 2+ klika)

### Landing Page Comparison
| Metrika | Žao mi je | Philips alternativa |
|---------|-----------|---------------------|
| Sesije | 24 | 308 |
| Prosječno trajanje | 3.6 min ⭐ | 1.8 min |
| Engagement (>30s) | 50.0% | 55.5% |
| Multi-click rate | 4.2% | 5.2% |

**Ključni nalaz:** "Žao mi je" landing ima DUPLO duže zadržavanje ali dobija samo 7% traffica.

---

## 🎯 V2 Optimizacije - Šta i Zašto

### 1. **Anti-Bounce Optimizacije (Protiv 11-60s drop-offa)**

#### Dodato:
- ✅ **Progress Bar** (vrh stranice)
  - *Zašto:* Vizuelni feedback koliko još do kraja → smanjuje "back button" želju
  - *Očekivani impact:* -5-8% bounce rate

- ✅ **Live View Counter** ("47 gleda sada")
  - *Zašto:* FOMO (Fear of Missing Out) + social validation odmah
  - *Očekivani impact:* +3-5% engagement

- ✅ **Urgency Banner** ("Još 19 komada • Završava za 48h")
  - *Zašto:* Scarcity odmah u herou → zadržava pažnju
  - *Očekivani impact:* +15-20% CTR na hero CTA

- ✅ **Quick Win Stats** (ispod hero sekcije)
  - *Zašto:* Instant value proposition (10 min, 1.200 KM ušteda, 30 dana)
  - *Očekivani impact:* -10-15% u 11-60s drop-off zoni

#### Original (ElegantSocialProof):
```tsx
// Samo hero sa textom i CTA
<h1>{heroTitle}</h1>
<p>{heroSubtitle}</p>
<button>CTA</button>
```

#### V2 (SocialProofLandingV2):
```tsx
// Progress bar + urgency + instant stats
<ProgressBar scrollProgress={scrollProgress} />
<UrgencyBanner>Još 19 komada • 48h</UrgencyBanner>
<Hero>
  <LiveViewCounter>47 gleda sada</LiveViewCounter>
  <EnhancedStats>300+ žena, 4.9/5, 7 narudžbi 24h</EnhancedStats>
</Hero>
<QuickWinBanner>10 min | 1.200 KM ušteda | 30 dana</QuickWinBanner>
```

---

### 2. **Povećanje CTA Klikova (Targeting 4.2% → 8-10%)**

#### Dodato:
- ✅ **Floating CTA** (pojavljuje se nakon 10s)
  - *Zašto:* Clarity pokazuje da korisnici scrollaju ali ne klikaju
  - *Kada:* Ako nakon 10s nema klika, pojavi floating button
  - *Očekivani impact:* +30-50% total CTR

- ✅ **Mini CTAs** nakon svakog testimonial-a
  - *Zašto:* Multiple touchpoints = više šansi za konverziju
  - *Design:* Subtle, ne agresivan ("I ja želim ove rezultate")
  - *Očekivani impact:* +2-3% konverzija iz testimonial sekcije

- ✅ **Price Preview** u hero sekciji
  - *Zašto:* Transparency = trust → više klikova
  - *Design:* "Samo danas: 175 KM (bilo 249 KM) -30%"
  - *Očekivani impact:* -20% form abandonment

#### Original:
```tsx
// CTAs samo na vrhu i dnu
<button>Naruči odmah</button>
// ... content ...
<button>Final CTA</button>
```

#### V2:
```tsx
// CTAs svuda + floating + mini
<button>Hero CTA</button>
<FloatingCTA showAfter={10000}>Naruči - 175 KM</FloatingCTA>
<Testimonial />
<MiniCTA>I ja želim ove rezultate</MiniCTA>
<Solution />
<button>Solution CTA</button>
<button>Final CTA</button>
```

---

### 3. **Social Proof & Trust Amplification**

#### Dodato:
- ✅ **Recent Buyer Notifications** (bottom left)
  - *Tekst:* "Amira iz Sarajeva naručila Ice Cool PRO"
  - *Timing:* Svaka 45s nova notifikacija
  - *Zašto:* Live proof da drugi kupuju = FOMO + trust
  - *Očekivani impact:* +8-12% konverzija

- ✅ **Enhanced Stats Bar** (vs original)
  - *Original:* "300+ korisnica"
  - *V2:* "300+ žena već koristi | 4.9/5 ocjena | 7 narudžbi u 24h"
  - *Zašto:* Specifičnost = vjerodostojnost
  - *Očekivani impact:* +5-7% trust perception

- ✅ **Testimonial Click-to-Scroll**
  - *Zašto:* Grid testimoniali na dnu sad scroll na feature carousel
  - *UX:* Bolji engagement sa sadržajem
  - *Očekivani impact:* +15-20% time on page

#### Original:
```tsx
<Stats>
  <div>300+ korisnica</div>
  <div>4.9/5</div>
</Stats>
```

#### V2:
```tsx
<EnhancedStats>
  <AvatarStack>300+ žena već koristi</AvatarStack>
  <Rating>4.9/5 prosječna ocjena</Rating>
  <RecentOrders>7 narudžbi u zadnjih 24h</RecentOrders>
</EnhancedStats>
<RecentBuyerNotification>
  Amira iz Sarajeva naručila prije 8 min
</RecentBuyerNotification>
```

---

### 4. **Mobile-First Optimizacije**

Clarity pokazuje: **Većina traffica je mobile (Facebook/Instagram app)**

#### Optimizovano:
- ✅ **Touch targets** (sve buttons min 44px height)
- ✅ **Readable text** (min 16px font size)
- ✅ **Sticky elements** preformatted za mobile
- ✅ **Form fields** sa auto-detect za BiH (majority traffic)

---

### 5. **Urgency & Scarcity Elements**

#### Dodato:
- ✅ **Stock Counter** ("Još 19 komada")
- ✅ **Timer** (implicitno - "Završava za 48h")
- ✅ **Live activity** ("47 gleda sada")

*Zašto ovo radi:* Kombinacija sva tri triggera (scarcity + urgency + social proof) = povećana percepcija vrijednosti

---

## 🧪 A/B Test Plan

### Setup
1. **URL Structure:**
   - Control: `/l/zao-mi-je-sto-nisam-ranije-probala` (ElegantSocialProof)
   - Variant: `/l/zao-mi-je-v2` (SocialProofLandingV2)

2. **Traffic Split:**
   - 50/50 split na Facebook kampanjama
   - Ili: Random split na landing (50% vidi original, 50% vidi V2)

3. **Duration:** Minimum 7 dana (želimo 100+ konverzija za statistical significance)

4. **Sample Size:**
   - Potrebno: ~200-300 sesija po varijantu za 95% confidence level
   - Sa 378 sesija za 3 dana = ~125/dan → **min 4-5 dana test**

### Metrics to Track (Clarity + Analytics)

#### Primary Metrics (Konverzija):
- [ ] **Conversion Rate** (form submissions)
- [ ] **Order Completion Rate** (purchases)
- [ ] **Add-to-Cart Rate** (intent)

#### Secondary Metrics (Engagement):
- [ ] **Bounce Rate** (≤10s exits)
- [ ] **11-60s Drop-off Rate** (critical zone)
- [ ] **Avg Time on Page**
- [ ] **Scroll Depth** (% do kraja)
- [ ] **CTA Click Rate** (all CTAs)
- [ ] **Multi-Click Rate** (2+ clicks = high intent)

#### Segment Analysis:
- [ ] **Mobile vs Desktop**
- [ ] **Facebook vs Instagram traffic**
- [ ] **First-time vs Returning visitors**

### Success Criteria

**Primary Goal:** V2 mora imati:
- ✅ +15-20% relative lift u conversion rate
- ✅ -10-15% drop u 11-60s bounce zone
- ✅ +5-8% avg time on page

**Secondary Goals:**
- ✅ +30-50% CTR na CTA buttons
- ✅ +10-15% scroll depth (% do forme)
- ✅ +20-30% multi-click rate

### Implementation Options

#### Option 1: Manual Split (Preporučeno za start)
```bash
# Original ostaje na trenutnom URL-u
/l/zao-mi-je-sto-nisam-ranije-probala

# V2 ide na novi URL
/l/zao-mi-je-v2

# Facebook kampanje:
# - Ad Set A → original URL
# - Ad Set B → V2 URL
# Run 7 dana, compare Clarity + FB analytics
```

#### Option 2: Random Split (Next.js Middleware)
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/l/zao-mi-je-sto-nisam-ranije-probala') {
    const variant = Math.random() < 0.5 ? 'control' : 'v2';
    if (variant === 'v2') {
      return NextResponse.rewrite(new URL('/l/zao-mi-je-v2', request.url));
    }
  }
}
```

#### Option 3: Query Param Toggle (Za internal testing)
```bash
# Control (original)
https://aurorashop.ba/l/zao-mi-je-sto-nisam-ranije-probala

# V2 (new)
https://aurorashop.ba/l/zao-mi-je-sto-nisam-ranije-probala?v=2
```

---

## 📈 Expected Results

### Conservative Estimate:
- **Current CR:** 4-5% (baseline)
- **V2 CR:** 5.5-6.5% (+20-30% relative lift)
- **Impact:** +2-3 konverzije po 100 sesija = +350-525 KM/100 sesija

### With 378 sesija/3 dana (126/dan):
- **Current:** 5 konverzija/dan × 175 KM = 875 KM/dan
- **V2 Projected:** 6.5 konverzija/dan × 175 KM = 1.137 KM/dan
- **Daily Lift:** +262 KM/dan (+30%)
- **Monthly Lift:** +7.860 KM/mj 🚀

### Optimistic Estimate (ako sve radi kako treba):
- **V2 CR:** 7-8% (+50-60% relative lift)
- **Daily Revenue:** ~1.400 KM/dan
- **Monthly Lift:** +10.000-12.000 KM/mj 🎯

---

## 🚀 Next Steps

### 1. Immediate (Today):
- [x] Create V2 component
- [x] Create test page `/l/zao-mi-je-v2`
- [ ] Preview V2 na staging
- [ ] Mobile test (iOS + Android)

### 2. Pre-Launch (Before FB campaign):
- [ ] Clarity setup za V2 tracking
- [ ] FB Pixel test events
- [ ] Google Analytics goals setup
- [ ] Form submission test (end-to-end)

### 3. Launch (Week 1):
- [ ] Split Facebook budget 50/50 (original vs V2)
- [ ] Monitor daily (Clarity + FB + GA)
- [ ] Note any bugs/issues
- [ ] Collect qualitative feedback

### 4. Analysis (Week 2):
- [ ] Statistical significance test
- [ ] Compare all metrics
- [ ] Identify winning variant
- [ ] Make decision: keep V2, iterate, or rollback

### 5. Iteration (Week 3+):
- [ ] Implement learnings
- [ ] Test V3 (based on V2 data)
- [ ] Scale winning variant

---

## 🔍 Key Differences Summary

| Feature | Original (ElegantSocialProof) | V2 (SocialProofLandingV2) |
|---------|-------------------------------|---------------------------|
| **Progress Bar** | ❌ | ✅ Sticky top |
| **Urgency Banner** | ❌ | ✅ "Još 19 komada" |
| **Live View Counter** | ❌ | ✅ "47 gleda sada" |
| **Quick Win Stats** | ❌ | ✅ "10 min \| 1.200 KM \| 30 dana" |
| **Floating CTA** | ❌ | ✅ Nakon 10s |
| **Recent Buyer Popup** | ❌ | ✅ Svaka 45s |
| **Mini CTAs** | ❌ | ✅ Nakon testimonials |
| **Price in Hero** | ❌ | ✅ Transparent pricing |
| **Enhanced Stats** | Basic | ✅ "7 narudžbi u 24h" |
| **Testimonial Click** | Grid only | ✅ Click-to-scroll |
| **Mobile Optimized** | ✅ | ✅✅ Enhanced |

---

## 💡 Pro Tips za Testiranje

1. **Ne mijenjaj ništa tokom testa** - Consistency je key
2. **Run minimum 7 dana** - Weekend vs weekday behavior differs
3. **Watch for bugs na mobile** - 80%+ traffica je mobile
4. **Monitor form abandonment** - Ako raste, ima problem
5. **Check Clarity recordings** - Kvalitativni insights > kvantitativni
6. **Budget equally** - FB campaign split mora biti 50/50 za fair test
7. **Track externa factors** - Praznici, promocije, konkurencija

---

## 📞 Support

Pitanja? Need help sa setup?
- Clarity Dashboard: https://clarity.microsoft.com/projects/vzsy8o0z65
- FB Ads Manager: Check campaign settings
- GA4: Setup goals for conversion tracking

Good luck! 🚀
