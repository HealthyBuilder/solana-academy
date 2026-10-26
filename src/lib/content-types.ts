/** 课程 / 课节 数据类型。不含任何 Node API，可被客户端组件以 `import type` 引用。 */

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type CourseStatus = "available" | "coming-soon";

export type LessonMeta = {
  /** 文件名去掉扩展名，如 "01-intro" */
  slug: string;
  title: string;
  /** 预计时长（分钟） */
  duration?: number;
  /** YouTube 视频 ID */
  videoId?: string;
  /** Bilibili 视频 BV 号（如 BV1HfquBsE1L） */
  bilibiliId?: string;
  /** Google Drive 视频文件 ID（需设为「知道链接的任何人可查看」） */
  driveId?: string;
  /** 外链视频：无法内嵌时跳转到该 URL（如登链社区） */
  externalUrl?: string;
  /** 外链按钮文案，默认「前往观看」 */
  externalLabel?: string;
  description?: string;
};

/** course.json 的形状（slug / status / lessons 由 content 层补全） */
export type CourseMeta = {
  title: string;
  description: string;
  /** 英文标题 / 简介（可选，缺省时回退中文） */
  titleEn?: string;
  descriptionEn?: string;
  /** 课程卡封面图（如 /covers/xxx.jpg）；缺省时用课程视频的 YouTube 封面 */
  coverImage?: string;
  /** taxonomy 顶级分类 slug */
  category: string;
  /** taxonomy 子分类 slug */
  subcategory: string;
  difficulty: Difficulty;
  tags: string[];
  estimatedHours?: number;
};

export type Course = CourseMeta & {
  slug: string;
  status: CourseStatus;
  lessons: LessonMeta[];
};

/** 按语言取课程标题，英文缺省时回退中文。 */
export function courseTitle(c: CourseMeta, locale: "zh" | "en"): string {
  return locale === "en" && c.titleEn ? c.titleEn : c.title;
}

/** 课程卡封面：优先 coverImage，否则取第一个 YouTube 课节的视频封面。 */
export function courseCoverUrl(c: Course): string | undefined {
  if (c.coverImage) return c.coverImage;
  const id = c.lessons.find((l) => l.videoId)?.videoId;
  // hqdefault 是 4:3 带黑边，object-cover 裁成 16:9 正好去掉黑边
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}

/** 按语言取课程简介，英文缺省时回退中文。 */
export function courseDescription(c: CourseMeta, locale: "zh" | "en"): string {
  return locale === "en" && c.descriptionEn ? c.descriptionEn : c.description;
}
