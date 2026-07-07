import { cn } from "@/lib/utils";

/** Solana 官方 logomark，直接引用 public/solana-logomark.svg。 */
export function SolanaMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/solana-logomark.svg" alt="Solana" className={className} />;
}

/**
 * 站点 Logo：左侧 Solana 官方彩色标识 + 右侧两行堆叠的 SOLANA / ACADEMY 字标，
 * 版式参考 Solana Foundation 的 logo。
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <SolanaMark className="h-6 w-auto" />
      <span className="font-mono text-xs font-bold uppercase leading-[1.1] tracking-tight">
        <span className="block">Solana</span>
        <span className="block">Academy</span>
      </span>
    </span>
  );
}
