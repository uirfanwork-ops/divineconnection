import * as React from "react";
import { cn } from "@/lib/utils";

type SelectNativeProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectNative = React.forwardRef<HTMLSelectElement, SelectNativeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 ring-offset-background transition-colors focus-visible:border-blue-500/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
SelectNative.displayName = "SelectNative";

export { SelectNative };
