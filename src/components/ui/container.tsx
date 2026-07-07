import { cn } from "@/lib/utils";

const sizes = {
  full: "max-w-none",
  wide: "max-w-[1440px]",
  narrow: "max-w-[864px]",
} as const;

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizes;
};

/** 居中内容容器。size: full / wide(1440px) / narrow(864px)，参考设计站宽度档位。 */
export function Container({ className, size = "wide", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}
      {...props}
    />
  );
}
