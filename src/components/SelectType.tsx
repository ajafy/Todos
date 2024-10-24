"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";

export function SelectType({
  selectedValue,
  setSelectedValue,
}: {
  setSelectedValue: (value: string) => void;
  selectedValue: string;
}) {
  const color: string =
    selectedValue === "TODO"
      ? "text-palette-primary"
      : selectedValue === "ONGOING"
      ? "text-palette-onGoing"
      : "text-palette-done";
  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger
        className={`w-fit space-x-2 border-none shadow-none ${color} font-medium text-base`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            value="TODO"
            className="text-palette-primary focus:text-palette-primary"
          >
            To Do
          </SelectItem>
          <SelectItem
            value="ONGOING"
            className="text-palette-onGoing focus:text-palette-onGoing"
          >
            On Going
          </SelectItem>
          <SelectItem
            value="DONE"
            className="text-palette-done focus:text-palette-done"
          >
            Done
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
