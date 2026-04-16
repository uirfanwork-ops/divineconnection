"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          "relative inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-primary ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          props.disabled && "cursor-not-allowed opacity-50",
          props.checked && "bg-primary text-primary-foreground",
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          onChange={(e) => {
            onChange?.(e);
            onCheckedChange?.(e.target.checked);
          }}
          {...props}
        />
        {props.checked && <Check className="h-3 w-3" />}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
