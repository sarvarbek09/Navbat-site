# Navbat Backend (Node.js, alohida server)

Bu — Next.js loyihasidan **mustaqil**, o'z portida ishlaydigan Node.js/Express backend.
Next.js ilovasi hozir o'zining Server Action'lari orqali to'g'ridan-to'g'ri bazaga
yozadi; shu backend esa xuddi shu bazaga REST API orqali kirish imkonini beradi —
kelajakda mobil ilova, boshqa frontend yoki Next.js'ning o'zi shu API'ga
o'tishi mumkin.

**Stack:** Express 5 + TypeScript + Drizzle ORM + PostgreSQL + Zod.

## Tezkor ishga tushirish

```bash
cd backend
npm install
cp .env.example .env      # DATABASE_URL'ni to'ldiring (frontenddagi bilan bir xil bo'lishi mumkin)
npm run db:generate       # schema.ts asosida migratsiya generatsiya qiladi
npm run db:migrate        # migratsiyani bazaga qo'llaydi
npm run dev                # http://localhost:4000 da ishga tushadi
```

`GET http://localhost:4000/api/health` — server ishlayotganini tekshirish uchun.

## Papka strukturasi — bu yerda NIMA QAYERDA yoziladi

```
src/
├── server.ts                  # KIRISH NUQTASI — shu yerdan boshqa hech narsa import qilinmaydi
├── app.ts                     # Express app, middleware va barcha route'larni ulash
│
├── config/env.ts              # .env o'zgaruvchilari (Zod bilan tekshiriladi)
├── db/
│   ├── schema.ts               # Drizzle jadval ta'riflari (users, salons, services, bookings, blockedSlots)
│   └── client.ts               # Postgres ulanishi (`db` obyekti)
│
├── lib/                        # Bazaga bog'liq bo'lmagan, qayta ishlatiladigan yordamchilar
│   ├── errors.ts                # AppError — servis qatlamida shu orqali xato tashlanadi
│   ├── session.ts               # Cookie-based sessiya (login holati)
│   ├── availability.ts          # "vaqt bo'shmi?" hisoblash mantig'i
│   ├── realtime.ts              # Xotiradagi pub/sub (SSE uchun)
│   └── params.ts                # req.params/query'dan xavfsiz string olish
│
├── middleware/
│   ├── auth.middleware.ts       # requireAuth("client"|"owner") — himoyalangan route'lar shuni ishlatadi
│   ├── error-handler.middleware.ts  # global xato -> JSON javob
│   └── not-found.middleware.ts
│
├── schemas/                    # Zod validatsiya (har bir modul uchun alohida fayl)
│
├── modules/                    # ASOSIY BIZNES-MANTIQ — HAR BIR PAPKA = BITTA VAZIFA BO'LAGI
│   ├── auth/         → login/register/logout, "kim men" (/me)
│   ├── salons/        → salonlarni yaratish/ko'rish/tahrirlash
│   ├── services/      → salon xizmatlari (narx, davomiylik)
│   ├── bookings/      → bron yaratish/bekor qilish/holatini o'zgartirish (ENG MURAKKAB QISM)
│   ├── availability/  → salon egasi belgilagan band vaqtlar (tushlik va h.k.)
│   ├── clients/       → salon egasi uchun mijozlar ro'yxati
│   ├── realtime/      → SSE (jonli yangilanish signali)
│   └── bots/          → ikkita Telegram bot webhook (b2c va b2b)
│
└── types/                       # Umumiy TypeScript tiplar
```

Har bir `modules/<nom>/` papkasi 3 qatlamdan iborat — **shu bo'linish orqali
vazifalarni bo'lish oson**:

1. **`*.routes.ts`** — qaysi URL qaysi funksiyaga borishini belgilaydi. Eng kam
   o'zgaradigan, eng oson tushuniladigan qism.
2. **`*.controller.ts`** — HTTP bilan ishlaydi: `req.body`/`req.params`/`req.query`ni
   o'qiydi, Zod bilan tekshiradi, servisni chaqiradi, `res.json(...)` qaytaradi.
   **Bazaga to'g'ridan-to'g'ri murojaat qilmaydi.**
3. **`*.service.ts`** — haqiqiy biznes-mantiq va bazaga yozish/o'qish shu yerda.
   Xato bo'lsa `throw new AppError("xabar", statusKod)` deb tashlanadi —
   qolganini `error-handler.middleware.ts` avtomatik JSON javobga aylantiradi.

Yangi funksiya qo'shish kerak bo'lsa: avval `schemas/`ga Zod sxema, keyin
tegishli `modules/<nom>/*.service.ts`ga funksiya, keyin `*.controller.ts`ga
uni chaqiruvchi handler, oxirida `*.routes.ts`ga route qo'shiladi.

