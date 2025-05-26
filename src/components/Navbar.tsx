import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Avatar,
  // AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold flex gap-2 items-center">
      <Avatar>
      <AvatarImage src="/2-removebg-preview.png" alt="@shadcn" className="invert-0 dark:invert w-8 h-8"/>
      </Avatar>
      <button className="cursor-pointer" onClick={() => navigate("/")}>SerpenType</button>
      </div>
      <div className="hidden md:flex gap-4">
        <ModeToggle/>
      </div>

      {/* Mobile Responsive Sheet */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Menu</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              <Button variant="outline">15s Mode</Button>
              <Button variant="outline">30s Mode</Button>
              <Button variant="outline">60s Mode</Button>
              <Button variant="outline">Restart</Button>
              <Button variant="outline">Settings</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar