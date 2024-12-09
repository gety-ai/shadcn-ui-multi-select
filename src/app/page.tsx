"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center">
      <MultiSelect value={value} onValueChange={setValue}>
        <MultiSelectTrigger className="w-96">
          <MultiSelectValue placeholder="select fruit" />
        </MultiSelectTrigger>

        <MultiSelectContent>
          <MultiSelectItem value="apple">Apple</MultiSelectItem>
          <MultiSelectItem value="banana">Banana</MultiSelectItem>
          <MultiSelectItem value="cherry">Cherry</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  );
}
