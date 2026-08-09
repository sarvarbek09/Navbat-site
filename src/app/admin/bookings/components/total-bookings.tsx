import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleDollarSign, ClipboardClock, Clock, DollarSign, ShieldCheck, Store, TrendingUp, User } from "lucide-react";
export default function TotalBookings() {
    return (
        <div className="grid grid-cols-4 gap-6">
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Today's Bookings</h3>
                    <Button variant={"default"}><ClipboardClock /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">1,284</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />12%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Pending</h3>
                    <Button variant={"ghost"}><Clock /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">48.2k</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />8.4%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Completion Rate</h3>
                    <Button variant={"default"}><CircleCheckBig /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">$241k</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />15.2%</span></div>
            </div>
            <div className="bg-primary border-accent border rounded-md h-32 p-5 flex flex-col gap-4">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium uppercase text-white/70">Revenue Today</h3>
                    <Button variant={"ghost"} className="bg-white/30 hover:bg-white/40"><DollarSign className="text-white"/></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold text-white">42</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />12%</span></div>
            </div>
        </div>
    )
}