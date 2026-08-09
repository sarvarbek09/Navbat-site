import { Button } from "@/components/ui/button";
import { Filter, Upload } from "lucide-react";
import TotalBookings from "./components/total-bookings";
import { AdvancedBookingsTable } from "./components/admin-bookings-table";
import { bookingsTableData } from "./types";

export default function AdminBookings() {
  return <div>
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-4">
        <div className="block"><span className="rounded-md bg-(--admin-gray) text-xs py-1 px-3">PAGE: ADMIN_BOOKINGS | DS: SALONFLOW_V1</span></div>
        <h1 className="text-5xl font-bold">Bookings Management</h1>
        <p className="text-sm text-muted-foreground">
          Overview and management of all appointments across the platform.
        </p>
      </div>
      <div className="space-x-2">
        <Button variant={"outline"} className="py-6 px-7 text-lg"><Upload />Export</Button>
        <Button variant={"outline"} className="py-6 px-7 text-lg"><Filter /> Filterlar</Button>
      </div>
    </div>
    <div className="mt-12">
      <TotalBookings/>
    </div>
    <div className="mt-16">
      <AdvancedBookingsTable data={bookingsTableData}/>
    </div>
  </div>;
}
