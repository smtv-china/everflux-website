import {
  ContentItem,
  getYouTubeId,
  isImageMedia,
  isLocalMedia,
  isVideoMedia,
  typeLabel,
} from "./contentMedia";

type MediaFrameProps = {
  item: ContentItem;
  language: "en" | "zh";
  className?: string;
};

export default function MediaFrame({ item, language, className = "" }: MediaFrameProps) {
  const youtubeId = getYouTubeId(item.url);

  return (
    <div
      className={`relative aspect-video overflow-hidden bg-[linear-gradient(135deg,#10231e,#20362f_46%,#0b1517)] ${className}`}
    >
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title={item.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : isVideoMedia(item) ? (
        <video src={item.url} className="h-full w-full object-cover" muted playsInline controls />
      ) : isImageMedia(item) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center px-8 text-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#92e6d1]">
              {typeLabel(item.type, language)}
            </p>
            <p className="mt-3 break-all text-sm leading-6 text-white/48">
              {isLocalMedia(item.url) ? item.url : item.url.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
