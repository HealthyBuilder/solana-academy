/**
 * 界面文案字典（中文 / 英文）。
 * 服务端组件用 `getDict()`（读 cookie）取当前语言；客户端组件用 `useLocale().dict`。
 */

export type Locale = "zh" | "en";

const zh = {
  nav: {
    browse: "浏览课程",
    menu: "菜单",
    comingSoon: "敬请期待",
    language: "语言",
  },
  home: {
    badge: "Solana Academy",
    heroTitle: "系统化学习 Solana 技术",
    heroSubtitle:
      "从区块链技术基础到 Solana 应用开发、企业实践与生态实战 —— 一条清晰的技术学习路径，配套视频与动手内容。",
    ctaStart: "开始学习",
    ctaExplore: "浏览全部课程",
    sectionCourses: "课程目录",
  },
  course: {
    overview: "课程介绍",
    lessons: "课程章节",
    startLearning: "开始学习",
    continueLearning: "继续学习",
    progress: "学习进度",
    backToList: "返回课程列表",
    chapters: (n: number) => `${n} 章`,
    chapterProgress: (done: number, total: number) => `${done}/${total} 章`,
  },
  lesson: {
    prev: "上一章",
    next: "下一章",
    firstChapter: "已是第一章",
    lastChapter: "已是最后一章",
    markComplete: "标记为完成",
    completed: "已完成",
    backToCourse: "返回课程",
    contents: "本课目录",
    unmute: "点击取消静音",
  },
  difficulty: {
    beginner: "入门",
    intermediate: "进阶",
    advanced: "高级",
  },
  common: {
    comingSoon: "即将上线",
    minutes: (n: number) => `约 ${n} 分钟`,
    lessonsCount: (n: number) => `${n} 节`,
    home: "首页",
  },
};

const en: typeof zh = {
  nav: {
    browse: "Browse",
    menu: "Menu",
    comingSoon: "Coming soon",
    language: "Language",
  },
  home: {
    badge: "Solana Academy",
    heroTitle: "Learn Solana Development",
    heroSubtitle:
      "From blockchain fundamentals to Solana app development, enterprise practice and ecosystem hands-on — one clear technical path, with videos and exercises.",
    ctaStart: "Start learning",
    ctaExplore: "Browse all courses",
    sectionCourses: "Courses",
  },
  course: {
    overview: "Overview",
    lessons: "Lessons",
    startLearning: "Start learning",
    continueLearning: "Continue",
    progress: "Progress",
    backToList: "Back to courses",
    chapters: (n: number) => `${n} lessons`,
    chapterProgress: (done: number, total: number) => `${done}/${total} lessons`,
  },
  lesson: {
    prev: "Previous",
    next: "Next",
    firstChapter: "First lesson",
    lastChapter: "Last lesson",
    markComplete: "Mark complete",
    completed: "Completed",
    backToCourse: "Back to course",
    contents: "Contents",
    unmute: "Tap to unmute",
  },
  difficulty: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  common: {
    comingSoon: "Coming soon",
    minutes: (n: number) => `~${n} min`,
    lessonsCount: (n: number) => `${n} lessons`,
    home: "Home",
  },
};

export const dictionaries: Record<Locale, typeof zh> = { zh, en };
export type Dict = typeof zh;
