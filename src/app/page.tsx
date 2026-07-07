import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 size-[28rem] rounded-full gradient-accent opacity-50 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 size-[24rem] rounded-full gradient-solana opacity-10 blur-3xl" />
        </div>
        <Container className="flex flex-col items-start gap-6 py-20 sm:py-28">
          <Badge variant="outline" className="gap-1.5 bg-background">
            <span className="size-2 rounded-full gradient-solana" />
            {t.home.badge}
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {t.home.heroTitle}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/course/lecture-01" className={cn(buttonVariants({ size: "lg" }))}>
              {t.home.ctaStart}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#courses"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              {t.home.ctaExplore}
            </Link>
          </div>
        </Container>
      </section>

      {/* 课程目录 */}
      <Container id="courses" className="flex scroll-mt-20 flex-col gap-16 py-16">
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {t.home.sectionCourses}
        </h2>
        {enabledCategories().map((cat) => (
          <CategoryBlock key={cat.slug} category={cat} limitPerSub={3} locale={locale} />
        ))}
      </Container>
    </>
  );
}
