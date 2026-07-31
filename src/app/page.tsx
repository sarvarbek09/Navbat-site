import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Navbat</h1>
        <p className="mt-2 text-gray-500">Onlayn bron qilish tizimi</p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/my-bookings"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Mening bronlarim
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
        >
          Salon paneli
        </Link>
      </div>
    </main>
  );
}
