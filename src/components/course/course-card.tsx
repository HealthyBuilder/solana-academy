"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { Course } from "@/lib/content-types";
import { useProgress } from "@/hooks/use-progress";
import { useLocale } from "@/components/i18n/locale-provider";
import { DifficultyBadge } from "./difficulty-badge";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const { completedCount, hydrated } = useProgress();
  const { locale, dict: t } = useLocale();
  const total = course.lessons.length;
  const done = hydrated ? completedCount(course.slug) : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const comingSoon = course.status === "coming-soon";
  const hours = course.estimatedHours
    ? locale === "zh"
      ? `约 ${course.estimatedHours} 小时`
      : `~${course.estimatedHours}h`
    : null;

  const card = (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all",
        comingSoon ? "opacity-70" : "hover:-translate-y-0.5 hover:border-foreground/20"
      )}
    >
      <div className="relative aspect-[16/9] gradient-accent">
        <div className="absolute left-3 top-3">
          <DifficultyBadge level={course.difficulty} />
        </div>
        {comingSoon && (
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="bg-white/70 backdrop-blur">
              {t.common.comingSoon}
            </Badge>
          </div>
        )}
        <BookOpen className="absolute bottom-3 right-3 size-8 text-foreground/15" strokeWidth={1.5} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="font-mono text-base font-semibold leading-snug tracking-tight">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="size-3.5" />
              {comingSoon ? t.common.comingSoon : t.common.lessonsCount(total)}
            </span>
            {hours && (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {hours}
              </span>
            )}
          </div>

          {!comingSoon && total > 0 && (
            <div className="flex flex-col gap-1.5">
              <ProgressBar value={pct} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t.course.chapterProgress(done, total)}</span>
                <span className="font-mono">{pct}%</span>
              </div>
            </div>
          )}

          {!comingSoon && (
            <span className="inline-flex items-center gap-1 font-mono text-sm text-foreground">
              {done > 0 ? t.course.continueLearning : t.course.startLearning}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (comingSoon) return <div className="cursor-default">{card}</div>;

  return (
    <Link
      href={`/course/${course.slug}`}
      className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  );
}
