import { Header } from "./_components/header";

// TODO: backend/DB ulanganda getSession() orqali haqiqiy foydalanuvchi ismini ko'rsatish kerak.
// Hozircha DATABASE_URL yo'q, shuning uchun static navigatsiya ko'rsatilmoqda.

const navItems = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Bronlarim", href: "/my-bookings" },
  { label: "Profil", href: "/profile" },
];

export default function B2CLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header logoText="Navbat" navItems={navItems} />
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
