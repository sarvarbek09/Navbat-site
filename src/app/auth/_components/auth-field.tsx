import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type AuthFieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function AuthField({ id, label, icon: Icon, type = "text", placeholder, autoComplete }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-12 rounded-xl border-border bg-white pl-11 pr-4 text-sm shadow-sm transition-colors focus-visible:border-primary/50 focus-visible:ring-primary/20"
        />
      </div>
    </div>
  );
}
