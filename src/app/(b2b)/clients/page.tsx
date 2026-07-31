import { getClients } from "@/actions/client.actions";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <h1 className="text-2xl font-bold">Mijozlar</h1>

      {clients.length === 0 ? (
        <p className="mt-4 text-gray-500">Hozircha mijozlar yo&apos;q</p>
      ) : (
        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="pb-3 font-medium">Ism</th>
              <th className="pb-3 font-medium">Telefon</th>
              <th className="pb-3 font-medium">Ro&apos;yxatdan o&apos;tgan</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-3">{client.name}</td>
                <td className="py-3">{client.phone}</td>
                <td className="py-3 text-gray-400">
                  {new Date(client.createdAt).toLocaleDateString("uz-UZ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
