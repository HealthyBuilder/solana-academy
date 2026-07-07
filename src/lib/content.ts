import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { placeholderCourses } from "@/config/placeholder-courses";
import type { Course, CourseMeta, LessonMeta } from "./content-types";

/**
 * 文件系统内容层（仅服务端使用）。
 * 真实课程位于 content/courses/<slug>/：course.json + NN-*.mdx。
 * 占位「即将上线」课程来自 placeholderCourses。
 */

const COURSES_DIR = path.join(process.cwd(), "content", "courses");

function listCourseDirs(): string[] {
  if (!fs.existsSync(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function readLessonMetas(courseSlug: string): LessonMeta[] {
  const dir = path.join(COURSES_DIR, courseSlug);
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort(); // NN- 前缀保证顺序

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? file,
      duration: data.duration,
      videoId: data.videoId,
      bilibiliId: data.bilibiliId,
      description: data.description,
    } satisfies LessonMeta;
  });
}

function readCourse(slug: string): Course | undefined {
  const metaPath = path.join(COURSES_DIR, slug, "course.json");
  if (!fs.existsSync(metaPath)) return undefined;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as CourseMeta;
  return { slug, status: "available", ...meta, lessons: readLessonMetas(slug) };
}

/** 全部课程（真实 + 占位），真实课程在前。 */
export function getAllCourses(): Course[] {
  const real = listCourseDirs()
    .map(readCourse)
    .filter((c): c is Course => Boolean(c));
  return [...real, ...placeholderCourses];
}

export function getCourse(slug: string): Course | undefined {
  return getAllCourses().find((c) => c.slug === slug);
}

export function getCoursesByCategory(categorySlug: string): Course[] {
  return getAllCourses().filter((c) => c.category === categorySlug);
}

export function getCoursesBySubcategory(subSlug: string): Course[] {
  return getAllCourses().filter((c) => c.subcategory === subSlug);
}

/** 读取单节课的 frontmatter + MDX 正文。 */
export function getLesson(
  courseSlug: string,
  lessonSlug: string
): { meta: LessonMeta; content: string } | undefined {
  const file = path.join(COURSES_DIR, courseSlug, `${lessonSlug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    meta: {
      slug: lessonSlug,
      title: data.title ?? lessonSlug,
      duration: data.duration,
      videoId: data.videoId,
      bilibiliId: data.bilibiliId,
      description: data.description,
    },
    content,
  };
}
