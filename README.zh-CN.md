[English](./README.md) | **简体中文**

# Solana Academy

系统化学习 Solana 的教学平台：课程目录、视频课 + 图文教程、代码高亮、本地学习进度。界面支持中 / 英双语，提供亮色与暗色两种主题。

Built by Solana Foundation.

## 课程内容

全部课程位于「技术课程」下，分为四个方向：

| 方向 | 来源 | 内容 |
|---|---|---|
| 区块链技术基础 | 训练营第一季 | 11 讲：区块链基础、账户模型、原生程序、Anchor、SPL / Token-2022、Pinocchio、测试工具、程序安全、SVM |
| Solana 应用开发 | 训练营第二季 | 16 节实战：环境搭建、Hello World、投票、托管、隐私转账、稳定币与兑换、预测市场、x402、RWA、Solana Mobile、生产部署 |
| Solana 企业实践 | 训练营第三季 | 机构实践场次（进行中，持续更新） |
| Solana 生态分享 | 第一、二季 | 15 场生态团队分享：交易机器人、互联网资本市场、AI Vibe Coding、链上套利、Session Keys、Titan、0x、OKX DEX 等 |

## 功能

- **视频课**：支持 YouTube（静音自动播放 + 取消静音按钮）、B 站、Google Drive；无法内嵌的视频显示为卡片，点击后在新标签页打开原视频。
- **图文教程**：MDX 编写，支持 GFM 表格，代码用 Shiki 高亮，并随主题切换配色。
- **中英双语界面**：页头切换。课程标题、简介和标签都有英文；课节正文目前为中文。
- **亮色 / 暗色主题**：风格对齐 Solana Docs，会记住用户的选择；首次访问跟随系统设置。
- **学习进度**：保存在浏览器 `localStorage`，无需登录。

## 技术栈

- Next.js 16（App Router）· React 19 · TypeScript
- Tailwind CSS 4，两套主题都用 CSS 变量定义设计 token
- MDX：`next-mdx-remote`、`remark-gfm`、`rehype-pretty-code` / Shiki
- Geist Sans / Geist Mono（`geist` 包本地打包）

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 生产构建
pnpm start    # 运行生产构建
```

## 目录结构

```
content/courses/<slug>/      每门课一个目录
  course.json                课程元数据
  NN-*.mdx                   课节，按文件名 NN- 前缀排序
public/covers/               课程卡封面
public/s2/                   第二季课节用到的图片
src/
  app/                       路由：首页 / 分类 / 课程 / 课节
  components/                ui · layout · course · lesson · mdx · i18n
  config/                    分类体系 · 界面文案 · 标签翻译 · 站点信息
  lib/                       内容读取 · 语言 · 主题
```

## 新增课程

1. 新建 `content/courses/<slug>/course.json`：

   ```json
   {
     "title": "第一讲 · 区块链基础",
     "titleEn": "Lecture 1 · Blockchain Fundamentals",
     "description": "…",
     "descriptionEn": "…",
     "category": "tech",
     "subcategory": "blockchain-basics",
     "difficulty": "beginner",
     "tags": ["区块链基础", "共识"],
     "estimatedHours": 3,
     "coverImage": "/covers/<slug>.jpg"
   }
   ```

   `titleEn`、`descriptionEn`、`coverImage` 可选。没有封面图时，课程卡会使用该课第一个 YouTube 视频的封面。

2. 课节写成 `NN-<名称>.mdx`，支持的 frontmatter：

   | 字段 | 含义 |
   |---|---|
   | `title`、`description`、`duration` | 课节标题、简介、时长（分钟） |
   | `videoId` | YouTube 视频 ID |
   | `bilibiliId` | B 站 BV 号 |
   | `driveId` | Google Drive 文件 ID（文件需设为「知道链接的任何人可查看」） |
   | `externalUrl`、`externalLabel` | 无法内嵌时的外链跳转卡片 |

新课程会被自动收录，同一方向内的课程按目录名排序。

## 配置

- **课程方向**在 `src/config/taxonomy.ts` 中定义：设置 `enabled: false` 隐藏某个方向，设置 `ongoing: true` 显示「进行中」标签。
- **界面文案**在 `src/config/strings.ts`，**标签英文对照**在 `src/config/tags.ts`。
- **主题配色**是 `src/app/globals.css` 里的 CSS 变量（`:root` 为亮色，`.dark` 为暗色）。
