import { headers } from "next/headers";
import { getRequestSiteContent } from "@/lib/site-request";
import Navbar from "./Navbar";

export default async function NavbarShell() {
  const headerList = await headers();
  const siteId = headerList.get("x-site-id");
  const homeHref = "/";

  const { menuLinks, navContactLabel, logoContent, site } =
    await getRequestSiteContent();

  return (
    <Navbar
      menuLinks={menuLinks}
      navContactLabel={navContactLabel}
      logoContent={logoContent}
      site={site}
      homeHref={homeHref}
    />
  );
}
