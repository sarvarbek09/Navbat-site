import { AdminPageSalon } from "@/types";
import { ArrowRight, Star, User } from "lucide-react";
import Link from "next/link";

export default function Salon({ title, owner, imageUrl, types, badge, rating, reviews }: AdminPageSalon) {
    return (<>
        <div className="border border-accent shadow-sm rounded-md p-5 space-y-4">
            <div className="flex justify-between">
                <div className="w-16 h-16"><img src={imageUrl} className="w-full h-full aspect-square rounded-md" alt="salon img" /></div>
                <div>{badge}</div>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex items-center gap-1"><User size={16} /><span>{owner}</span></div>
                <div className="flex gap-1 items-baseline mt-2">
                    {types.map((type, index) => (
                        <span key={type} className="text-xs text-muted-foreground bg-accent rounded-md py-1 px-2">{type}</span>
                    ))}
                </div>
            </div>
            <div className="w-full h-0.5 bg-accent my-6" />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-600" />
                    <span className="text-sm font-semibold">{rating}</span>
                    <span className="text-xs text-muted-foreground ml-0.5">({reviews} reviews)</span>
                </div>
                <Link href='/' className="text-sm"><ArrowRight/></Link>
            </div>
        </div>
    </>)
}