## Vazifalarni bo'lish bo'yicha taklif

Har bir `modules/` papkasi deyarli mustaqil — bir kishiga bitta papkani berish
mumkin. Tayyorlik darajasi bo'yicha:

| Modul | Holati | Izoh |
|---|---|---|
| `auth` | ✅ To'liq ishlaydi | Telefon orqali login/register, cookie-sessiya |
| `salons` | ✅ To'liq ishlaydi | Next.js tarafida bunga mos UI/action umuman yo'q edi — bu yerda yangi qo'shildi |
| `services` | ✅ To'liq ishlaydi | Xuddi shu — yangi qo'shildi |
| `bookings` | ✅ To'liq ishlaydi | Eng muhim modul — band vaqt tekshiruvi, holat o'zgartirish, bekor qilish |
| `availability` | ✅ To'liq ishlaydi | Band vaqt qo'shish/o'chirish |
| `clients` | ✅ To'liq ishlaydi | `clients.service.ts` ichida TODO bor — pastga qarang |
| `realtime` | ✅ Ishlaydi, lekin cheklovi bor | Faqat bitta server nusxasi (instance) ichida ishlaydi — pastga qarang |
| `bots/bot-b2c` | ⚠️ Qisman | `/start`, `/book <salonId>` bor; bron qilishning o'zi (vaqt tanlash) YO'Q — TODO |
| `bots/bot-b2b` | ⚠️ Qisman | `/stats` bor, lekin Telegram akkauntni owner bilan bog'lash oqimi YO'Q — TODO |
| `admin` (foydalanuvchilar/salonlarni boshqarish paneli) | ❌ Umuman yo'q | Frontendda `/admin/*` sahifalari static stub — bazada `admin` roli ham yo'q. Kimdir shu modulni noldan boshlashi kerak bo'ladi |
| To'lov (payment) | ❌ Umuman yo'q | Loyihada hali to'lov integratsiyasi yo'q |

Kodda `TODO(backend team): ...` deb izohlangan joylar — tugallanmagan yoki
qasddan soddalashtirilgan qarorlar, keyingi bosqichda kimdir shularni davom
ettirishi kerak.

## Muhim arxitektura eslatmalari

- **Baza Next.js bilan umumiy.** `src/db/schema.ts` — `../src/lib/schema.ts`
  (Next.js tarafi) bilan bir xil jadvallarni tasvirlaydi. Schema o'zgarsa —
  IKKALA joyda ham o'zgartiring (yoki uzoq muddatda faqat shu backend yagona
  "source of truth" bo'lishi kerak, Next.js esa bazaga to'g'ridan-to'g'ri
  yozishni to'xtatib, shu API'ga murojaat qiladigan bo'lishi kerak).
- **Sessiya = oddiy cookie, JWT emas.** `navbat_session` cookie'sida
  `users.id` (UUID) saqlanadi, imzolanmagan. Next.js tarafi bilan bir xil —
  ikkala backend bir xil cookie nomini ishlatgani uchun, agar ikkalasi bir xil
  domenda (yoki subdomain) tursa, sessiya ular orasida umumiy bo'lishi mumkin.
- **CORS uchun aniq origin kerak.** `.env`dagi `FRONTEND_ORIGIN` — cookie
  cross-origin ishlashi uchun `credentials: true` bilan birga ANIQ domen
  ko'rsatilishi shart (`"*"` ishlamaydi).
- **Realtime cheklovi.** `lib/realtime.ts` — oddiy xotiradagi Map, faqat
  bitta Node process ichida ishlaydi. Agar backend bir nechta nusxada
  (masalan Docker replicas, PM2 cluster) ishga tushirilsa, bitta nusxaga
  ulangan mijoz boshqasidagi o'zgarishni ko'rmaydi — ko'p-instansli muhitga
  o'tilganda buni Redis pub/sub bilan almashtirish kerak.
- **Express 5.** Async route handler ichida `throw` qilingan xato (yoki
  reject bo'lgan Promise) avtomatik `error-handler.middleware.ts`ga boradi —
  har bir controller/route'da alohida `try/catch` yozish shart emas.

## Buyruqlar

- `npm run dev` — tsx bilan hot-reload rejimida ishga tushirish
- `npm run build` — TypeScript'ni `dist/`ga compile qilish
- `npm start` — `dist/`dan production rejimda ishga tushirish (avval `build` kerak)
- `npm run typecheck` — faqat tip tekshiruvi (build qilmasdan)
- `npm run db:generate` / `db:migrate` / `db:studio` — Drizzle Kit buyruqlari
