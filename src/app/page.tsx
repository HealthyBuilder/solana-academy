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
      <section className="hero-bg border-b border-border">
        <Container size="wide" className="py-20 sm:py-28">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow">{t.home.badge}</span>
            <h1 className="max-w-3xl text-4xl leading-[1.1] sm:text-6xl">{t.home.heroTitle}</h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
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
      <Container size="wide" id="courses" className="flex scroll-mt-20 flex-col gap-16 py-16">
        {enabledCategories().map((cat) => (
          <CategoryBlock key={cat.slug} category={cat} limitPerSub={3} locale={locale} />
        ))}
      </Container>
    </>
  );
}
