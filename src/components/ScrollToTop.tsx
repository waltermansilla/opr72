"use client";

import { useLayoutEffect } from "react";
import { resetScrollOnLoad } from "@/lib/scroll-to-section";

/** Al recargar: inicio arriba y sin # en la URL. */
export default function ScrollToTop() {
  useLayoutEffect(() => {
    resetScrollOnLoad();
  }, []);

  return null;
}
