import Link from "next/link";
import { taxonomy } from "@/config/taxonomy";
import { site } from "@/config/site";
import { dictionaries } from "@/config/strings";
import { getLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

export async function Footer() {
  const locale = await getLocale();
  const t = dictionaries[locale];
  const tagline =
    locale === "zh"
      ? "系统化学习 Solana：从区块链技术基础、应用开发，到企业实践与职业发展。"
      : "Learn Solana systematically — from fundamentals to app development, enterprise practice and careers.";

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-6">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{tagline}</p>
        </div>

        {taxonomy.map((cat) => {
          const disabled = cat.enabled === false;
          return (
            <div key={cat.slug}>
              <h4
                className={cn(
                  "flex items-center gap-1.5 font-mono text-sm font-semibold",
                  disabled && "text-muted-foreground/40"
                )}
              >
                {cat.title[locale]}
                {disabled && (
                  <span className="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-normal leading-none text-muted-foreground/60">
                    {t.nav.comingSoon}
                  </span>
                )}
              </h4>
              {!disabled && (
                <ul className="mt-3 flex flex-col gap-2">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/category/${cat.slug}#${sub.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {sub.title[locale]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © 2026 {site.name} · {locale === "zh" ? "学习平台" : "Learning platform"}
          </p>
          <p className="font-mono">Built for Solana developers</p>
        </Container>
      </div>
    </footer>
  );
}
