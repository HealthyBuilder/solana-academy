"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { Course } from "@/lib/content-types";
import { useProgress } from "@/hooks/use-progress";
import { cn } from "@/lib/utils";

export function LessonSidebar({
  course,
  currentSlug,
}: {
  course: Course;
  currentSlug: string;
}) {
  const { isCompleted, hydrated } = useProgress();

  return (
    <nav className="flex flex-col gap-0.5">
      {course.lessons.map((lesson, i) => {
        const active = lesson.slug === currentSlug;
        const completed = hydrated && isCompleted(course.slug, lesson.slug);
        return (
          <Link
            key={lesson.slug}
            href={`/course/${course.slug}/${lesson.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active ? "bg-accent font-medium" : "hover:bg-muted"
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]",
                completed
                  ? "gradient-solana border-transparent text-white"
                  : active
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground"
              )}
            >
              {completed ? <Check className="size-3" /> : i + 1}
            </span>
            <span className="line-clamp-2">{lesson.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
