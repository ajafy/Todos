import { BadgePlusIcon } from "lucide-react";

import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";

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
