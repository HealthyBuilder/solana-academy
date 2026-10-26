import { cookies } from "next/headers";

export const THEME_COOKIE = "theme";
export type Theme = "light" | "dark";

/** 读取用户选过的主题（服务端用）。没选过返回 undefined，由页面内联脚本跟随系统。 */
export async function getTheme(): Promise<Theme | undefined> {
  const value = (await cookies()).get(THEME_COOKIE)?.value;
  return value === "dark" || value === "light" ? value : undefined;
}

/** 首屏前执行：没有主题 cookie 时按系统偏好加上 dark，避免闪烁。 */
export const themeInitScript = `(function(){try{if(!/(?:^|; )${THEME_COOKIE}=/.test(document.cookie)&&matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark')}catch(e){}})();`;
