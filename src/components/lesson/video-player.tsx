"use client";

import { useState } from "react";
import { Volume2, Play, ExternalLink } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";

type VideoPlayerProps = {
  /** YouTube 视频 ID */
  youtubeId?: string;
  /** Bilibili BV 号 */
  bilibiliId?: string;
  /** 外链视频：渲染「前往观看」跳转卡片（无法内嵌时用） */
  externalUrl?: string;
  externalLabel?: string;
  title?: string;
};

/**
 * 视频播放器，支持 YouTube 与 Bilibili。
 * YouTube：进入即静音自动播放（浏览器策略），叠加「取消静音」。
 * Bilibili：长视频默认不自动播放，由用户点击播放。
 */
export function VideoPlayer({ youtubeId, bilibiliId, externalUrl, externalLabel, title }: VideoPlayerProps) {
  const [muted, setMuted] = useState(true);
  const { dict: t } = useLocale();

  if (bilibiliId) {
    const src = `https://player.bilibili.com/player.html?bvid=${bilibiliId}&autoplay=0&danmaku=0&high_quality=1`;
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          className="absolute inset-0 size-full"
          src={src}
          title={title ?? "video"}
          allow="fullscreen"
          allowFullScreen
          scrolling="no"
        />
      </div>
    );
  }

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-border bg-muted text-center no-underline"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:scale-110">
          <Play className="size-7" fill="currentColor" />
        </span>
        <span className="px-6">
          <span className="block font-medium text-foreground">{title ?? "观看视频"}</span>
          <span className="mt-1 inline-flex items-center gap-1 font-mono text-sm text-muted-foreground group-hover:text-foreground">
            {externalLabel ?? "前往观看"}
            <ExternalLink className="size-3.5" />
          </span>
        </span>
      </a>
    );
  }

  if (!youtubeId) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
      <iframe
        key={src}
        className="absolute inset-0 size-full"
        src={src}
        title={title ?? "video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      {muted && (
        <button
          type="button"
          onClick={() => setMuted(false)}
          className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur transition-colors hover:bg-black/85"
        >
          <Volume2 className="size-3.5" />
          {t.lesson.unmute}
        </button>
      )}
    </div>
  );
}
