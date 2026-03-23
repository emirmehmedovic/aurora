# 🔍 Google Search Console - Structured Data Fix

## ✅ Šta je popravljeno

Google Search Console je prijavio 3 nedostajuća polja u strukturiranim podacima. Sva tri su sada dodana:

### 1. **priceValidUntil** ✅
- Dodato: `"priceValidUntil": "2026-12-31"`
- Znači: Cijena važi do kraja 2026. godine

### 2. **shippingDetails** ✅
Dodati komplentni shipping detalji:
```json
{
  "shippingRate": { "value": "0", "currency": "BAM" },
  "shippingDestination": { "addressCountry": "BA" },
  "deliveryTime": {
    "handlingTime": "0-1 dan",
    "transitTime": "1-3 dana"
  }
}
```

### 3. **hasMerchantReturnPolicy** ✅
Dodana return politika:
```json
{
  "applicableCountry": "BA",
  "returnPolicyCategory": "14 dana",
  "returnMethod": "Poštom",
  "returnFees": "Besplatno"
}
```

---

## 📄 Izmijenjene stranice

1. ✅ `/l/ipl-aparat-protiv-dlacica` (ICE COOL PRO)
2. ✅ `/l/kompaktni-ipl-uredjaj` (ICE COOL LITE)
3. ✅ `/l/profesionalni-ipl-epilator` (ICE COOL Max)

---

## 🚀 Deployment

### Korak 1: Deploy izmjene
```bash
git add .
git commit -m "Fix Google Search Console structured data warnings"
git push
```

### Korak 2: Čekaj da Google re-index-uje
Google automatski re-crawl-uje stranice svaka 2-4 sedmice, ali možeš ubrzati proces:

1. Idi na [Google Search Console](https://search.google.com/search-console)
2. URL Inspection Tool
3. Unesi: `https://aurorashop.ba/l/ipl-aparat-protiv-dlacica`
4. Klikni "Request Indexing"
5. Ponovi za sve 3 landing stranice

---

## 🧪 Test strukturiranih podataka

### Odmah provjeri da li je OK:

1. Idi na [Rich Results Test](https://search.google.com/test/rich-results)
2. Unesi URL: `https://aurorashop.ba/l/ipl-aparat-protiv-dlacica`
3. Klikni "Test URL"

**Očekivani rezultat:**
- ✅ "Page is eligible for rich results"
- ✅ 0 Errors
- ⚠️ 0 Warnings

---

## 📊 Provjera u Google Search Console

Nakon 2-7 dana, provjeri u Google Search Console:

1. **Merchant Listings** → Trebalo bi biti 0 upozorenja
2. **Product Snippets** → Trebalo bi biti 0 upozorenja
3. **Enhancements** → Sve tri stranice validne

---

## 🎯 Očekivani benefiti

Nakon što Google prihvati izmjene:

### Rich Snippets će prikazivati:
- ⭐ Rating (4.9 zvjezdica)
- 💰 Cijena (175 KM, 165 KM, 190 KM)
- 🚚 **BESPLATNA DOSTAVA** badge
- 🔄 **14 dana povrat** badge
- ⏱️ **Brza dostava (1-3 dana)**

### SEO benefiti:
- 📈 Bolji CTR (Click-Through Rate) u search rezultatima
- 🏆 Povećan trust signal za Google
- 💡 Veća vidljivost u search rezultatima
- 🎁 Mogućnost pojave u Google Shopping (ako se aplikuje)

---

## 📱 Kako će izgledati u Google Search

```
ICE COOL PRO | IPL Aparat za Trajno Uklanjanje...
aurorashop.ba › l › ipl-aparat-protiv-dlacica

⭐⭐⭐⭐⭐ 4.9 (47) · 175,00 KM · Na stanju
🚚 BESPLATNA dostava · 🔄 Povrat 14 dana
ICE COOL PRO – IPL aparat za trajno uklanjanje dlačica...
```

---

## 🔧 Ako upozorenja ne nestanu

### Nakon 2 sedmice, ako Google još uvijek pokazuje upozorenja:

1. **Force re-crawl:**
   ```bash
   # Sitemap
   https://aurorashop.ba/sitemap.xml
   ```
   Submit ponovo u Search Console

2. **Provjeri da li je live:**
   ```bash
   curl https://aurorashop.ba/l/ipl-aparat-protiv-dlacica | grep "priceValidUntil"
   ```
   Trebalo bi vratiti: `"priceValidUntil":"2026-12-31"`

3. **Validate ponovo:**
   - [Schema.org Validator](https://validator.schema.org/)
   - Paste URL
   - Provjeri da nema grešaka

---

## 📞 Dodatne informacije

### Gdje su strukturirani podaci?

Svaka landing stranica ima JSON-LD script tag u `<head>`:
```tsx
<Script
  id="product-jsonld-pro"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### Ako želiš promijeniti return policy:

Edit file: `/src/app/l/[stranica]/page.tsx`

Promijeni:
```json
"merchantReturnDays": 14,  // Broj dana
"returnFees": "FreeReturn"  // Ili "ReturnShippingFees"
```

### Ako želiš promijeniti delivery time:

```json
"transitTime": {
  "minValue": 1,  // Min broj dana
  "maxValue": 3,  // Max broj dana
}
```

---

## ✅ Checklist

- [x] Dodana `priceValidUntil` polja
- [x] Dodana `shippingDetails` sa besplatnom dostavom
- [x] Dodana `hasMerchantReturnPolicy` sa 14 dana povrata
- [x] Ažurirani svi 3 landing page-a
- [x] Dodana Hero Sekcija link u Admin Sidebar
- [ ] Deploy na produkciju
- [ ] Request indexing u Google Search Console
- [ ] Provjeri Rich Results Test
- [ ] Čekaj 7 dana i provjeri upozorenja u GSC

---

**Strukturirani podaci su sada komplentni! 🎉**

Google će prepoznati sve informacije i prikazati ih u search rezultatima sa rich snippets.
