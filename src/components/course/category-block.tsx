import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/config/taxonomy";
import { getCoursesBySubcategory } from "@/lib/content";
import { dictionaries, type Locale } from "@/config/strings";
import { CourseGrid } from "./course-grid";

/**
 * 渲染一个顶级分类：标题 + 各子分类区块（带锚点）+ 课程网格。首页与分类页共用。
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
      <div className="mb-6 border-l-2 border-foreground pl-4">
        <h2 className="text-2xl font-semibold tracking-tight">{category.title[locale]}</h2>
        {category.description && (
          <p className="mt-1 text-sm text-muted-foreground">{category.description[locale]}</p>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {category.subcategories.map((sub) => {
          const courses = getCoursesBySubcategory(sub.slug);
          const shown = limitPerSub ? courses.slice(0, limitPerSub) : courses;
          const hasMore = limitPerSub != null && courses.length > limitPerSub;
          return (
            <div key={sub.slug} id={sub.slug} className="scroll-mt-24">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-lg font-semibold">{sub.title[locale]}</h3>
                {hasMore && (
                  <Link
                    href={`/category/${category.slug}#${sub.slug}`}
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t.course.startLearning}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
              {shown.length ? (
                <CourseGrid courses={shown} />
              ) : (
                <p className="text-sm text-muted-foreground">{t.common.comingSoon}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
