import type { Locale } from "@/config/strings";

/** 课程标签的英文对照。未列出的（如 NFT、Anchor 等本就是英文的）原样显示。 */
const tagEn: Record<string, string> = {
  区块链基础: "Blockchain Basics",
  共识: "Consensus",
  "Solana 入门": "Solana Intro",
  账户模型: "Account Model",
  代币: "Tokens",
  程序开发: "Program Development",
  本地节点: "Local Node",
  代币程序: "Token Program",
  原生开发: "Native",
  框架: "Framework",
  性能: "Performance",
  测试: "Testing",
  安全: "Security",
  审计: "Auditing",
  虚拟机: "Virtual Machine",
  执行机制: "Execution",
  总结: "Recap",
  求职: "Jobs",
  入门: "Beginner",
  基础: "Fundamentals",
  环境: "Environment",
  托管: "Escrow",
  隐私: "Privacy",
  稳定币: "Stablecoin",
  预测市场: "Prediction Market",
  部署: "Deployment",
  职业发展: "Careers",
  交易机器人: "Trading Bot",
  互联网资本市场: "Internet Capital Markets",
  黑客松: "Hackathon",
  无代码: "No-code",
  套利: "Arbitrage",
  量化: "Quant",
  机构实践: "Institutional",
  机构: "Institutions",
  交易: "Trading",
  聚合器: "Aggregator",
  基础设施: "Infrastructure",
};

export function tagLabel(tag: string, locale: Locale): string {
  return locale === "en" ? (tagEn[tag] ?? tag) : tag;
}
