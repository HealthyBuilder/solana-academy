# Solana Academy

系统化学习 Solana 的教学平台：课程目录、图文 + 视频课节、代码高亮、学习进度，界面支持中 / 英双语。

## 技术栈

- **Next.js 16**（App Router）· **React 19** · **TypeScript**
- **Tailwind CSS 4**
- **MDX**（`next-mdx-remote/rsc`）渲染课程内容，`remark-gfm` 支持表格
- **Shiki**（`rehype-pretty-code`）代码语法高亮
- **Geist** 字体（`geist` 本地包，无需联网拉取）
- 视频：YouTube（静音自动播放）+ Bilibili

## 本地开发

```bash
pnpm install
pnpm dev      # 开发服务器 http://localhost:3000
pnpm build    # 生产构建
pnpm start    # 运行生产构建
```

## 目录结构

```
content/courses/<课程 slug>/     课程内容（Markdown/MDX）
  course.json                    课程元数据
  NN-*.mdx                       各课节（frontmatter + 正文）
src/
  app/                           路由：首页 / 分类 / 课程 / 课节
  components/                    ui · layout · course · lesson · mdx · i18n
  config/                        taxonomy(分类) · strings(界面文案) · site
  lib/                           content(内容层) · locale(语言) · utils
```

## 内容模型

**课程** `content/courses/<slug>/course.json`：

```json
{
  "title": "第一讲 · 区块链基础",
  "description": "...",
  "category": "tech",
  "subcategory": "blockchain-basics",
  "difficulty": "beginner",
  "tags": ["区块链基础", "共识"],
  "estimatedHours": 3
}
```

**课节** `content/courses/<slug>/NN-*.mdx`：frontmatter 支持

- `title` · `duration`（分钟）· `description`
- `videoId`（YouTube）或 `bilibiliId`（B 站 `BV...`）——填了就在课节顶部嵌入视频
- 正文为 Markdown/MDX，代码块自动语法高亮（可区分 Rust / TypeScript 等）

新增课程：在 `content/courses/` 下建目录，放 `course.json` 与若干 `NN-*.mdx`，平台会自动收录并按文件名 `NN-` 前缀排序。

## 分类与导航

分类体系集中在 `src/config/taxonomy.ts`（单一数据源，标题双语）。`enabled: false` 的板块在导航中置灰、首页不展示。

## 国际化

界面支持中文 / English，通过页头的语言切换按钮（基于 cookie，服务端与客户端一致）。界面文案集中在 `src/config/strings.ts`，分类名在 `taxonomy.ts`。课程正文目前为中文。

## 学习进度

前端使用 `localStorage` 记录已完成课节（无需登录），刷新后保留。
