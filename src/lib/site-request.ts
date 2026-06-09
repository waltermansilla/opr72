import { cache } from "react";
import { buildSiteContent, type SiteContent } from "@/data/content";
import { getSite, type SiteId } from "@/data/site";

export type RequestSiteContent = SiteContent & { siteId: SiteId };

export const getRequestSiteContent = cache(async (): Promise<RequestSiteContent> => {
  const site = getSite();
  return { ...buildSiteContent(site), siteId: "opr72" };
});
