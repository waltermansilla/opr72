import opr72Raw from "./opr72.json";

export type SiteData = typeof opr72Raw;
export type SiteId = "opr72";

const site = opr72Raw;

export function getSite(): SiteData {
  return site;
}
