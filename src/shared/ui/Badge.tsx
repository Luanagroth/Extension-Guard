import type { PropsWithChildren } from "react";
import clsx from "clsx";

export const Badge = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <span className={clsx("inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide", className)}>{children}</span>
);
