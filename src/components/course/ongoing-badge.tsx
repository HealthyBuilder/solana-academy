/** 「进行中」小标签：带呼吸点，用于还在持续更新的子分类。 */
export function OngoingBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 self-center rounded-full border border-brand/40 px-2 py-0.5 font-mono text-[11px] font-medium tracking-normal text-brand">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
        <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
      </span>
      {label}
    </span>
  );
}
