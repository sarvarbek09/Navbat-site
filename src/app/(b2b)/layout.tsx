import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session || session.role !== "owner") redirect("/");

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="text-lg font-semibold">
            Navbat Panel
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/schedule" className="hover:text-blue-600">
              Jadval
            </Link>
            <Link href="/clients" className="hover:text-blue-600">
              Mijozlar
            </Link>
            <Link href="/earnings" className="hover:text-blue-600">
              Daromad
            </Link>
            <span className="text-gray-400">{session.name}</span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
