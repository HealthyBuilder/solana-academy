"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** courseSlug -> 已完成的 lessonSlug 列表 */
type ProgressMap = Record<string, string[]>;

const STORAGE_KEY = "solana-academy:progress:v1";

type ProgressContextValue = {
  hydrated: boolean;
  isCompleted: (courseSlug: string, lessonSlug: string) => boolean;
  completedCount: (courseSlug: string) => number;
  toggle: (courseSlug: string, lessonSlug: string) => void;
  setCompleted: (courseSlug: string, lessonSlug: string, done: boolean) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

  // 首次挂载从 localStorage 读取
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMap(JSON.parse(raw));
    } catch {
      // 忽略损坏数据
    }
    setHydrated(true);
  }, []);

  // 变更后写回
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // 忽略写入失败（如隐私模式）
    }
  }, [map, hydrated]);

  const isCompleted = useCallback(
    (course: string, lesson: string) => Boolean(map[course]?.includes(lesson)),
    [map]
  );

  const completedCount = useCallback(
    (course: string) => map[course]?.length ?? 0,
    [map]
  );

  const setCompleted = useCallback(
    (course: string, lesson: string, done: boolean) =>
      setMap((prev) => {
        const set = new Set(prev[course] ?? []);
        if (done) set.add(lesson);
        else set.delete(lesson);
        return { ...prev, [course]: [...set] };
      }),
    []
  );

  const toggle = useCallback(
    (course: string, lesson: string) =>
      setMap((prev) => {
        const set = new Set(prev[course] ?? []);
        if (set.has(lesson)) set.delete(lesson);
        else set.add(lesson);
        return { ...prev, [course]: [...set] };
      }),
    []
  );

  return (
    <ProgressContext.Provider
      value={{ hydrated, isCompleted, completedCount, toggle, setCompleted }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress 必须在 ProgressProvider 内使用");
  return ctx;
}
