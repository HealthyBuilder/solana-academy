"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";

type VideoPlayerProps = {
  /** YouTube 视频 ID */
  youtubeId?: string;
  /** Bilibili BV 号 */
  bilibiliId?: string;
  title?: string;
};

/**
 * 视频播放器，支持 YouTube 与 Bilibili。
 * YouTube：进入即静音自动播放（浏览器策略），叠加「取消静音」。
 * Bilibili：长视频默认不自动播放，由用户点击播放。
 */
export function VideoPlayer({ youtubeId, bilibiliId, title }: VideoPlayerProps) {
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
