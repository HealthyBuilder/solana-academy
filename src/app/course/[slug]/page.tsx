import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCourses, getCourse } from "@/lib/content";
import { CourseDetail } from "@/components/course/course-detail";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return { title: course?.title ?? "课程", description: course?.description };
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}
