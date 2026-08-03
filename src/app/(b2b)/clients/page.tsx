import { getClients } from "@/actions/client.actions";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <h1 className="text-2xl font-bold">Mijozlar</h1>

      {clients.length === 0 ? (
        <p className="mt-4 text-gray-500">Hozircha mijozlar yo&apos;q</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-[540px] w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="px-4 py-3 font-medium">Ism</th>
                <th className="px-4 py-3 font-medium">Telefon</th>
                <th className="px-4 py-3 font-medium">Ro&apos;yxatdan o&apos;tgan</th>
              </tr>
            </thead>
            <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="px-4 py-3">{client.name}</td>
                <td className="px-4 py-3">{client.phone}</td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(client.createdAt).toLocaleDateString("uz-UZ")}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
