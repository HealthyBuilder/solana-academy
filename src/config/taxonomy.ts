/**
 * 平台分类体系（首页顶部 tag / 子 tag）。标题双语（zh / en）。
 * 导航、首页分区、分类页都由这份数据驱动 —— 单一数据源。
 * enabled === false 的分类：导航置灰、首页与页脚不展示。
 */
import type { Locale } from "@/config/strings";

export type LocalizedText = { zh: string; en: string };

export type SubCategory = {
  slug: string;
  title: LocalizedText;
};

export type Category = {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
  enabled?: boolean;
  subcategories: SubCategory[];
};

export const taxonomy: Category[] = [
  {
    slug: "tech",
    title: { zh: "技术课程", en: "Technical Courses" },
    description: {
      zh: "从区块链原理到 Solana 工程实践的体系化技术课程。",
      en: "Systematic technical courses from blockchain principles to Solana engineering.",
    },
    enabled: true,
    subcategories: [
      { slug: "blockchain-basics", title: { zh: "区块链技术基础", en: "Blockchain Fundamentals" } },
      { slug: "solana-app-dev", title: { zh: "Solana 应用开发", en: "Solana App Development" } },
      { slug: "solana-enterprise", title: { zh: "Solana 企业实践", en: "Solana for Enterprise" } },
      { slug: "ecosystem-share", title: { zh: "Solana 生态分享", en: "Solana Ecosystem" } },
    ],
  },
  {
    slug: "skills",
    title: { zh: "Skills hub", en: "Skills Hub" },
    description: {
      zh: "可迁移的核心技能与领域知识模块。",
      en: "Transferable core skills and domain knowledge.",
    },
    enabled: false,
    subcategories: [
      { slug: "blockchain-foundations", title: { zh: "区块链基础", en: "Blockchain Basics" } },
      { slug: "app-dev-practice", title: { zh: "应用开发实践", en: "App Development" } },
      { slug: "institutional-knowledge", title: { zh: "机构领域知识", en: "Institutional Knowledge" } },
    ],
  },
  {
    slug: "career",
    title: { zh: "Career hub", en: "Career Hub" },
    description: {
      zh: "从黑客松创业营到孵化器的职业成长路径。",
      en: "A career path from hackathon founder house to incubator.",
    },
    enabled: false,
    subcategories: [
      { slug: "founder-house", title: { zh: "黑客松创业营", en: "Founder House" } },
      { slug: "incubator", title: { zh: "孵化器", en: "Incubator" } },
    ],
  },
  {
    slug: "opportunities",
    title: { zh: "Opportunities", en: "Opportunities" },
    description: { zh: "机会与资源对接。", en: "Opportunities and resource matching." },
    enabled: false,
    subcategories: [],
  },
];

export function enabledCategories(): Category[] {
  return taxonomy.filter((c) => c.enabled !== false);
}

export function isCategoryEnabled(slug: string): boolean {
  return getCategory(slug)?.enabled !== false;
}

export function getCategory(slug: string): Category | undefined {
  return taxonomy.find((c) => c.slug === slug);
}

export function getSubCategory(
  categorySlug: string,
  subSlug: string
): SubCategory | undefined {
  return getCategory(categorySlug)?.subcategories.find((s) => s.slug === subSlug);
}

/** 给定子分类 slug + 语言，返回其标题。 */
export function subCategoryTitle(subSlug: string, locale: Locale): string | undefined {
  for (const cat of taxonomy) {
    const sub = cat.subcategories.find((s) => s.slug === subSlug);
    if (sub) return sub.title[locale];
  }
  return undefined;
}
