import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"

const TopBar = () => {
  return (
    <div className="bg-white w-[1335px] h-[80px] shadow-sm px-4">
     <div className="flex flex-row justify-end my-3 gap-4">
        <ModeToggle/>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
     </div>
    </div>
  )
}

export default TopBar
