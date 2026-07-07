import type { MDXComponents } from "mdx/types";
import { VideoPlayer } from "@/components/lesson/video-player";
import { cn } from "@/lib/utils";

/**
 * MDX 元素样式映射 + 自定义组件。
 * 课文中可直接写 <YouTube id="VIDEO_ID" /> 嵌入自动播放视频。
 * 代码块由 rehype-pretty-code（Shiki）着色，并按语言显示标签。
 */
export const mdxComponents: MDXComponents = {
  h1: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />,
  h2: (props) => <h2 className="mt-10 text-xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-foreground/90" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-foreground/90" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-foreground/90" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a className="font-medium text-solana-purple underline underline-offset-4" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-foreground pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
  // 行内代码；代码块内的 code 由下方 pre 容器与 Shiki 着色接管
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[0.95em]",
        className
      )}
      {...props}
    />
  ),
  // rehype-pretty-code 把代码块包在 <figure> 里
  figure: ({ className, ...props }) => <figure className={cn("my-5", className)} {...props} />,
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "relative overflow-x-auto rounded-lg border border-border bg-muted px-4 pb-4 pt-9 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-border bg-muted px-3 py-2 text-left font-mono" {...props} />
  ),
  td: (props) => <td className="border border-border px-3 py-2 align-top" {...props} />,
  // 自定义视频组件
  YouTube: ({ id, title }: { id: string; title?: string }) => (
    <div className="my-6">
      <VideoPlayer youtubeId={id} title={title} />
    </div>
  ),
  Bilibili: ({ id, title }: { id: string; title?: string }) => (
    <div className="my-6">
      <VideoPlayer bilibiliId={id} title={title} />
    </div>
  ),
};
