import { BadgePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ButtonWithIcon({ classname }: { classname?: string }) {
  return (
    <Button
      className={cn(
        " bg-palette-white rounded-[40px] hover:text-palette-white",
        classname
      )}
    >
      <BadgePlusIcon /> Add Task
    </Button>
  );
}
