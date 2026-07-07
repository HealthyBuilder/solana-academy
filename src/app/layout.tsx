import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressProvider } from "@/hooks/use-progress";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale === "en" ? "en" : "zh-CN"}
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LocaleProvider initialLocale={locale}>
          <ProgressProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ProgressProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
