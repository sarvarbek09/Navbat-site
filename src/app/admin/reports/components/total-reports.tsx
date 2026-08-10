import { Button } from "@/components/ui/button";
import { Banknote, CircleDollarSign, ShieldCheck, Store, TrendingUp, User } from "lucide-react";
export default function TotalReports() {
    return (
        <div className="grid grid-cols-4 gap-6">
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">faol salonlar</h3>
                    <Button variant={"ghost"}><Store /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">1,284</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />12%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">jami foydalanuvchilar</h3>
                    <Button variant={"ghost"}><User /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">48.2k</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />8.4%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">oylik daromad</h3>
                    <Button variant={"ghost"}><CircleDollarSign /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">$241k</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />15.2%</span></div>
            </div>
            <div className="border-accent border rounded-md h-32 p-5 flex flex-col gap-4 bg-white">
                <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500 font-medium uppercase">kutilayotgan tasdiqlar</h3>
                    <Button variant={"ghost"}><ShieldCheck /></Button>
                </div>
                <div className="flex gap-2 items-center"><span className="text-3xl font-semibold">42</span><span className="text-(--admin-green) flex items-center"><TrendingUp size={12} />12%</span></div>
            </div>
        </div>
    )
}