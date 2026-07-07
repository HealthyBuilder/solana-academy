"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/content-types";
import { useProgress } from "@/hooks/use-progress";
import { DifficultyBadge } from "./difficulty-badge";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCategory, subCategoryTitle } from "@/config/taxonomy";
import { useLocale } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function CourseDetail({ course }: { course: Course }) {
  const { isCompleted, completedCount, hydrated } = useProgress();
  const { locale, dict: t } = useLocale();
  const total = course.lessons.length;
  const done = hydrated ? completedCount(course.slug) : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const started = done > 0;
  // “继续学习”指向第一个未完成的课节
  const nextLesson =
    course.lessons.find((l) => !isCompleted(course.slug, l.slug)) ?? course.lessons[0];
  const subTitle = subCategoryTitle(course.subcategory, locale);

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <Container className="py-10">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              {t.common.home}
            </Link>
            <span>/</span>
            <Link href={`/category/${course.category}`} className="hover:text-foreground">
              {getCategory(course.category)?.title[locale]}
            </Link>
            <span>/</span>
            <span className="text-foreground">{course.title}</span>
          </nav>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge level={course.difficulty} />
              {subTitle && <Badge variant="secondary">{subTitle}</Badge>}
            </div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{course.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {total > 0 ? (
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href={`/course/${course.slug}/${nextLesson.slug}`}
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  {started ? t.course.continueLearning : t.course.startLearning}
                  <ArrowRight className="size-4" />
                </Link>
                <div className="flex max-w-xs flex-1 flex-col gap-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t.course.progress}</span>
                    <span className="font-mono">
                      {t.course.chapterProgress(done, total)} · {pct}%
                    </span>
                  </div>
                  <ProgressBar value={pct} />
                </div>
              </div>
            ) : (
              <Badge variant="secondary" className="mt-2 w-fit">
                {t.common.comingSoon}
              </Badge>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {t.course.lessons}
        </h2>
        {total > 0 ? (
          <ol className="divide-y divide-border overflow-hidden rounded-lg border border-border">
            {course.lessons.map((lesson, i) => {
              const completed = hydrated && isCompleted(course.slug, lesson.slug);
              return (
                <li key={lesson.slug}>
                  <Link
                    href={`/course/${course.slug}/${lesson.slug}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent"
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
                        completed
                          ? "gradient-solana border-transparent text-white"
                          : "border-border text-muted-foreground"
                      )}
                    >
                      {completed ? <Check className="size-4" /> : i + 1}
                    </span>
                    <span className="flex-1 font-medium">{lesson.title}</span>
                    {lesson.duration ? (
                      <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                        <Clock className="size-3.5" />
                        {t.common.minutes(lesson.duration)}
                      </span>
                    ) : null}
                    <PlayCircle className="size-5 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">{t.common.comingSoon}</p>
        )}
      </Container>
    </>
  );
}
