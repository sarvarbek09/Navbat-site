import { Button } from "@/components/ui/button";
import { TotalUsers } from "./components/total-users";
import { UserManagementTable } from "./components/users-table";
import { UserPlus } from "lucide-react";

export default function AdminUsers() {
  return <div>
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold">Users Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage platform clients, specialists, and owners.
        </p>
        {/* Add your salon management components here */}
      </div>
      <div className="space-x-2">
        <Button className="py-6 px-7 text-lg"><UserPlus /> Add User</Button>

      </div>
    </div>

    <div className="mt-12">
      <TotalUsers />
    </div>
    <div className="mt-16">
      <UserManagementTable />
    </div>
  </div>;;
}
