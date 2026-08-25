import { Bell, CircleQuestionMark, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-accent bg-(--admin-bg) px-6 flex items-center justify-between">
      <div className="flex relative"><Search size={20} className="absolute top-1.5 left-2 text-gray-600"/><Input placeholder="Qidirish..." className="pl-8"/></div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="h-10 w-10 p-0"><Bell size={20}/></Button>
        <Button variant="ghost" className="h-10 w-10 p-0"><CircleQuestionMark size={20}/></Button>
        <Button variant="ghost" className="h-10 w-10 p-0"><img src="/images/avatar.png" alt="Avatar" className="rounded-full w-8 h-8"/></Button>
      </div>
    </header>
  );
}