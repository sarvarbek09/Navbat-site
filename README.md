# Navbat

Salon va xizmatlar uchun onlayn bron qilish tizimi.

## Texnologiyalar

- **Next.js 15** — App Router
- **Drizzle ORM** — PostgreSQL
- **Zod** — validatsiya
- **Tailwind CSS** — styling

## Struktura

```
src/
├── middleware.ts          # Auth middleware
├── app/
│   ├── (b2c)/             # Mijozlar (bron, profil)
│   ├── (b2b)/             # Salon egasi (dashboard, mijozlar, daromad)
│   └── api/               # REST + Telegram bot webhook
├── lib/                   # db, schema, auth, realtime
├── schemas/               # Zod validatsiya
└── actions/               # Server Actions
```

## O'rnatish

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

## API

| Route | Vazifa |
|---|---|
| `POST /api/auth` | Login / logout |
| `GET /api/bookings` | Bronlar ro'yxati |
| `POST /api/bot-b2c` | Telegram mijoz boti |
| `POST /api/bot-b2b` | Telegram salon boti |
