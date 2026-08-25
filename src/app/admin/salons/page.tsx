import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import SalonsGrid from "./components/salons-grid";

export default function AdminSalons() {
  return (
    <>
      <div className="flex flex-col gap-12">

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <div className="block"><span className="rounded-md bg-(--admin-gray) text-xs py-1 px-3">PAGE: ADMIN_SALONS | DS: SALONFLOW_V1</span></div>
            <h1 className="text-5xl font-bold">Salons Managment</h1>
            <p className="text-sm text-muted-foreground">
              Overview and administration of all registered salon partners on the platform.
            </p>
            {/* Add your salon management components here */}
          </div>
          <div className="space-x-2">
            <Button variant={"outline"} className="py-6 px-7 text-lg"><Filter /> Filterlar</Button>
            <Button className="py-6 px-7 text-lg"><Plus /> Salon Qoshish</Button>
          </div>
        </div>

        <div>
          <SalonsGrid/>
        </div>
      </div>
    </>
  );
}
