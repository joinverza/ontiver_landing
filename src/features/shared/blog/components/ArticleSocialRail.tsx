import { Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import PlatformIcon from "./PlatformIcon";

const ArticleSocialRail = () => {
  const { pathname } = useLocation();
  const shareUrl = encodeURIComponent(`https://ontiver.com${pathname}`);

  return (
    <aside className="hidden xl:block" aria-label="Share this article">
      <div className="sticky top-32 space-y-8 text-center text-[#002d0e]/55">
        <div className="flex flex-col items-center gap-2">
          <Share2 size={20} aria-hidden="true" />
          <p className="text-meta">Share</p>
        </div>
        <div className="space-y-5 border-t border-[#dde6dc] pt-7">
          <PlatformIcon
            label="Share on Facebook"
            icon="/assets/facebook-post.svg"
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          />
          <PlatformIcon
            label="Share on X"
            icon="/assets/twitter.svg"
            href={`https://x.com/intent/tweet?url=${shareUrl}`}
          />
          <PlatformIcon
            label="Share on Pinterest"
            icon="/assets/pinterest.svg"
            href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}`}
          />
        </div>
      </div>
    </aside>
  );
};

export default ArticleSocialRail;
