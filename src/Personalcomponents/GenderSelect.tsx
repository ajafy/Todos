import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { genderType } from "src/app/_types/typeSign";

export default function SelectGender({
  className,
  setValue,
  setIsGender,
}: {
  className: string;
  setValue: (name: "gender", value: genderType) => void;
  setIsGender: (value: boolean) => void;
}) {
  return (
    <Select
      onValueChange={(value) => {
        setIsGender(false);
        setValue("gender", value as genderType);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent className="rounded-[15px] flex items-center">
        <SelectGroup className="rounded-[15px]">
          <SelectItem
            className="rounded-[40px] pl-5  bg-accent focus:bg-palette-background text-palette-primary focus:text-palette-primary"
            value="MALE"
          >
            Male
          </SelectItem>
          <SelectItem
            className="rounded-[40px] pl-5 bg-accent focus:bg-palette-background text-palette-secondary focus:text-palette-secondary"
            value="FEMALE"
          >
            Female
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
