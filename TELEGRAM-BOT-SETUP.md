# 🤖 Telegram Bot Setup Guide

## Pregled

Telegram bot šalje dvije vrste obavijesti:
1. **Real-time obavijesti** - Svaka nova narudžba se odmah šalje u grupu
2. **Dnevni izvještaji** - Svaki dan u 00:05 šalje statistiku za prethodni dan

---

## 📋 Šta ti treba

- ✅ Bot token (već imaš): `8736496245:AAHg1_yuaNezvuup4xcaIsaO9Vkn2qybmQE`
- ⏳ Chat ID grupe (još treba dobiti)

---

## 🔧 Korak 1: Dodaj Bot u .env fajl

Otvori `.env` fajl i dodaj:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8736496245:AAHg1_yuaNezvuup4xcaIsaO9Vkn2qybmQE
TELEGRAM_CHAT_ID=your-chat-id-here  # Dobit ćeš u koraku 2

# Optional: Security for cron job
CRON_SECRET=some-random-secret-string  # Opcionalno, za security
```

---

## 🆔 Korak 2: Dobij Chat ID grupe

### Opcija A: Koristi @userinfobot (najlakše)

1. **Kreiraj Telegram grupu** ako već nemaš:
   - Otvori Telegram
   - Klikni "New Group"
   - Dodaj barem jednu osobu (možeš i sebe)
   - Nazovi grupu npr. "Aurora Narudžbe"

2. **Dodaj bota u grupu**:
   - Otvori grupu
   - Klikni na ime grupe → "Add Members"
   - Traži: `@narudzbe_aurora_bot`
   - Dodaj ga u grupu

3. **Dobij Chat ID**:
   - Dodaj `@userinfobot` u istu grupu
   - Bot će automatski poslati poruku sa Chat ID-om
   - Kopiraj taj broj (npr. `-1001234567890`)
   - Obriši `@userinfobot` iz grupe (više nije potreban)

### Opcija B: Manualno preko API-ja

1. Dodaj `@narudzbe_aurora_bot` u grupu
2. Pošalji bilo kakvu poruku u grupi (npr. "test")
3. Otvori u browseru:
   ```
   https://api.telegram.org/bot8736496245:AAHg1_yuaNezvuup4xcaIsaO9Vkn2qybmQE/getUpdates
   ```
4. Traži u JSON odgovoru `"chat":{"id":-1001234567890`
5. Kopiraj taj broj

### Ažuriraj .env

```bash
TELEGRAM_CHAT_ID=-1001234567890  # Tvoj chat ID
```

---

## ✅ Korak 3: TestirajBot

### Deploy izmjene

```bash
# Ako radiš lokalno
npm run dev

# Na VPS-u
git add .
git commit -m "Add Telegram bot integration"
git push
cd ~/apps/aurora
git pull
npm install
npm run build
pm2 restart webshop
```

### Testiraj connection

1. **Preko Admin Panela** (najlakše):
   - Idi na `/admin`
   - Trebat će dugme "Test Telegram Bot" (možemo dodati)

2. **Preko cURL**:
   ```bash
   curl -X POST https://aurorashop.ba/api/telegram/test \
     -H "Content-Type: application/json" \
     -H "Cookie: your-auth-cookie"
   ```

3. **Kreiraj test narudžbu**:
   - Idi na landing page
   - Napravi narudžbu
   - Provjeri da li je stigla u Telegram grupu

**Očekivani rezultat:**
```
🛍️ NOVA NARUDŽBA #ORD-1234567890

👤 Kupac: Ime Prezime
📱 Telefon: +387 62 123 456

📦 Proizvodi:
  • ICE COOL PRO × 1 = 175.00 KM

💰 UKUPNO: 175.00 KM

🌐 Izvor: Direktna narudžba

⏰ 23.03.2026. 14:30
```

---

## ⏰ Korak 4: Postavi Cron Job za Dnevne Izvještaje

Dnevni izvještaji se šalju svaki dan u **00:05** sa statistikom prethodnog dana.

### Opcija A: Koristi cPanel Cron Jobs (ako imaš cPanel)

1. Login u cPanel
2. Traži "Cron Jobs"
3. Dodaj novi cron:
   - **Minute**: 5
   - **Hour**: 0
   - **Day**: *
   - **Month**: *
   - **Weekday**: *
   - **Command**:
     ```bash
     curl -X POST https://aurorashop.ba/api/telegram/daily-summary \
       -H "x-cron-secret: your-cron-secret"
     ```

### Opcija B: Koristi Linux Crontab (VPS)

```bash
# Otvori crontab
crontab -e

# Dodaj liniju (šalje svaki dan u 00:05)
5 0 * * * curl -X POST https://aurorashop.ba/api/telegram/daily-summary -H "x-cron-secret: your-cron-secret"

# Sačuvaj i izađi
```

### Opcija C: Koristi Vercel Cron (ako si na Vercelu)

Dodaj u `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/telegram/daily-summary",
      "schedule": "5 0 * * *"
    }
  ]
}
```

### Testiraj Cron Ručno

```bash
# Test za prethodni dan
curl -X POST https://aurorashop.ba/api/telegram/daily-summary \
  -H "x-cron-secret: your-cron-secret"

# Test za specifičan datum
curl -X POST "https://aurorashop.ba/api/telegram/daily-summary?date=2026-03-22" \
  -H "x-cron-secret: your-cron-secret"
```

**Očekivani rezultat:**
```
📊 DNEVNI IZVJEŠTAJ - 22.03.2026

