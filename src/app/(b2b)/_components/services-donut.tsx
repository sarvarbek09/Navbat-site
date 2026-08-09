export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

type ServicesDonutProps = {
  segments: DonutSegment[];
  total: number;
};

export function ServicesDonut({ segments, total }: ServicesDonutProps) {
  const radius = 66;
  const stroke = 20;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative size-44">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth={stroke}
          />
          {segments.map((segment) => {
            const fraction = total > 0 ? segment.value / total : 0;
            const dash = fraction * circumference;
            const element = (
              <circle
                key={segment.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return element;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-4xl font-bold tracking-tight text-foreground">
            {total}
          </span>
          <span className="text-xs font-medium text-muted-foreground">xizmatlar</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        {segments.map((segment) => {
          const percent = total > 0 ? Math.round((segment.value / total) * 100) : 0;
          return (
            <div key={segment.label}>
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-foreground">{segment.label}</span>
                <span className="ml-auto text-sm font-bold text-foreground">{percent}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-accent">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${percent}%`, backgroundColor: segment.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
