import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

export function InputWithLabel({
  type,
  id,
  placeholder,
  label,
}: {
  type: string;
  id: string;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className="bg-primary p-4"
      />
    </div>
  );
}
