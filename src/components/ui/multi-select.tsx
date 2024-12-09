"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  SelectContent,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
} from "../ui/select";
import { Check } from "lucide-react";

type MultiSelectContextValue = {
  value?: string[] | null;
  onValueChange?: (value: string[]) => void;
};

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(
  null
);

export type MultiSelectProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  "value" | "onValueChange" | "defaultValue"
> &
  MultiSelectContextValue & {
    defaultValue?: string[];
  };

export const MultiSelect = ({
  value,
  onValueChange,
  defaultValue,
  children,
  ...props
}: MultiSelectProps) => {
  const handleValueChange = (newValue: string) => {
    const newValues = value?.includes(newValue)
      ? value.filter((v) => v !== newValue)
      : [...(value ?? []), newValue];

    onValueChange?.(newValues);
  };

  return (
    <MultiSelectContext.Provider
      value={{
        value: value ?? defaultValue,
        onValueChange,
      }}
    >
      <SelectPrimitive.Root
        value={value ? JSON.stringify(value) : undefined}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </SelectPrimitive.Root>
    </MultiSelectContext.Provider>
  );
};

MultiSelect.displayName = SelectPrimitive.Select.displayName;

export const MultiSelectTrigger = SelectTrigger;

export const MultiSelectValue = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) => {
  const context = React.useContext(MultiSelectContext);

  if (context?.value && context.value.length) {
    return (
      <div className={cn("flex gap-2", className)}>
        {context.value.map((value) => (
          <Badge key={value}>{value}</Badge>
        ))}
      </div>
    );
  }

  return <SelectPrimitive.Value {...props} />;
};

MultiSelectValue.displayName = SelectPrimitive.SelectValue.displayName;

export const MultiSelectScrollUpButton = SelectScrollUpButton;

export const MultiSelectScrollDownButton = SelectScrollDownButton;

export const MultiSelectContent = SelectContent;

// source from shadcn/ui SelectItem, remove <SelectPrimitive.ItemIndicator>
export const MultiSelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => {
  const context = React.useContext(MultiSelectContext);

  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        {context?.value?.includes(props.value) && <Check className="h-4 w-4" />}
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

MultiSelectItem.displayName = SelectPrimitive.Item.displayName;

export const MultiSelectSeparator = SelectSeparator;
