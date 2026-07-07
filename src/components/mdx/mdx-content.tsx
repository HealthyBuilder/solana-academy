import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";

// Shiki 语法高亮：浅色主题，背景沿用站点的 bg-muted。
const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-light",
  keepBackground: false,
};

/**
 * 让任意 markdown 在 MDX 管线里安全渲染：转义代码块以外的 `<` 与 `{` `}`，
 * 避免被当成 JSX 解析。代码块（```...``` 与行内 `...`）原样保留。
 */
function makeMdxSafe(src: string): string {
  return src
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part.replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/</g, "&lt;")
    )
    .join("");
}

/** 在服务端把 MDX 字符串渲染为 React 节点（RSC 模式）。GFM 表格 + Shiki 代码高亮。 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={makeMdxSafe(source)}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
