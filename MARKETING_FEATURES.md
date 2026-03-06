# Marketing Features - Implementacija Plan

Na osnovu marketing strategije, potrebno je dodati sljedeće funkcionalnosti:

## 1. Campaign Management (PRIORITET)
**Zašto:** Praćenje Facebook/Instagram kampanja i njihove profitabilnosti

### Funkcionalnosti:
- ✅ UTM tracking (već implementirano u Orders i Leads)
- ⏳ Campaign dashboard
  - Pregled svih kampanja
  - Spend tracking (CSV import)
  - Performance metrike po kampanji
- ⏳ Ad Set tracking
  - Testiranje različitih angle-a
  - Testiranje različitih hookova
  - A/B testing rezultati

### Metrike:
- **CPL** (Cost Per Lead) - Trošak po leadu
- **CPA** (Cost Per Acquisition) - Trošak po narudžbi
- **ROAS** (Return On Ad Spend) - Povrat na uloženo
- **AOV** (Average Order Value) - Prosječna vrijednost narudžbe
- **Conversion Rate** - Stopa konverzije Lead → Order

---

## 2. Marketing Analytics Dashboard
**Zašto:** Praćenje profitabilnosti kampanja u realnom vremenu

### Funkcionalnosti:
- Daily/Weekly/Monthly performance
- Campaign comparison
- UTM source breakdown
- Funnel analytics (View → Add to Cart → Purchase)
- Cohort analysis

### Grafici:
- Revenue vs Spend timeline
- ROAS trend
- Conversion funnel
- Top performing campaigns

---

## 3. Content Management System (Blog)
**Zašto:** SEO strategija - organic traffic

### Potrebni članci (iz strategije):
- "Šta je IPL aparat?"
- "IPL ili vosak - šta je bolje?"
- "Da li IPL zaista radi?"
- "Koliko traju rezultati IPL tretmana?"
- "IPL za bikini zonu - vodič"
- "Kako koristiti IPL uređaj kod kuće"

### Funkcionalnosti:
- Blog post CRUD
- SEO meta tags
- Featured image
- Categories/Tags
- Publish/Draft status
- Schema markup za SEO

---

## 4. Reviews & Testimonials Management
**Zašto:** Socijalni dokaz - ključan za konverziju

### Funkcionalnosti:
- Review submission form (frontend)
- Admin approval system
- Star rating
- Before/After photos upload
- Featured reviews
- Display on product pages
- Display on homepage

---

## 5. Email Marketing Integration
**Zašto:** Retargeting i customer retention

### Email tipovi:
- **Order confirmation** - Potvrda narudžbe
- **Shipping notification** - Obavještenje o slanju
- **Delivery confirmation** - Potvrda dostave
- **Follow-up** - Provjera zadovoljstva (7 dana nakon dostave)
- **Review request** - Molba za recenziju (14 dana nakon dostave)
- **Abandoned cart** - Podsjetnik za napuštenu korpu
- **Newsletter** - Marketing kampanje

### Integracija:
- Mailgun / SendGrid / Resend
- Email templates
- Automated workflows
- Unsubscribe management

---

## 6. Advanced Product Pages
**Zašto:** SEO i konverzija

### Dodati:
- **FAQ sekcija** na product page
- **How it works** - Kako funkcioniše IPL
- **Before/After gallery**
- **Video demonstracija**
- **Comparison table** (IPL vs Brijanje vs Vosak vs Salon)
- **Schema markup** (Product, Review, FAQ)

---

## 7. Landing Page Builder
**Zašto:** Testiranje različitih angle-a i hookova

### Funkcionalnosti:
- Multiple landing pages za različite kampanje
- A/B testing
- Custom hero sections
- Different hooks/angles
- Conversion tracking per landing page

---

## 8. Retargeting Pixels & Events
**Zašto:** Facebook/Instagram retargeting kampanje

### Events (već implementirano):
- ✅ PageView
- ✅ ViewContent
- ✅ AddToCart
- ✅ InitiateCheckout
- ✅ Purchase
- ✅ Lead

### Dodatno:
- Custom audiences export
- Lookalike audience data
- Event optimization

---

## 9. Inventory Management
**Zašto:** Praćenje zaliha

### Funkcionalnosti:
- Stock levels
- Low stock alerts
- Out of stock handling
- Automatic status update (active/inactive)

---

## 10. Discount & Promo Codes
**Zašto:** Marketing kampanje i retargeting

### Funkcionalnosti:
- Promo code creation
- Percentage/Fixed discount
- Expiry dates
- Usage limits
- Campaign tracking

---

## 11. Customer Database & Segmentation
**Zašto:** Targeted marketing

### Funkcionalnosti:
- Customer profiles
- Purchase history
- Lifetime value (LTV)
- Segmentation (New, Returning, VIP)
- Export for email marketing

---

## 12. SMS Notifications (Opciono)
**Zašto:** Bolja komunikacija sa kupcima

### SMS tipovi:
- Order confirmation
- Shipping notification
- Delivery confirmation

---

## Prioritet implementacije:

### FAZA 1 (Odmah):
1. ✅ Poboljšanje admin panel layouta
2. Campaign Management & Marketing KPIs
3. Reviews/Testimonials system

### FAZA 2 (Uskoro):
4. Email marketing integration
5. Blog/Content management
6. Advanced product pages sa SEO

### FAZA 3 (Kasnije):
7. Landing page builder
8. Inventory management
9. Discount codes
10. Customer segmentation

---

## Trenutni status:

✅ **Implementirano:**
- Basic admin panel (Dashboard, Orders, Leads, Products, Analytics)
- UTM tracking
- Google Analytics & Meta Pixel
- Order management
- Lead management

⏳ **U razvoju:**
- Vizuelno poboljšanje admin panela
- Campaign management
- Marketing KPIs dashboard

📋 **Planirano:**
- Sve ostale funkcionalnosti iz liste
