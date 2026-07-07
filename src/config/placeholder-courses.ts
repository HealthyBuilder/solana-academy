import type { Course, Difficulty } from "@/lib/content-types";

/** 占位「即将上线」课程，用于填充各子分类，让框架看起来完整。 */
function p(
  slug: string,
  title: string,
  description: string,
  category: string,
  subcategory: string,
  difficulty: Difficulty,
  tags: string[]
): Course {
  return {
    slug,
    title,
    description,
    category,
    subcategory,
    difficulty,
    tags,
    status: "coming-soon",
    lessons: [],
  };
}

export const placeholderCourses: Course[] = [
  // 技术课程（区块链技术基础已由真实的「第N讲」课程填充，不再放占位卡）
  p("spl-token", "SPL Token 与代币标准", "从零创建并管理 SPL 代币，理解 Token Program。", "tech", "solana-app-dev", "intermediate", ["SPL Token", "代币"]),
  p("nft-metaplex", "NFT 与 Metaplex 实战", "用 Metaplex 标准铸造与管理 NFT 资产。", "tech", "solana-app-dev", "intermediate", ["NFT", "Metaplex"]),
  p("anchor-dev", "Anchor 框架开发", "用 Anchor 高效编写、测试与部署 Solana 程序。", "tech", "solana-app-dev", "advanced", ["Anchor", "智能合约"]),
  p("solana-pay", "Solana Pay 支付集成", "用 Solana Pay 在应用中接入即时、低费的链上支付。", "tech", "solana-app-dev", "intermediate", ["Solana Pay", "支付"]),
  p("solana-enterprise-arch", "企业级 Solana 解决方案", "面向机构的合规、托管与高可用架构设计。", "tech", "solana-enterprise", "advanced", ["企业", "架构"]),
  p("onchain-trading", "链上交易与 DeFi", "理解 DEX、流动性与链上交易系统的设计。", "tech", "solana-enterprise", "intermediate", ["DeFi", "交易"]),
  p("ecosystem-share-intro", "Solana 生态项目分享", "走进 Solana 生态的明星项目，听一线团队分享实践经验。", "tech", "ecosystem-share", "intermediate", ["生态", "分享"]),

  // Skills hub
  p("wallet-key-management", "钱包与密钥管理", "助记词、密钥派生与安全实践。", "skills", "blockchain-foundations", "beginner", ["钱包", "安全"]),
  p("dapp-frontend", "DApp 前端开发实践", "用 web3.js / wallet-adapter 构建可交互前端。", "skills", "app-dev-practice", "intermediate", ["前端", "web3.js"]),
  p("rwa-institutional", "RWA 与机构合规", "真实世界资产代币化的合规与落地。", "skills", "institutional-knowledge", "advanced", ["RWA", "合规"]),

  // Career hub
  p("founder-house-program", "黑客松创业营", "在密集创业营中把想法打磨成可演示的产品。", "career", "founder-house", "intermediate", ["创业", "黑客松"]),
  p("incubator-program", "孵化器项目", "从原型到融资：孵化器全流程陪跑。", "career", "incubator", "advanced", ["孵化器", "融资"]),
];
