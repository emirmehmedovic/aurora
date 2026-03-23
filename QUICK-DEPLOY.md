# ⚡ Quick Deploy Guide

## 🚀 Za Vercel (Najbrži način)

```bash
# 1. Commit i push
git add .
git commit -m "Add media management"
git push

# 2. Vercel će auto-deploy
# Čekaj da se build završi

# 3. Nakon deploya, otvori:
https://your-app.vercel.app/admin/migrate

# 4. Klikni "Pokreni Migraciju"
# ✅ Gotovo!
```

---

## 🖥️ Za VPS/Server

```bash
# Na serveru:
cd /path/to/app
git pull
npm run deploy:full
pm2 restart webshop

# Otvori u browseru:
https://yourdomain.com/admin/migrate

# Klikni "Pokreni Migraciju"
# ✅ Gotovo!
```

---

## ☁️ Za Railway/Render

```bash
# 1. Push kod
git push

# 2. Platform će auto-deploy

# 3. Dodaj Post-Deploy Command u dashboard-u:
npm run db:migrate

# ILI otvori:
https://your-app.com/admin/migrate
# i klikni "Pokreni Migraciju"

# ✅ Gotovo!
```

---

## 🔥 Ako nešto ne radi

```bash
# 1. Provjeri logove
npm run logs  # ili u platformi

# 2. Provjeri DATABASE_URL
echo $DATABASE_URL

# 3. Manual migration
npm run db:migrate

# 4. Check da li su slike tu:
ls -la public/slike/

# 5. Test lokalno prvo:
npm run dev
# Otvori: http://localhost:3000/admin/migrate
```

---

## 📦 Environment Variables (MORA biti setirano)

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://yourdomain.com"
```

---

## ✅ Verifikacija da radi

Nakon deploya provjeri:

1. **Admin Panel**: `/admin/media` - vidiš li slike?
2. **Hero Editor**: `/admin/hero` - možeš li mijenjati?
3. **Homepage**: `/` - hero sekcija radi?
4. **Landing**: `/l/ipl-aparat-protiv-dlacica` - slike se učitavaju?

Ako sve radi → **SUCCESS! 🎉**

---

## 🆘 Hitna pomoć

**Problem: Slike ne rade**
```bash
# Check:
curl https://yourdomain.com/uploads/2026/03/pro-gallery-0.png
```

**Problem: Migracija fails**
```bash
# Reset i pokušaj ponovo:
npx prisma db push --force-reset
npm run db:migrate
```

**Problem: "Can't reach database"**
```bash
# Check connection:
npx prisma db execute --stdin <<< "SELECT 1"
```

---

**Trebam dodatnu pomoć? Pitaj! 💬**
