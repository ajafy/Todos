"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerButton } from "./Calendar";
import { useState } from "react";
import { BadgePlusIcon, SquarePen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { SelectType } from "./SelectType";

export function PopoverUpdate({
  bg,
  text,
  type,
  taskNameData,
  descriptionData,
  dateData,
}: {
  bg: string;
  text: string;
  type: string;
  taskNameData: string;
  descriptionData: string;
  dateData: Date | undefined;
}) {
  const [selectedType, setSelectedType] = useState(type);
  const [taskName, setTaskName] = useState(taskNameData);
  const [Description, setDescription] = useState(descriptionData);
  const [date, setDate] = useState<Date | undefined>(dateData);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SquarePen className={`self-end ${text}`} />
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-[16px] space-y-4">
        <div className="grid gap-4">
          <p className={`text-lg font-semibold ${text}`}>Update Task</p>
          <div className="space-y-2">
            <SelectType
              selectedValue={type}
              setSelectedValue={setSelectedType}
            />
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="width">Task name</Label>
              <Input
                id="taskName"
                placeholder="Task name"
                value={taskName}
                className="col-span-4 h-8"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="maxWidth">Description</Label>
              <Textarea
                placeholder="Add a description ..."
                className="col-span-4"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="date">Due Date</Label>
              <div className="col-span-4">
                <DatePickerButton onDateSelect={setDate} value={dateData} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-3">
          <Button className={`text-palette-white ${bg} rounded-[40px] w-[30%]`}>
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export function PopoverInsert({
  bg,
  text,
  title,
}: {
  bg: string;
  text: string;
  title: string;
}) {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${text} bg-palette-white hover:${text} rounded-[40px]`}
        >
          <BadgePlusIcon /> Add Task
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-[16px] space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className={`font-medium leading-none ${text}`}>{title}</h4>
            <p className="text-sm text-muted-foreground">Add a new Task</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="width">Task name</Label>
              <Input
                id="taskName"
                placeholder="Task name"
                className="col-span-4 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="maxWidth">Description</Label>
              <Textarea
                placeholder="Add a description ..."
                className="col-span-4"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="date">Due Date</Label>
              <div className="col-span-4">
                <DatePickerButton onDateSelect={setDate} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-3">
          <Button className={`text-palette-white ${bg} rounded-[40px] w-[30%]`}>
            Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
