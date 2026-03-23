# 🚀 Production Deployment Guide

Ovo je kompletan vodič za deployment Media Management sistema na produkciju.

## 📋 Pre-deployment Checklist

- [ ] Commit i push svih izmjena na Git
- [ ] Production database URL (PostgreSQL)
- [ ] Environment varijable spremne
- [ ] Backup postojeće produkcijske baze (ako postoji)

---

## 🎯 Option 1: Vercel (Preporučeno za Next.js)

### 1. Setup Environment Variables u Vercel Dashboard

Idi na Vercel dashboard → Project Settings → Environment Variables i dodaj:

```bash
DATABASE_URL=your-production-postgres-url
DIRECT_URL=your-production-postgres-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

### 2. Deploy sa Git

```bash
# Commit sve izmjene
git add .
git commit -m "Add media management system"
git push

# Vercel će automatski deploy-ovati
```

### 3. Pokreni migraciju poslije deploya

```bash
# Instaliraj Vercel CLI ako nemaš
npm i -g vercel

# Login
vercel login

# Pokreni migraciju na produkciji
vercel env pull .env.production
npx tsx scripts/migrate-media.ts --env-file=.env.production
```

**ILI** koristi Vercel's Cron Job:
1. Idi na Vercel Dashboard → Cron Jobs
2. Dodaj: `/api/admin/migrate` (trebat će ti novi API endpoint)

---

## 🐳 Option 2: VPS/Dedicated Server (DigitalOcean, Hetzner, etc.)

### 1. SSH u server

```bash
ssh user@your-server-ip
```

### 2. Pull kod

```bash
cd /path/to/your/app
git pull origin main
```

### 3. Set environment variables

```bash
# Edit .env file
nano .env

# Dodaj:
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DIRECT_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

### 4. Pokreni deployment script

```bash
npm run deploy:full
```

### 5. Restart aplikaciju

```bash
# Ako koristiš PM2
pm2 restart webshop

# Ako koristiš systemd
sudo systemctl restart webshop
```

---

## ☁️ Option 3: Railway/Render/Fly.io

### 1. Setup u platformi

1. Poveži GitHub repo
2. Dodaj environment varijable
3. Set build command: `npm run build`
4. Set start command: `npm start`

### 2. Automatska migracija pri deploy-u

Dodaj u platformu Post-Deploy Command:
```bash
npm run db:migrate
```

### 3. Manual migration (ako treba)

```bash
# Railway CLI
railway run npx tsx scripts/migrate-media.ts

# Render
render run npx tsx scripts/migrate-media.ts

# Fly.io
fly ssh console -C "npx tsx scripts/migrate-media.ts"
```

---

## 📦 Manual Migration Steps (Ako automatska ne radi)

### 1. Export slike sa lokala

```bash
# Na lokalnom računaru
cd public
tar -czf slike-backup.tar.gz slike/

# Upload na server (SCP)
scp slike-backup.tar.gz user@server:/tmp/
```

### 2. Na serveru raspakuj

```bash
ssh user@server
cd /path/to/app/public
tar -xzf /tmp/slike-backup.tar.gz
```

### 3. Pokreni migraciju

```bash
cd /path/to/app
npm run db:migrate
```

---

## 🔧 Troubleshooting

### Problem: "Can't reach database server"

**Rješenje:**
```bash
# Provjeri DATABASE_URL
echo $DATABASE_URL

# Test konekciju
npx prisma db execute --stdin <<< "SELECT 1"
```

### Problem: "Sharp module not found"

**Rješenje:**
```bash
# Reinstaliraj sharp za production platform
npm rebuild sharp
```

### Problem: "Permission denied" za uploads folder

**Rješenje:**
```bash
chmod -R 755 public/uploads
chown -R www-data:www-data public/uploads  # Linux/Nginx
```

### Problem: Slike ne rade nakon deploya

**Rješenje:**

1. Provjeri da li su slike u `public/uploads/` folderu
2. Provjeri da li Next.js servira static files:
```bash
curl https://yourdomain.com/uploads/2026/03/pro-gallery-0.png
```

3. Ako ne radi, možda trebaš custom nginx config:
```nginx
location /uploads/ {
    alias /path/to/app/public/uploads/;
}
```

---

## 🎬 Quick Start Commands

```bash
# 1. Setup production
npm ci
npx prisma generate
npx prisma db push

# 2. Migrate media
npm run db:migrate

# 3. Build
npm run build

# 4. Start
npm start
```

---

## ✅ Post-Deployment Verification

1. **Check Admin Panel**: https://yourdomain.com/admin/media
2. **Check Hero Section**: https://yourdomain.com/admin/hero
3. **Test Image Upload**: Upload novu sliku kroz admin
4. **Check Frontend**: Provjeri da li se slike prikazuju na homepage-u
5. **Check Landing Pages**: Otvori `/l/ipl-aparat-protiv-dlacica`

---

## 📊 Monitoring

Nakon deploya, prati:

```bash
# Check logs
pm2 logs webshop          # PM2
heroku logs --tail        # Heroku
railway logs              # Railway

# Check disk space (slike mogu zauzeti prostor)
df -h
du -sh public/uploads/
```

---

## 🔄 Rolling Back (ako nešto ne radi)

```bash
# 1. Rollback Git
git revert HEAD
git push

# 2. Rollback Database (ako treba)
# Restore iz backup-a

# 3. Redeploy
# Tvoja platforma će automatski deploy-ovati staru verziju
```

---

## 📞 Need Help?

Ako nešto ne radi:

1. Check logs: `npm run logs` ili u dashboard-u platforme
2. Check database: `npx prisma studio`
3. Test locally prvo: `npm run dev`

---

**Sreća u deploy-u! 🚀**
