"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DateType = {
  deadline: Date | undefined;
};

export function DatePickerButton({
  onDateSelect,
  value,
}: {
  onDateSelect: (date: Date | undefined) => void;
  value?: Date;
}) {
  const { setValue, watch } = useForm<DateType>({
    defaultValues: {
      deadline: value,
    },
  });

  const selectedDate = watch("deadline");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full pl-3 text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate ? (
            format(selectedDate as Date, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setValue("deadline", date || undefined);
            onDateSelect(date || undefined);
          }}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date.getTime() < today.getTime();
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
