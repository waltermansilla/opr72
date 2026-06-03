import { headers } from "next/headers";
import { cache } from "react";
import { buildSiteContent, type SiteContent } from "@/data/content";
import { getSite, type SiteId } from "@/data/site";

const SITE_HEADER = "x-site-id";

export type RequestSiteContent = SiteContent & { siteId: SiteId };

export const getRequestSiteContent = cache(async (): Promise<RequestSiteContent> => {
  const headerList = await headers();
  const siteId = (headerList.get(SITE_HEADER) as SiteId | null) ?? "opr72";
  const site = getSite(siteId);
  return { ...buildSiteContent(site), siteId };
});
