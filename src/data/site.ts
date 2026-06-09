import opr72Raw from "./opr72.json";

export type SiteData = typeof opr72Raw;
export type SiteId = "opr72";

const site = opr72Raw;

export function getSite(): SiteData {
  return site;
}

export function siteColorVars(data: SiteData) {
  const c = data.colores;
  return {
    "--background": c.fondo,
    "--foreground": c.texto,
    "--primary": c.primario,
    "--primary-dark": c.primarioOscuro,
    "--surface": c.superficie,
    "--white": c.blanco,
  } as Record<string, string>;
}
