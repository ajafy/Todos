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
  const { register, setValue, watch, handleSubmit } = useForm<DateType>({
    defaultValues: {
      deadline: value,
    },
  });

  const onSubmit = (data: DateType) => {
    console.log(data);
    if (data && data.deadline) onDateSelect(data.deadline);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !watch("deadline") && "text-muted-foreground"
            )}
          >
            {watch("deadline") ? (
              format(watch("deadline") as Date, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={watch("deadline")}
            onSelect={(date) => setValue("deadline", date || undefined)}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date.getTime() < today.getTime();
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </form>
  );
}
