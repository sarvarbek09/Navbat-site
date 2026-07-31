import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <div>
      <h1 className="text-2xl font-bold">Profil</h1>

      <dl className="mt-6 space-y-4">
        <div>
          <dt className="text-sm text-gray-500">Ism</dt>
          <dd className="font-medium">{session.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Telefon</dt>
          <dd className="font-medium">{session.phone}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Rol</dt>
          <dd className="font-medium capitalize">{session.role}</dd>
        </div>
      </dl>
    </div>
  );
}
