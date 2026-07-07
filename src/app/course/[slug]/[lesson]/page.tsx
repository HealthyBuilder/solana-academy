import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllCourses, getCourse, getLesson } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { LessonNav } from "@/components/lesson/lesson-nav";
import { MarkCompleteButton } from "@/components/lesson/mark-complete-button";
import { VideoPlayer } from "@/components/lesson/video-player";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getCategory } from "@/config/taxonomy";
import { dictionaries } from "@/config/strings";
import { getLocale } from "@/lib/locale";

type Params = { params: Promise<{ slug: string; lesson: string }> };

export function generateStaticParams() {
  const out: { slug: string; lesson: string }[] = [];
  for (const course of getAllCourses()) {
    for (const lesson of course.lessons) {
      out.push({ slug: course.slug, lesson: lesson.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, lesson } = await params;
  const data = getLesson(slug, lesson);
  return { title: data?.meta.title ?? "课节", description: data?.meta.description };
}

export default async function LessonPage({ params }: Params) {
  const { slug, lesson } = await params;
  const course = getCourse(slug);
  const data = getLesson(slug, lesson);
  if (!course || !data) notFound();

  const locale = await getLocale();
  const t = dictionaries[locale];
  const idx = course.lessons.findIndex((l) => l.slug === lesson);
  const prev = idx > 0 ? course.lessons[idx - 1] : undefined;
  const next = idx < course.lessons.length - 1 ? course.lessons[idx + 1] : undefined;
  const { meta, content } = data;

  return (
    <Container size="wide" className="py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* 侧栏：课程目录 */}
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-lg border border-border p-3">
            <Link
              href={`/course/${course.slug}`}
              className="mb-2 block px-3 font-mono text-sm font-semibold hover:underline"
            >
              {course.title}
            </Link>
            <LessonSidebar course={course} currentSlug={lesson} />
          </div>
        </aside>

        {/* 主内容 */}
        <article className="min-w-0">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              {t.common.home}
            </Link>
            <span>/</span>
            <Link href={`/category/${course.category}`} className="hover:text-foreground">
              {getCategory(course.category)?.title[locale]}
            </Link>
            <span>/</span>
            <Link href={`/course/${course.slug}`} className="hover:text-foreground">
              {course.title}
            </Link>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
          {meta.description && (
            <p className="mt-2 leading-relaxed text-muted-foreground">{meta.description}</p>
          )}

          {(meta.videoId || meta.bilibiliId) && (
            <div className="mt-6">
              <VideoPlayer
                youtubeId={meta.videoId}
                bilibiliId={meta.bilibiliId}
                title={meta.title}
              />
            </div>
          )}

          <div className="mt-8">
            <MdxContent source={content} />
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-border pt-6">
            <MarkCompleteButton courseSlug={course.slug} lessonSlug={lesson} />
            <LessonNav courseSlug={course.slug} prev={prev} next={next} />
          </div>
        </article>
      </div>
    </Container>
  );
}
