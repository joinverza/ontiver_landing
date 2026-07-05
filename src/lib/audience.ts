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
  if (audience === "individual") {
    if (pathname === "/enterprise/contact") return "/contact";
    return "/";
  }

  if (pathname === "/contact") return "/enterprise/contact";
  return "/enterprise";
}
