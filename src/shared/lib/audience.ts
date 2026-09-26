export type Audience = "individual" | "enterprise";

export function getAudienceFromPath(pathname: string): Audience {
  return pathname === "/enterprise" || pathname.startsWith("/enterprise/")
    ? "enterprise"
    : "individual";
}

export function getAudienceHome(audience: Audience) {
  return audience === "enterprise" ? "/enterprise" : "/";
}

export function getAudienceSwitchPath(pathname: string, audience: Audience) {
  const pagePairs = [
    ["/identity", "/enterprise/platform"],
    ["/use-cases", "/enterprise/use-cases"],
    ["/resources", "/enterprise/resources"],
    ["/security", "/enterprise/security"],
    ["/support", "/enterprise/support"],
    ["/contact", "/enterprise/contact"],
  ];
  const pair = pagePairs.find((paths) => paths.includes(pathname));
  if (pair) return pair[audience === "enterprise" ? 1 : 0];
  if (audience === "enterprise" && pathname === "/how-it-works") return "/enterprise/platform";
  if (audience === "individual" && pathname.startsWith("/enterprise/platform/")) return "/identity";
  if (audience === "individual" && pathname.startsWith("/enterprise/use-cases/"))
    return "/use-cases";
  if (audience === "individual") {
    if (pathname === "/enterprise/contact") return "/contact";
    return "/";
  }

  if (pathname === "/contact") return "/enterprise/contact";
  return "/enterprise";
}
