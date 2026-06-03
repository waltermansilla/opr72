import proseportRaw from "./proseport.json";
import opr72Raw from "./opr72.json";

export type SiteData = typeof proseportRaw;

export const sites = {
  proseport: proseportRaw,
  opr72: opr72Raw,
} as const;

export type SiteId = keyof typeof sites;

export function getSite(id: SiteId): SiteData {
  return sites[id];
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
