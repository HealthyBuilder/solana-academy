"use client";

import { Check } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useLocale } from "@/components/i18n/locale-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarkCompleteButton({
  courseSlug,
  lessonSlug,
}: {
  courseSlug: string;
  lessonSlug: string;
}) {
  const { isCompleted, toggle, hydrated } = useProgress();
  const { dict: t } = useLocale();
  const done = hydrated && isCompleted(courseSlug, lessonSlug);

  return (
    <Button
      variant={done ? "secondary" : "default"}
      onClick={() => toggle(courseSlug, lessonSlug)}
      className={cn(done && "border-solana-green text-solana-green")}
    >
      <Check className="size-4" />
      {done ? t.lesson.completed : t.lesson.markComplete}
    </Button>
  );
}
