import type { ReactNode } from "react";
import {Header, Sidebar} from "@/components/admin";


export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-(--admin-bg)">
          {children}
        </main>
      </div>
    </div>
  );
}