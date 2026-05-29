"use client";

import type { ReactNode } from "react";
import NavLink from "./NavLink";

type ScrollLinkProps = {
  sectionId: string;
  className?: string;
  children: ReactNode;
};

export default function ScrollLink({
  sectionId,
  className,
  children,
}: ScrollLinkProps) {
  return (
    <NavLink sectionId={sectionId} className={className}>
      {children}
    </NavLink>
  );
}
