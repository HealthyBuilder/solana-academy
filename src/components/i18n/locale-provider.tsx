"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { dictionaries, type Dict, type Locale } from "@/config/strings";

type LocaleContextValue = {
  locale: Locale;
  dict: Dict;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = (l: Locale) => {
    document.cookie = `locale=${l};path=/;max-age=31536000;samesite=lax`;
    setLocaleState(l);
    router.refresh(); // 让服务端组件按新语言重渲染
  };

  return (
    <LocaleContext.Provider value={{ locale, dict: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** 客户端组件读取语言与文案字典。 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale 必须在 LocaleProvider 内使用");
  return ctx;
}
