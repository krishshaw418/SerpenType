import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Avatar,
  // AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DownloadIcon from "../assets/download_20dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.png";
import { ModeToggle } from "./mode-toggle";
import { useContext } from "react";
import { TimerContext } from "@/context/TimerContext";

function Navbar() {
  const navigate = useNavigate();
  const timerState = useContext(TimerContext);
    if(!timerState) {
        throw new Error("TimerContext is not defined");
    }
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold flex gap-2">
      <Avatar>
      <AvatarImage src="/2-removebg-preview.png" alt="@shadcn" className="invert-0 dark:invert w-8 h-8"/>
      </Avatar>
      <button className="cursor-pointer" onClick={() => navigate("/")}>SerpenType</button>
      </div>
      <div className="hidden md:flex gap-4">
      <Button className="cursor-pointer" variant="ghost" onClick={() => timerState.setTime(15)}>15s</Button>
      <Button className="cursor-pointer" variant="ghost" onClick={() => timerState.setTime(30)}>30s</Button>
      <Button className="cursor-pointer" variant="ghost" onClick={() => timerState.setTime(60)}>60s</Button>
        <div className="flex items-center gap-5">
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger className="h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 cursor-pointer" onClick={() => navigate("/metrics")}>
            <img src={DownloadIcon} alt="download icon" className="invert-100 dark:invert-0"/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download Metrics</p>
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle/>
        </div>
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