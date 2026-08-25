import { Button } from "@/components/ui/button";
import { ChartNoAxesCombined, CircleDollarSign, ClipboardClock, ShieldCheck, Store, TrendingUp, User, Wallet } from "lucide-react";
export default function TotalPayments() {
    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Total GMV (30d)</h3>
                    <Button variant={"ghost"}><Wallet /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">$124,500</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />12.5%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Platform Revenue</h3>
                    <Button variant={"ghost"}><ChartNoAxesCombined /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">$18,675</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />8.4%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">Pending Payouts</h3>
                    <Button variant={"ghost"}><ClipboardClock /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">$42,300</span><span className="flex items-center">142 salons awaiting transfer</span></div>
            </div>
        </div>
    )
}