import type { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export const Card = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={clsx(
      "rounded-[28px] border border-white/80 bg-white p-5 shadow-panel ring-1 ring-slate-100/80",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
