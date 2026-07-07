import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CategoryBlock } from "@/components/course/category-block";
import { taxonomy, getCategory } from "@/config/taxonomy";
import { getLocale } from "@/lib/locale";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return taxonomy.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  const locale = await getLocale();
  return { title: cat ? cat.title[locale] : "Category" };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const locale = await getLocale();

  if (cat.enabled === false) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{cat.title[locale]}</h1>
        <p className="mt-3 text-muted-foreground">
          {locale === "zh" ? "该板块敬请期待。" : "This section is coming soon."}
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <CategoryBlock category={cat} locale={locale} />
    </Container>
  );
}
