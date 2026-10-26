import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-border bg-white/5 text-white/70",
        outline: "border-border text-white/70",
        // 难度：深色半透明底，压在封面图上也清晰
        beginner: "border-[#14f195]/40 bg-black/70 text-[#14f195] backdrop-blur",
        intermediate: "border-[#b48cff]/40 bg-black/70 text-[#c4a6ff] backdrop-blur",
        advanced: "border-[#ff9f5a]/40 bg-black/70 text-[#ffb07a] backdrop-blur",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
