import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/config/taxonomy";
import { getCoursesBySubcategory } from "@/lib/content";
import { dictionaries, type Locale } from "@/config/strings";
import { CourseGrid } from "./course-grid";

/**
 * 渲染一个顶级分类：eyebrow + 大标题 + 各子分类区块（带锚点）+ 课程网格。首页与分类页共用。
 * limitPerSub 时每个子分类最多展示该数量，超出显示「开始学习」链接到完整分类页。
 */
export function CategoryBlock({
  category,
  locale,
  limitPerSub,
}: {
  category: Category;
  locale: Locale;
  limitPerSub?: number;
}) {
  const t = dictionaries[locale];
  return (
    <section id={category.slug} className="scroll-mt-24">
      <div className="mb-12 flex flex-col gap-5">
        <span className="eyebrow">{category.title[locale]}</span>
        {category.description && (
          <h2 className="max-w-3xl text-4xl leading-[1.02] tracking-[-0.045em] sm:text-6xl">
            {category.description[locale]}
          </h2>
        )}
      </div>

      <div className="flex flex-col">
        {category.subcategories.map((sub) => {
          if (sub.enabled === false) return null; // 隐藏的子分类不展示
          const courses = getCoursesBySubcategory(sub.slug);
          if (courses.length === 0) return null; // 空子分类不展示
          const shown = limitPerSub ? courses.slice(0, limitPerSub) : courses;
          const hasMore = limitPerSub != null && courses.length > limitPerSub;
          return (
            <div key={sub.slug} id={sub.slug} className="scroll-mt-24 border-t border-border py-10">
              <div className="mb-6 flex items-baseline justify-between gap-3">
                <h3 className="flex items-baseline gap-3 text-2xl tracking-[-0.03em] sm:text-[28px]">
                  {sub.title[locale]}
                  <span className="font-mono text-xs tracking-normal text-white/40">{courses.length}</span>
                </h3>
                {hasMore && (
                  <Link
                    href={`/category/${category.slug}#${sub.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-solana-green"
                  >
                    {t.course.startLearning}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
              <CourseGrid courses={shown} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
