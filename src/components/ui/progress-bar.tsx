import { cn } from "@/lib/utils";

type ProgressBarProps = {
  /** 0 - 100 */
  value: number;
  className?: string;
};

/** 细进度条，填充使用 Solana 薄荷绿。 */
export function ProgressBar({ value, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className="h-full rounded-full bg-solana-green transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
