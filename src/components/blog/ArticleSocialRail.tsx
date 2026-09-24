import { Share2 } from "lucide-react";
import PlatformIcon from "./PlatformIcon";

export default function ArticleSocialRail() {
  const shareUrl = encodeURIComponent(typeof window === "undefined" ? "https://ontiver.com" : window.location.href);

  return (
    <aside className="hidden xl:block" aria-label="Share this article">
      <div className="sticky top-32 space-y-8 text-center text-[#002d0e]/55">
        <div className="flex flex-col items-center gap-2">
          <Share2 size={20} aria-hidden="true" />
          <p className="text-meta">Share</p>
        </div>
        <div className="space-y-5 border-t border-[#dde6dc] pt-7">
          <PlatformIcon label="Share on Facebook" color="#1877F2" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}>
            <img src="/assets/facebook-post.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
          <PlatformIcon label="Share on Twitter" color="#1DA1F2" href={`https://x.com/intent/tweet?url=${shareUrl}`}>
            <img src="/assets/twitter-post.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
          <PlatformIcon label="Share on Pinterest" color="#E60023" href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}`}>
            <img src="/assets/pinterest.svg" alt="" className="h-5 w-5" />
          </PlatformIcon>
        </div>
      </div>
    </aside>
  );
}
