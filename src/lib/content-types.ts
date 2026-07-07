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
  description?: string;
};

/** course.json 的形状（slug / status / lessons 由 content 层补全） */
export type CourseMeta = {
  title: string;
  description: string;
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
