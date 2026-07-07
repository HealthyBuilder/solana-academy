"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { taxonomy } from "@/config/taxonomy";
import { useLocale } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, dict: t, setLocale } = useLocale();

  const LangToggle = (
    <button
      type="button"
      onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 font-mono text-xs transition-colors hover:bg-muted"
      aria-label={t.nav.language}
      title={t.nav.language}
    >
      <Globe className="size-4" />
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container size="wide" className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Solana Academy">
          <Logo />
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-1 md:flex">
          {taxonomy.map((cat) => {
            const disabled = cat.enabled === false;
            if (disabled) {
              return (
                <span
                  key={cat.slug}
                  title={t.nav.comingSoon}
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-1 rounded-md px-3 py-2 font-mono text-sm text-muted-foreground/40"
                >
                  {cat.title[locale]}
                </span>
              );
            }
            return (
              <div key={cat.slug} className="group relative">
                <Link
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-1 rounded-md px-3 py-2 font-mono text-sm transition-colors hover:bg-muted"
                >
                  {cat.title[locale]}
                  <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-64 rounded-lg border border-border bg-card p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${cat.slug}#${sub.slug}`}
                        className="block rounded-md px-3 py-2 font-mono text-sm transition-colors hover:bg-accent"
                      >
                        {sub.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* 右侧操作 */}
        <div className="flex items-center gap-1">
          {LangToggle}
          <Link
            href="/#courses"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "hidden md:inline-flex"
            )}
          >
            {t.nav.browse}
          </Link>
          <button
            type="button"
            className="inline-flex rounded-md p-2 transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* 移动端抽屉 */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-5 py-5">
            {taxonomy.map((cat) => {
              const disabled = cat.enabled === false;
              if (disabled) {
                return (
                  <div key={cat.slug} className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-muted-foreground/40">
                      {cat.title[locale]}
                    </span>
                    <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted-foreground/60">
                      {t.nav.comingSoon}
                    </span>
                  </div>
                );
              }
              return (
                <div key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="font-mono text-sm font-semibold"
                  >
                    {cat.title[locale]}
                  </Link>
                  <div className="mt-2 flex flex-col gap-1 border-l border-border pl-3">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${cat.slug}#${sub.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {sub.title[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
