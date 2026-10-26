import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { CategoryBlock } from "@/components/course/category-block";
import { enabledCategories } from "@/config/taxonomy";
import { dictionaries } from "@/config/strings";
import { getLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const locale = await getLocale();
  const t = dictionaries[locale];

  return (
    <>
      {/* Hero */}
      <section className="hero-glow border-b border-border">
        <Container size="wide" className="py-20 sm:py-28">
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
