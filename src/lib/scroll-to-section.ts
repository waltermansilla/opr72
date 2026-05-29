/** Offset del header fijo al hacer scroll */
export function getHeaderOffset() {
  if (typeof window === "undefined") return 48;
  return window.innerWidth >= 1024 ? 60 : 48;
}

/** Quita #seccion de la URL sin recargar. */
export function clearUrlHash() {
  if (typeof window === "undefined") return;
  const clean = window.location.pathname + window.location.search;
  if (window.location.hash) {
    history.replaceState(null, "", clean);
  }
}

/** Scroll arriba sin animación (evita el “salto” visible al recargar). */
export function scrollToTopInstant() {
  if (typeof window === "undefined") return;
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  clearUrlHash();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  html.style.scrollBehavior = prev;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;

  clearUrlHash();

  const top =
    el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

/** Al cargar/recargar: arriba del todo y URL limpia. */
export function resetScrollOnLoad() {
  if (typeof window === "undefined") return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  scrollToTopInstant();
}

/** Para el script inline en layout (sin depender de módulos). */
export const SCROLL_RESET_SCRIPT = `(function(){
  if('scrollRestoration' in history) history.scrollRestoration='manual';
  function goTop(){
    var h=document.documentElement,p=h.style.scrollBehavior;
    h.style.scrollBehavior='auto';
    var c=location.pathname+location.search;
    if(location.hash) history.replaceState(null,'',c);
    window.scrollTo(0,0);
    h.style.scrollBehavior=p;
  }
  goTop();
  window.addEventListener('pageshow',function(e){ goTop(); });
})();`;
