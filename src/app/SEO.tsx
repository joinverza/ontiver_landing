import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSeoMeta, isShareCard } from "./seo/metadata";

const SITE_URL = "https://ontiver.com";

const SEO = () => {
  const { pathname } = useLocation();
  const meta = getSeoMeta(pathname);
  const canonical = `${SITE_URL}${meta.canonicalPath === "/" ? "" : meta.canonicalPath}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta
        name="robots"
        content={
          meta.noIndex
            ? "noindex, follow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:alt" content={meta.title} />
      {isShareCard(meta.image) ? <meta property="og:image:width" content="1200" /> : null}
      {isShareCard(meta.image) ? <meta property="og:image:height" content="630" /> : null}
      <meta property="og:site_name" content="Ontiver" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <script type="application/ld+json">{JSON.stringify(meta.structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
