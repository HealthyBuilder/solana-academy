"use client";

import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";

/**
 * 亮 / 暗主题切换：直接切 <html> 上的 dark class，并写 cookie 让服务端下次渲染同一主题。
 * 两个图标都渲染、用 dark: 控制显隐，避免服务端与客户端初始状态不一致。
 */
export function ThemeToggle() {
  const { locale } = useLocale();
  const label = locale === "zh" ? "切换亮色 / 暗色" : "Toggle light / dark";

  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    document.cookie = `theme=${dark ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}