━━━━━━━━━━━━━━━━━━━━━━
📦 NARUDŽBE: 12
💰 PRIHOD: 2,100.00 KM
📝 NOVI LEADOVI: 15
━━━━━━━━━━━━━━━━━━━━━━

🏆 TOP PROIZVODI:
  1. ICE COOL PRO (8×)
  2. ICE COOL Max (3×)
  3. ICE COOL LITE (1×)

📋 STATUS NARUDŽBI:
  • 🆕 Nova: 5
  • ✅ Potvrđena: 4
  • 📦 U pripremi: 2
  • 🚚 Poslata: 1

📈 IZVORI NARUDŽBI:
  • 📘 facebook: 7
  • 🔍 google: 3
  • 🌐 Direktno: 2

━━━━━━━━━━━━━━━━━━━━━━
⏰ Generisano: 23.03.2026. 00:05
```

---

## 🎨 Prilagođavanje Poruka

### Promijeni format notifikacije

Edit: `/src/lib/telegram.ts`

**Dodaj više emoji-a:**
```typescript
function getSourceEmoji(source?: string): string {
  if (!source) return '🌐';
  if (lowerSource.includes('whatsapp')) return '💚';  // Dodaj WhatsApp
  if (lowerSource.includes('youtube')) return '📺';   // Dodaj YouTube
  return '🌐';
}
```

**Promijeni tekst:**
```typescript
const message = `
🎉 NOVA NARUDŽBA! 🎉

Narudžba: #${order.orderNumber}
Kupac: ${order.customerName}
Telefon: ${order.phone}
Iznos: ${(order.totalAmount / 100).toFixed(2)} KM
...
`;
```

### Dodaj notifikacije za status promjene

Možeš dodati i notifikacije kada se promijeni status narudžbe:

```typescript
// U /src/lib/telegram.ts
export async function sendOrderStatusUpdate(
  orderNumber: string,
  newStatus: string,
  customerName: string
) {
  const message = `
📬 STATUS PROMJENA

Narudžba: #${orderNumber}
Kupac: ${customerName}
Novi status: ${translateStatus(newStatus)}
  `.trim();

  await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
}
```

---

## 🔒 Security

### Zaštiti API endpoint (opcionalno)

Ako želiš dodati security za cron job:

1. **Generiši random secret**:
   ```bash
   openssl rand -hex 32
   ```

2. **Dodaj u .env**:
   ```bash
   CRON_SECRET=your-generated-secret-here
   ```

3. **Koristi u cron commandi**:
   ```bash
   curl -X POST https://aurorashop.ba/api/telegram/daily-summary \
     -H "x-cron-secret: your-generated-secret-here"
   ```

---

## 🐛 Troubleshooting

### Bot ne šalje poruke

1. **Provjeri da li je token validan**:
   ```bash
   curl https://api.telegram.org/bot8736496245:AAHg1_yuaNezvuup4xcaIsaO9Vkn2qybmQE/getMe
   ```
   Trebalo bi vratiti info o botu.

2. **Provjeri da li je bot u grupi**:
   - Otvori grupu
   - Klikni na ime grupe
   - Vidi listu članova
   - Trebao bi biti `@narudzbe_aurora_bot`

3. **Provjeri Chat ID**:
   ```bash
   curl https://api.telegram.org/bot8736496245:AAHg1_yuaNezvuup4xcaIsaO9Vkn2qybmQE/getUpdates
   ```

4. **Provjeri logs**:
   ```bash
   # Na VPS-u
   pm2 logs webshop

   # Traži poruke:
   # "✅ Order notification sent to Telegram"
   # "❌ Failed to send Telegram notification"
   ```

### Cron job ne radi

1. **Provjeri da li je cron postavljen**:
   ```bash
   crontab -l
   ```

2. **Provjeri cron logs**:
   ```bash
   grep CRON /var/log/syslog
   ```

3. **Testiraj ručno**:
   ```bash
   curl -X POST https://aurorashop.ba/api/telegram/daily-summary
   ```

### Poruke stižu ali format je loš

- Telegram koristi HTML formatiranje
- Provjeri da sve HTML tagovi budu zatvoreni: `<b></b>`
- Escape special characters ako je potrebno

---

## ✅ Checklist

- [ ] Dodao TELEGRAM_BOT_TOKEN u .env
- [ ] Kreirao Telegram grupu
- [ ] Dodao bota u grupu
- [ ] Dobio Chat ID
- [ ] Dodao TELEGRAM_CHAT_ID u .env
- [ ] Deploy-ovao izmjene
- [ ] Testirao bot connection
- [ ] Kreirao test narudžbu
- [ ] Primio notifikaciju u Telegram
- [ ] Postavio cron job za dnevne izvještaje
- [ ] Testirao dnevni izvještaj ručno

---

## 📞 Dodatne informacije

### API Endpoints

- **POST** `/api/telegram/test` - Test bot connection
- **POST** `/api/telegram/daily-summary` - Generate daily summary
- **POST** `/api/telegram/daily-summary?date=2026-03-22` - Summary for specific date

### Bot Commands (možeš dodati kasnije)

Možeš dodati komande koje bot može izvršavati u grupi:

```
/stats - Danas statistika
/yesterday - Jučerašnji izvještaj
/week - Sedmični izvještaj
/help - Pomoć
```

---

**Bot je spreman! 🎉**

Čim dobiješ Chat ID i dodaš u .env, sve će raditi automatski.
