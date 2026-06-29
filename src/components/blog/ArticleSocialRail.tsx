import { Eye, Share2 } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

type ArticleSocialRailProps = {
  viewsRef: React.RefObject<HTMLParagraphElement | null>;
  sharesRef: React.RefObject<HTMLParagraphElement | null>;
  socialRef: React.RefObject<HTMLParagraphElement | null>;
};

export default function ArticleSocialRail({
  viewsRef,
  sharesRef,
  socialRef,
}: ArticleSocialRailProps) {
  const shareUrl =
    typeof window === "undefined"
      ? "https://ontiver.com"
      : encodeURIComponent(window.location.href);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[100px] space-y-10 text-center text-black/40">
        <div className="flex flex-col items-center gap-2">
          <Eye size={20} />
          <p className="text-xs uppercase tracking-[0.14em]">views</p>
          <p ref={viewsRef} className="text-sm font-semibold">
            0
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Share2 size={20} />
          <p className="text-xs uppercase tracking-[0.14em]">shares</p>
          <p ref={sharesRef} className="text-sm font-semibold">
            0
          </p>
        </div>
        <div className="space-y-5">
          <PlatformIcon
            label="Share on Facebook"
            count="125"
            color="#1877F2"
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          >
            <img src="/assets/facebook-post.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
          <PlatformIcon
            label="Share on Twitter"
            count="86"
            color="#1DA1F2"
            href={`https://x.com/intent/tweet?url=${shareUrl}`}
          >
            <img src="/assets/twitter-post.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
          <PlatformIcon
            label="Share on Pinterest"
            count="425"
            color="#E60023"
            href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}`}
          >
            <img src="/assets/pinterest.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
          <p ref={socialRef} className="sr-only">
            0
          </p>
        </div>
      </div>
    </aside>
  );
}
