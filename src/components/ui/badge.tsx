import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium tracking-tight",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-muted text-muted-foreground",
        outline: "border-border text-muted-foreground",
        // 难度：压在封面图上，底色不透明；亮色用浅底深字，暗色用深底亮字
        beginner:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-[#00ffbd]/40 dark:bg-black/75 dark:text-[#00ffbd]",
        intermediate:
          "border-violet-200 bg-violet-50 text-violet-700 dark:border-[#b48cff]/40 dark:bg-black/75 dark:text-[#c4a6ff]",
        advanced:
          "border-orange-200 bg-orange-50 text-orange-700 dark:border-[#ff9f5a]/40 dark:bg-black/75 dark:text-[#ffb07a]",
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
