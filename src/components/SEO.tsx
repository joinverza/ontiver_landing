import {Helmet} from "react-helmet-async";
import {useLocation} from "../lib/router";
import {getSeoMeta} from "../data/seo";

const SITE_URL = "https://ontiver.com";

export default function SEO() {
  const {pathname} = useLocation();
  const meta = getSeoMeta(pathname);
  const canonical = `${SITE_URL}${meta.canonicalPath === "/" ? "" : meta.canonicalPath}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content="Ontiver" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <script type="application/ld+json">{JSON.stringify(meta.structuredData)}</script>
    </Helmet>
  );
}
