import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputFileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export function InputFile({ onChange, multiple = false }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="files">Files</Label>
      <Input id="files" type="file" multiple={multiple} onChange={onChange} />
    </div>
  )
}