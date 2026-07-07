"use client";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Difficulty } from "@/lib/content-types";

const VARIANT = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
} as const;

export function DifficultyBadge({ level }: { level: Difficulty }) {
  const { dict: t } = useLocale();
  return <Badge variant={VARIANT[level]}>{t.difficulty[level]}</Badge>;
}
