import { cookies } from "next/headers";
import { dictionaries, type Dict, type Locale } from "@/config/strings";

export const LOCALE_COOKIE = "locale";

/** 读取当前语言（服务端组件用）。默认中文。 */
export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "zh";
}

/** 当前语言的界面文案字典（服务端组件用）。 */
export async function getDict(): Promise<Dict> {
  return dictionaries[await getLocale()];
}
