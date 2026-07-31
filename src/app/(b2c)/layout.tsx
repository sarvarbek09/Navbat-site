import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function B2CLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold">
            Navbat
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/my-bookings" className="hover:text-blue-600">
              Bronlarim
            </Link>
            <Link href="/profile" className="hover:text-blue-600">
              Profil
            </Link>
            {session && (
              <span className="text-gray-400">{session.name}</span>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
