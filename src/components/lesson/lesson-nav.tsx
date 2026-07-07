import Link from "next/link";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import type { LessonMeta } from "@/lib/content-types";
import { buttonVariants } from "@/components/ui/button";
import { getDict } from "@/lib/locale";
import { cn } from "@/lib/utils";

export async function LessonNav({
  courseSlug,
  prev,
  next,
}: {
  courseSlug: string;
  prev?: LessonMeta;
  next?: LessonMeta;
}) {
  const t = await getDict();
  return (
    <div className="flex items-center justify-between gap-3">
      {prev ? (
        <Link
          href={`/course/${courseSlug}/${prev.slug}`}
          className={cn(buttonVariants({ variant: "secondary" }), "max-w-[40%]")}
        >
          <ArrowLeft className="size-4" />
          <span className="truncate">{t.lesson.prev}</span>
        </Link>
      ) : (
        <span className="font-mono text-xs text-muted-foreground">{t.lesson.firstChapter}</span>
      )}

      <Link
        href={`/course/${courseSlug}`}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
      >
        <List className="size-4" />
        <span className="hidden sm:inline">{t.lesson.backToCourse}</span>
      </Link>

      {next ? (
        <Link
          href={`/course/${courseSlug}/${next.slug}`}
          className={cn(buttonVariants(), "max-w-[40%]")}
        >
          <span className="truncate">{t.lesson.next}</span>
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span className="font-mono text-xs text-muted-foreground">{t.lesson.lastChapter}</span>
      )}
    </div>
  );
}
