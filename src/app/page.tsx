import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { CategoryBlock } from "@/components/course/category-block";
import { enabledCategories } from "@/config/taxonomy";
import { dictionaries } from "@/config/strings";
import { getCoursesBySubcategory } from "@/lib/content";
import { getLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const locale = await getLocale();
  const t = dictionaries[locale];
  const zh = locale === "zh";
  const stats = [
    { n: getCoursesBySubcategory("blockchain-basics").length, label: zh ? "讲 S1 正课" : "S1 lectures" },
    { n: getCoursesBySubcategory("solana-app-dev").length, label: zh ? "节 S2 应用开发实战" : "S2 app-dev parts" },
    { n: getCoursesBySubcategory("ecosystem-share").length, label: zh ? "场生态分享" : "ecosystem sessions" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-glow border-b border-border">
        <Container size="wide" className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_280px] lg:items-end">
          <div className="flex flex-col items-start gap-7">
            <span className="eyebrow">{t.home.badge}</span>
            <h1 className="max-w-4xl text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[104px]">
              {t.home.heroTitle}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/course/lecture-01" className={cn(buttonVariants({ size: "lg" }))}>
                {t.home.ctaStart}
                <ArrowRight />
              </Link>
              <Link href="#courses" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                {t.home.ctaExplore}
                <ArrowRight />
              </Link>
            </div>
          </div>

          {/* 右侧：带绿色竖线的统计块（对应 solana.com 的 “Choose a starting point”） */}
          <aside className="border-l border-solana-green/60 pl-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-solana-green">
              {zh ? "课程概览" : "At a glance"}
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {stats.map((s) => (
                <li key={s.label} className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium tracking-[-0.04em] text-white">{s.n}</span>
                  <span className="text-sm text-white/60">{s.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      {/* 课程目录 */}
      <Container size="wide" id="courses" className="flex scroll-mt-20 flex-col gap-20 py-20">
        {enabledCategories().map((cat) => (
          <CategoryBlock key={cat.slug} category={cat} limitPerSub={3} locale={locale} />
        ))}
      </Container>
    </>
  );
}
