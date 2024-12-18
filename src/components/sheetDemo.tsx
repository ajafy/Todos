import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "src/components/ui/sheet";
import Sidebar from "src/Personalcomponents/Sidebar";
import { Menu } from "lucide-react";

export function SideBarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="xl:w-[362px] lg:w-[326px] max-lg:w-[290px]"
        side={"left"}
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Sidebar></Sidebar>
      </SheetContent>
    </Sheet>
  );
}
