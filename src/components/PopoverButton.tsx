"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { DatePickerButton } from "./Calendar";
import { useState } from "react";
import { BadgePlusIcon, SquarePen } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { SelectType } from "./SelectType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodo } from "src/app/_api/fetchTodos";
import {
  todoFormInsert,
  todoFormUpdate,
} from "src/app/_types/typeTodo";
import { useGlobalContext } from "src/Providers/GlobalContext";

interface FormData {
  taskName: string;
  description: string;
  dueDate: Date | undefined;
}

export function PopoverUpdate({
  bg,
  text,
  type,
  taskNameData,
  descriptionData,
  id,
}: {
  bg: string;
  text: string;
  type: string;
  taskNameData: string;
  descriptionData: string;
  dateData: Date | undefined;
  id: string;
}) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedType, setSelectedType] = useState(type);
  const [taskName, setTaskName] = useState(taskNameData);
  const [Description, setDescription] = useState(descriptionData);

  const { user } = useGlobalContext();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  const onDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setValue("dueDate", date);
  };
  const mutationUpdate = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: updateTodo,
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const id_user: string = user?.id_user as string;
    const id_todo: string = id;
    const title: string = data.taskName;
    const description: string = data.description;
    const due_date: Date | undefined = data.dueDate;
    const type: string = selectedType;
    const updateData: todoFormUpdate = {
      title,
      description,
      due_date,
      type,
      id_user,
      id_todo,
    };
    mutationUpdate.mutate(updateData, {
      onError: (error) => console.log("error => ", error),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        setIsOpen(false);
      },
    });
    reset();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <SquarePen className={`self-end ${text}`} />
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-[16px] space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <p className={`text-lg font-semibold ${text}`}>Update Task</p>
            <div className="space-y-2">
              <SelectType
                selectedValue={selectedType}
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
                  {...register("taskName", { required: true })}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="maxWidth">Description</Label>
                <Textarea
                  placeholder="Add a description ..."
                  className="col-span-4"
                  value={Description}
                  {...register("description")}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <Label htmlFor="date">Due Date</Label>
                <div className="col-span-4">
                  <DatePickerButton
                    onDateSelect={onDateSelect}
                    value={selectedDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-3 pt-3">
            <Button
              type="submit"
              className={`text-palette-white ${bg} rounded-[40px] w-[30%]`}
            >
              Update
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverInsert({
  bg,
  text,
  type,
}: {
  bg: string;
  text: string;
  type: string;
}) {
  const { user } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const queryClient = useQueryClient();

  const onDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setValue("dueDate", date);
  };
  const mutationCreate = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const id_user: string = user?.id_user as string;
    const title: string = data.taskName;
    const description: string = data.description;
    const due_date: Date | undefined = data.dueDate;
    const createData: todoFormInsert = {
      title,
      description,
      due_date,
      type,
      id_user,
    };
    mutationCreate.mutate(createData, {
      onError: (error) => console.log("error => ", error),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        setIsOpen(false);
      },
    });
    reset();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`${text} bg-palette-white hover:${text} rounded-[40px]`}
        >
          <BadgePlusIcon /> Add Task
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-[16px] space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="taskName">Task Name</label>
              <Input
                {...register("taskName", { required: true })}
                id="taskName"
                placeholder="Task name"
                className="col-span-4 h-8"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="description">Description</label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Add a description ..."
                className="col-span-4"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <label htmlFor="dueDate">Due Date</label>
              <div className="col-span-4">
                <DatePickerButton
                  onDateSelect={onDateSelect}
                  value={selectedDate}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pr-3 pt-3">
            <Button
              type="submit"
              className={`text-palette-white ${bg} rounded-[40px] w-[30%]`}
            >
              Add Task
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
